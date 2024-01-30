import { Door, Ood, Player, Tube } from "./assets"

interface GameState {
  isStarted: boolean;
  isEnded: boolean;
  statisticIsOpened: boolean;
  creaturesCreated: boolean;
}

export const pressedButtons = {
    w: false,
    s: false,
    a: false,
    d: false,
  }

export const  handleKeyInsideGame = (event : KeyboardEvent, player : Player, doors : Door[], oods : Ood[]) => {
  let velocity = 0
  const step = Tube.width
  if (event.type == "keydown") {
      velocity = 2
  }
  let isAnyButtonPressed = false

  let key: keyof typeof pressedButtons
  for (key in pressedButtons) {
      isAnyButtonPressed = isAnyButtonPressed || pressedButtons[key]
  }

  if(player && oods.length > 0) {

  
    if (!isAnyButtonPressed) {
        switch (event!.code) {
          case 'KeyW':
              player.velocity!.y = -velocity
              player.newPosition.y -= step
              pressedButtons.w = true
            break
            
          case 'KeyS':
              player.velocity!.y = velocity
              player.newPosition.y += step
              pressedButtons.s = true
            break
          case 'KeyA':
              player.velocity!.x = -velocity
              player.newPosition.x -= step
              pressedButtons.a = true
            break
          case 'KeyD':
              player.velocity!.x = velocity
              player.newPosition.x += step
              pressedButtons.d = true
            break
        }
      }

        switch (event!.code) {
          case 'KeyF':
            doors.forEach((door) => {
              door.isDoorClosed = !door.isDoorClosed
            })
            break
          case 'NumpadSubtract':
          case 'Minus':
            if(oods.length > 1){
              oods.pop()
            }            
            break
          }       
  }
}

export const handleKeyOutsideGame = (event : KeyboardEvent, game : GameState) => {
  const statisticScreen = document.getElementById('game_statistic')
  if (event!.type == "keydown") {
    switch (event!.code) {
        case 'Enter':
            if(!game.isEnded) {
                const startScreen = document.getElementById('start_game')
                if(startScreen != null) {
                  startScreen.style.display = 'none'
                  game.isStarted = true
                }
            } else {
                window.document.location.reload()
            }
            break
        case 'KeyP':
            
            if (statisticScreen != null) {
              if (game.statisticIsOpened) {
                statisticScreen.style.display = 'none'
              } else {
                  statisticScreen.style.display = 'flex'
              }
                game.statisticIsOpened = !game.statisticIsOpened
            }
            
            break
          case 'KeyF':
            if(game.isEnded) {
              let payRespect = JSON.parse(localStorage.getItem('pressF') as string) || 0
              payRespect ++
              localStorage.setItem('pressF', payRespect)
            }
            break
    }
  }
}