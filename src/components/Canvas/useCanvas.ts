import { useEffect, useRef } from "react"; 
import {CanvasProps} from '../../common/interfaces/interfaces'

const useCanvas  = (draw : CanvasProps["draw"]) => {

    class Boundary {
        static width = 40;
        static height = 40;
        constructor({position }) {
            this.position = position;
            this.width = 40;
            this.height = 40;
        }

        draw(context) {
            context.fillStyle = 'blue'
            context.fillRect(this.position.x, this.position.y, this.width, this.height)
        }
    }

    class Player {
        constructor( {position, velocity}) {
            this.position = position;
            this.velocity = velocity;
            this.radius = 15;
            this.newPosition = {x: 60, y: 60};
        }

        draw(context) {
            context.beginPath();
            context.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
            context.fillStyle = 'yellow';
            context.fill();
            context.closePath();
        }

        update(context) {
            this.draw(context);
            this.position.x += this.velocity.x;
            this.position.y += this.velocity.y;
        }
    }

    class Pellet {
        constructor( {position}) {
            this.position = position;
            this.radius = 3
        }

        draw(context) {
            context.beginPath();
            context.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
            context.fillStyle = 'white';
            context.fill();
            context.closePath();
        }
    }

    class Ghost {
        static speed = 1;
        constructor( {position, velocity, color}) {
            this.position = position;
            this.velocity = velocity;
            this.radius = 15;
            this.color = color;
            this.prevCollisions = [];
            this.speed = Ghost.speed;
        }

        draw(context) {
            context.beginPath();
            context.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
            context.fillStyle = this.color;
            context.fill();
            context.closePath();
        }

        update(context) {
            this.draw(context);
            this.position.x += this.velocity.x;
            this.position.y += this.velocity.y;
        }
    }

    const circleCollidesWithRectanglePlayer = (circle, rectangle) => {
        return (
            circle.position.y - circle.radius + circle.velocity.y <= rectangle.position.y + rectangle.height  &&
            circle.position.x + circle.radius + circle.velocity.x >= rectangle.position.x  &&
            circle.position.y + circle.radius + circle.velocity.y >= rectangle.position.y &&
            circle.position.x - circle.radius + circle.velocity.x <= rectangle.position.x + rectangle.height 
        )
    }

    const circleCollidesWithRectangle = (circle, rectangle) => {
        const padding = Boundary.width / 2 - circle.radius - 1
        return (
            circle.position.y - circle.radius + circle.velocity.y <= rectangle.position.y + rectangle.height + padding &&
            circle.position.x + circle.radius + circle.velocity.x >= rectangle.position.x - padding &&
            circle.position.y + circle.radius + circle.velocity.y >= rectangle.position.y - padding &&
            circle.position.x - circle.radius + circle.velocity.x <= rectangle.position.x + rectangle.height + padding
        )
    }

    const map = [
        ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
        ['-', ' ', ' ', '.', ' ', '.', '.', '.', '.', '.', '-'],
        ['-', '.', '-', '.', '-', '-', '-', '.', '-', '.', '-'],
        ['-', '.', '.', '.', '.', '-', '.', '.', '.', '.', '-'],
        ['-', '.', '-', '-', '.', '.', ' ', '-', '-', '.', '-'],
        ['-', '.', '.', '.', '.', '-', '.', '.', '.', '.', '-'],
        ['-', '.', '-', '.', '-', '-', '-', '.', '-', '.', '-'],
        ['-', '.', '.', '.', '.', '-', '.', '.', '.', '.', '-'],
        ['-', '.', '-', '-', '.', '.', '.', '-', '-', '.', '-'],
        ['-', '.', '.', '.', '.', '-', '.', '.', '.', '.', '-'],
        ['-', '.', '-', '.', '-', '-', '-', '.', '-', '.', '-'],
        ['-', '.', '.', '.', ' ', '.', ' ', '.', ' ', ' ', '-'],
        ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-']
    ]

    const boundaries = [];
    const pellets = [];
    const ghosts = [
        new Ghost ({
            position: {
                x: Boundary.width * 6 + Boundary.width / 2,
                y: Boundary.height + Boundary.height / 2
            },
            velocity: {
                x: Ghost.speed,
                y: 0
            },
            color: 'red'
        }),

        
        new Ghost ({
            position: {
                x: Boundary.width * 8 + Boundary.width / 2,
                y: Boundary.height * 3 + Boundary.height / 2
            },
            velocity: {
                x: Ghost.speed,
                y: 0
            },
            color: 'green'
        }),

        
        new Ghost ({
            position: {
                x: Boundary.width * 2 + Boundary.width / 2,
                y: Boundary.height * 9 + Boundary.height / 2
            },
            velocity: {
                x: Ghost.speed,
                y: 0
            },
            color: 'white'
        })
    
    
    ];
    const player = new Player ({
        position: {
            x: Boundary.width + Boundary.width / 2,
            y: Boundary.height + Boundary.height / 2
        },
        velocity: {
            x: 0,
            y: 0
        }
    })

    map.forEach((row, i) => {
        row.forEach((symbol, j) => {
            switch (symbol) {
                case '-':
                    boundaries.push(
                        new Boundary ({
                            position: {
                                x: Boundary.width * j,
                                y: Boundary.height * i
                            } 
                        })
                    )
                    break
                    case '.':
                        pellets.push(
                        new Pellet({
                            position: {
                            x: j * Boundary.width + Boundary.width / 2,
                            y: i * Boundary.height + Boundary.height / 2
                            }
                        })
                        )
                        break
            }
        })
    })

    const  handleKey = (event) => {
        let velocity = 0
        const step = 40;
        if (event.type == "keydown") {
            velocity = 2;
        }
        switch (event.keyCode) {
            case 87:
            player.velocity.y = -velocity;
            player.newPosition.y -= step
            break;
            case 83:
            player.velocity.y = velocity;
            player.newPosition.y += step
            break;
            case 65:
            player.velocity.x = -velocity;
            player.newPosition.x -= step
            break;
            case 68:
            player.velocity.x = velocity;
            player.newPosition.x += step
            break;
        }
    }

    const ref = useRef<HTMLCanvasElement>(null)

    useEffect(() => { 
        if( ref.current != undefined) {
            const canvas = ref.current; 
            const context = canvas.getContext('2d'); 
            let animationId;
            const animate = () => {
                animationId = requestAnimationFrame(animate)
                context.clearRect(0, 0, canvas.width, canvas.height)
                
                boundaries.forEach((boundary) => {
                    boundary.draw(context)

                    if ( circleCollidesWithRectangle(player, boundary)) {
                        player.velocity.x = 0;
                        player.velocity.y = 0;
                        player.newPosition.x = player.position.x
                        player.newPosition.y = player.position.y

                    }
                })

                for (let i = 0; pellets.length > i; i++ ) {
                    const pellet = pellets[i];
                    pellet.draw(context)                  

                    if (
                        Math.hypot(
                            pellet.position.x - player.position.x,
                            pellet.position.y - player.position.y
                        ) < pellet.radius + player.radius
                    ) {
                        pellets.splice(i,1)
                        if (pellets.length === 1) {
                            alert("You win!")
                        }
                    }                    
                }
                
                player.draw(context)
                if (JSON.stringify(player.position) != JSON.stringify(player.newPosition)) {
                    player.update(context)
                } else {
                    player.velocity.x = 0;
                    player.velocity.y = 0;
                }
                

                ghosts.forEach((ghost) => {
                    ghost.update(context)

                    if (
                        Math.hypot (
                            ghost.position.x - player.position.x,
                            ghost.position.y - player.position.y
                        ) < 
                        ghost.radius + player.radius
                    ) {
                        cancelAnimationFrame(animationId)
                        alert('LOSER')
                    }

                    const collisions = []
                    boundaries.forEach((boundary) => {
                        if (
                            !collisions.includes('right') &&
                            circleCollidesWithRectangle(
                                {
                                    ...ghost,
                                    velocity: {
                                        x: ghost.speed,
                                        y:0
                                    }
                                },
                                boundary
                            )
                        ) {
                            collisions.push('right')
                        }
                        if (
                            !collisions.includes('left') &&
                            circleCollidesWithRectangle(
                                {
                                    ...ghost,
                                    velocity: {
                                        x: -ghost.speed,
                                        y:0
                                    }
                                },
                                boundary
                            )
                        ) {
                            collisions.push('left')
                        }
                        if (
                            !collisions.includes('up') &&
                            circleCollidesWithRectangle(
                                {
                                    ...ghost,
                                    velocity: {
                                        x: 0,
                                        y:-ghost.speed
                                    }
                                },
                                boundary
                            )
                        ) {
                            collisions.push('up')
                        }
                        if (
                            !collisions.includes('down') &&
                            circleCollidesWithRectangle(
                                {
                                    ...ghost,
                                    velocity: {
                                        x: 0,
                                        y:ghost.speed
                                    }
                                },
                                boundary
                            )
                        ) {
                            collisions.push('down')
                        }
                    }) 
                    if (collisions.length > ghost.prevCollisions.length) {
                        ghost.prevCollisions = collisions
                    }

                    if (JSON.stringify(collisions) !== JSON.stringify(ghost.prevCollisions)) {
                        if (ghost.velocity.x > 0) {
                            ghost.prevCollisions.push ('right')
                        } else if (ghost.velocity.x < 0) {
                            ghost.prevCollisions.push ('left')
                        } else if (ghost.velocity.y < 0) {
                            ghost.prevCollisions.push ('up')
                        } else if (ghost.velocity.y > 0) {
                            ghost.prevCollisions.push ('down')
                        } 

                        const pathways = ghost.prevCollisions.filter ((collision) => {
                             return !collisions.includes(collision)
                        })
                        
                        const direction = pathways[Math.floor(Math.random() * pathways.length)]

                        switch (direction) {
                            case 'down':
                                ghost.velocity.y = ghost.speed
                                ghost.velocity.x = 0
                                break
                            case 'up':
                                ghost.velocity.y = -ghost.speed
                                ghost.velocity.x = 0
                                break
                            case 'left':
                                ghost.velocity.y = 0
                                ghost.velocity.x = -ghost.speed
                                break
                            case 'right':
                                ghost.velocity.y = 0
                                ghost.velocity.x = ghost.speed
                                break
                        } 
                        ghost.prevCollisions = []
                    }
                })
            }

            window.addEventListener('keydown', handleKey, true)
            // window.addEventListener('keyup', handleKey, true)
            animate()

            return () => {
                document.removeEventListener('keydown', handleKey);
                // document.removeEventListener('keyup', handleKey);

            }
        }
    },[draw])

    return ref
}

export default useCanvas;