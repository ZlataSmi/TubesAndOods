type Constructor = {
    position: {
        x: number,
        y: number
    },
    image?: HTMLImageElement,
    velocity?: {
        x: number,
        y: number
    },
    isDoorClosed?: boolean

}

export class Boundary {

    position: Constructor["position"]
    width: number
    height: number

    static width = 40
    static height = 40
    constructor({position} : Constructor) {
        this.position = position
        this.width = Boundary.width
        this.height = Boundary.height
    }

    draw(context : CanvasRenderingContext2D): void {
        context.fillStyle = 'black'
        context.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}
export class Tube {
    position: Constructor["position"]
    width: number
    height: number
    image: HTMLImageElement

    static width = 40
    static height = 40
    constructor({position, image} : Constructor) {
        this.position = position
        this.width = Tube.width
        this.height = Tube.height
        this.image = image!
    }

    draw(context : CanvasRenderingContext2D) {
        context.drawImage(this.image, this.position.x, this.position.y, this.width, this.height)
    }
}

export class Player {
    position: Constructor["position"]
    width: number
    height: number
    image: HTMLImageElement
    velocity: Constructor['velocity']
    newPosition: Constructor["position"] 
    
    static width = 40
    static height = 40
    constructor( {position, velocity, image} : Constructor) {
        this.position = position
        this.velocity = velocity
        this.width = Player.width
        this.height = Player.height
        this.image = image!
        this.newPosition = {x: position.x, y: position.y}
    }

    draw(context : CanvasRenderingContext2D) {
        context.drawImage(this.image, this.position.x, this.position.y, this.width, this.height)
    }

    update(context : CanvasRenderingContext2D) {
        this.draw(context)
        this.position.x += this.velocity!.x
        this.position.y += this.velocity!.y
    }
}

export class Ood {

    position: Constructor["position"]
    width: number
    height: number
    image: HTMLImageElement
    velocity: Constructor['velocity']
    prevCollisions: string[]
    speed: number

    static width = 40
    static height = 40
    static speed = 1
    constructor( {position, velocity, image} : Constructor) {
        this.position = position
        this.velocity = velocity
        this.width = Ood.width
        this.height = Ood.height
        this.image = image!
        this.prevCollisions = []
        this.speed = Ood.speed
    }

    draw(context : CanvasRenderingContext2D) {
        context.drawImage(this.image, this.position.x, this.position.y, this.width, this.height)
    }

    update(context : CanvasRenderingContext2D) {
        this.draw(context);
        this.position.x += this.velocity!.x
        this.position.y += this.velocity!.y
    }
}

export class Lever {
    position: Constructor["position"]
    width: number
    height: number
    image: HTMLImageElement
    isTurnedOn: boolean

    static width = 40
    static height = 40
    constructor({position, image} : Constructor) {
        this.position = position
        this.width = Lever.width
        this.height = Lever.height
        this.image = image!
        this.isTurnedOn = false
    }

    draw(context: CanvasRenderingContext2D) {
        context.drawImage(this.image, this.position.x, this.position.y, this.width, this.height)
    }
}

export class Door {
    position: Constructor["position"]
    width: number
    height: number
    image: HTMLImageElement
    isDoorClosed: boolean


    static width = 40
    static height = 40
    constructor({position, image, isDoorClosed} : Constructor) {
        this.position = position
        this.width = Door.width
        this.height = Door.height
        this.image = image!
        this.isDoorClosed = isDoorClosed!
    }

    draw(context: CanvasRenderingContext2D) {
        context.drawImage(this.image, this.position.x, this.position.y, this.width, this.height)
    }
}