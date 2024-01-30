import Canvas from "../Canvas/Canvas"
import { useEffect } from "react"
import { CanvasProps, GameGlobalStatistic } from "../../common/interfaces/interfaces"
import { Boundary, Player, Ood } from "../assets/assets"
import { drawMap } from "../assets/map"
import { pressedButtons, handleKeyInsideGame, handleKeyOutsideGame } from "../assets/controls"
import { collisionCreatureToBarrier, collisionCreatureToCreature, collisionCreatureToLever } from "../assets/collisions"
import { StartScreen } from "./gameStatusScreens/StartScreen"
import { LoseScreen } from "./gameStatusScreens/LoseScreen"
import { WinScreen } from "./gameStatusScreens/WinScreen"
import { StatisticScreen } from "./gameStatusScreens/StatisticScreen"
import './Game.css'


export const Game = () => {

  const gameGlobalStatistic : GameGlobalStatistic = {
    allOodSwitchedLevers: JSON.parse(localStorage.getItem('allOodSwitchedLevers') as string) || 0,
    playerDeaths: JSON.parse(localStorage.getItem('playerDeaths') as string) || 1,
    gameWins: JSON.parse(localStorage.getItem('gameWins') as string) || 0
  }

  const gameState = {
    isStarted: false,
    isEnded: false,
    statisticIsOpened: false,
    creaturesCreated: false
  }

  const {boundaries, tubes, levers, doors} = drawMap()

  const playerImage = new Image()
  playerImage.src = '/assets_images/player.png'

  const oodImage = new Image()
  oodImage.src = '/assets_images/ood.png'

  let player : Player
  const oods : Ood[] = []

  const createCreatures = () => {
    player = new Player ({
      position: {
          x: Boundary.width * 18,
          y: Boundary.width * 10
      },
      velocity: {
          x: 0,
          y: 0
      }, 
      image: playerImage
    })
  
    oods.push(
       new Ood ({
        position: {
            x: Boundary.width * 5,
            y: Boundary.height *10
        },
        velocity: {
            x: 0,
            y: Ood.speed
        },
        image: oodImage
    }), 
       new Ood ({
        position: {
            x: Boundary.width * 24,
            y: Boundary.height * 3
        },
        velocity: {
            x: 0,
            y: -Ood.speed
        },
        image: oodImage
    }),
      new Ood ({
        position: {
            x: Boundary.width,
            y: Boundary.height
        },
        velocity: {
            x: Ood.speed,
            y: 0
        },
        image: oodImage
      }),
      new Ood ({
        position: {
            x: Boundary.width * 15,
            y: Boundary.height * 2
        },
        velocity: {
            x: 0,
            y: -Ood.speed
        },
        image: oodImage
      }) 
    )
  }

  const draw: CanvasProps["draw"] = (context, animationID) => {

    if (gameState.isStarted && !gameState.creaturesCreated) {
      createCreatures()
      gameState.creaturesCreated = true
    }

    if (context != null) {
      context.clearRect(0, 0, context.canvas.width, context.canvas.height)

      
      tubes.forEach((tube) => {
        tube.draw(context)
      })
       
      boundaries.forEach((boundary) => {
        boundary.draw(context)

        if(player) {
          if (collisionCreatureToBarrier(player, boundary) == 'right' && player.velocity!.x > 0) {
            player.velocity!.x = 0
            player.newPosition.x = player.position.x
          }
          if (collisionCreatureToBarrier(player, boundary) == 'left' && player.velocity!.x < 0) {
            player.velocity!.x = 0
            player.newPosition.x = player.position.x
          }
          if (collisionCreatureToBarrier(player, boundary) == 'up' && player.velocity!.y < 0) {
            player.velocity!.y = 0
            player.newPosition.y = player.position.y
          }
          if (collisionCreatureToBarrier(player, boundary) == 'down' && player.velocity!.y > 0) {
            player.velocity!.y = 0
            player.newPosition.y = player.position.y
          }  
        }
           
      })

      let turnedOnLevers = 0
      levers.forEach((lever) => {

        if (lever.isTurnedOn) {
          lever.image.src = '/assets_images/lever_on.png'
        } else {
          lever.image.src = '/assets_images/lever_off.png'
        }
        lever.draw(context)

        if(player) {
          if (collisionCreatureToLever(player, lever)) {
            if (!lever.isTurnedOn) {
              lever.isTurnedOn = true
            }       
          } 
        }

        if(oods.length > 0) {
          oods.forEach ((ood) => {
            if (collisionCreatureToLever(ood, lever)) {
              if (lever.isTurnedOn) {
                lever.isTurnedOn = false
                gameGlobalStatistic.allOodSwitchedLevers ++
              }       
            }
          })
        }
          
        if(lever.isTurnedOn) {
          turnedOnLevers ++
        }
      }) 

      // Win
      if(turnedOnLevers == levers.length) {
        window.cancelAnimationFrame(animationID)

        gameState.isEnded = true
        localStorage.setItem('allOodSwitchedLevers', JSON.stringify(gameGlobalStatistic.allOodSwitchedLevers))
        gameGlobalStatistic.gameWins ++
        localStorage.setItem('gameWins', JSON.stringify(gameGlobalStatistic.gameWins))
        
        const victoryScreen = document.getElementById('win_game')
        if(victoryScreen) {
          victoryScreen.style.display = 'flex'
        }

        console.log('win')
      }
     
      if (oods.length > 0 && player) 
      {
        oods.forEach((ood) => {
          const oodCollisions : string[] = []
          ood.update(context)

          // LOSE

          if (collisionCreatureToCreature(ood, player)) {
            window.cancelAnimationFrame(animationID)

            localStorage.setItem('allOodSwitchedLevers', JSON.stringify(gameGlobalStatistic.allOodSwitchedLevers))
            gameGlobalStatistic.playerDeaths ++
            localStorage.setItem('playerDeaths', JSON.stringify(gameGlobalStatistic.playerDeaths))
            

            gameState.isEnded = true
            const loseScreen = document.getElementById('lose_game')
            if(loseScreen != null) {
              loseScreen.style.display = 'flex'
            }
            console.log('LOSER')
          }
  
          boundaries.forEach((boundary) => {
            const collision = collisionCreatureToBarrier(ood, boundary)
            if(collision) {
              oodCollisions.push(collision)
            }
          })
  
          doors.forEach((door)=> {
            if(door.isDoorClosed) {
              const collision = collisionCreatureToBarrier(ood, door)
              if(collision) {
                oodCollisions.push(collision)
              }
            }
          })
  
          if (oodCollisions.length != 0 && JSON.stringify(oodCollisions) !== JSON.stringify(ood.prevCollisions)) {
            if(oodCollisions.length < 3) {
              if (ood.velocity!.x > 0) {
                oodCollisions.push ('left')
              } else if (ood.velocity!.x < 0) {
                oodCollisions.push ('right')
              } else if (ood.velocity!.y < 0) {
                oodCollisions.push ('down')
              } else if (ood.velocity!.y > 0) {
                oodCollisions.push ('up')
              }
            }
  
            const defaultPathways = ['right', 'left', 'up', 'down']
            const pathways = defaultPathways.filter((path) => {
              return !oodCollisions.includes(path)
            })
            ood.prevCollisions = oodCollisions
  
            const direction = pathways[Math.floor(Math.random() * pathways.length)]
  
            switch (direction) {
                case 'down':
                    ood.velocity!.y = ood.speed
                    ood.velocity!.x = 0
                    break
                case 'up':
                    ood.velocity!.y = -ood.speed
                    ood.velocity!.x = 0
                    break
                case 'left':
                    ood.velocity!.y = 0
                    ood.velocity!.x = -ood.speed
                    break
                case 'right':
                    ood.velocity!.y = 0
                    ood.velocity!.x = ood.speed
                    break
            } 
          }       
        })
      }

      if (player)   {
        player.draw(context)
      }   
      

      doors.forEach((door) => {
        if (door.isDoorClosed) {
          door.image.src = '/assets_images/door_closed.png'
        } else {
          door.image.src = '/assets_images/door_opened.png'
        }
        door.draw(context)

        if(door.isDoorClosed && player) {
          if (collisionCreatureToBarrier(player, door) == 'right' && player.velocity!.x > 0) {
            player.velocity!.x = 0
            player.newPosition.x = player.position.x
          }
          if (collisionCreatureToBarrier(player, door) == 'left' && player.velocity!.x < 0) {
            player.velocity!.x = 0
            player.newPosition.x = player.position.x
          }
          if (collisionCreatureToBarrier(player, door) == 'up' && player.velocity!.y < 0) {
            player.velocity!.y = 0
            player.newPosition.y = player.position.y
          }
          if (collisionCreatureToBarrier(player, door) == 'down' && player.velocity!.y > 0) {
            player.velocity!.y = 0
            player.newPosition.y = player.position.y
          }     
        }        
      })

      if (player){
        if (JSON.stringify(player.position) != JSON.stringify(player.newPosition)) {
          player.update(context)
        } else {
          let key: keyof typeof pressedButtons
          
          for ( key in pressedButtons) {
            pressedButtons[key] = false
          }
          player.velocity!.x = 0
          player.velocity!.y = 0
        }
      }

    }
  }

  useEffect(() => {
    window.addEventListener('keydown', () => handleKeyInsideGame(event as KeyboardEvent, player, doors, oods))
    window.addEventListener('keydown', () =>  handleKeyOutsideGame(event as KeyboardEvent, gameState))

    
    return () => {
      window.removeEventListener('keydown', () => handleKeyInsideGame(event as KeyboardEvent, player, doors, oods))
      window.removeEventListener('keydown', () =>  handleKeyOutsideGame(event as KeyboardEvent, gameState))

    }
  })

  return (
    <>
    <div className="game">
      <StartScreen/>
      <LoseScreen gameGlobalStatistic={gameGlobalStatistic}/>
      <WinScreen/>
      <StatisticScreen gameGlobalStatistic={gameGlobalStatistic}/>
      <Canvas className="game__canvas" width={1200} height={600} draw={draw}/>      
    </div>
    </>
  )
}
