import { Boundary, Door, Lever, Ood, Player } from "./assets"

export   const collisionCreatureToBarrier = (creature : Player | Ood, barrier: Door | Boundary) => {
    if (creature.position.y == barrier.position.y && creature.position.x + creature.width == barrier.position.x) 
      return 'right'
    else if (creature.position.y == barrier.position.y && creature.position.x - creature.width == barrier.position.x) 
      return 'left'
    else if (creature.position.x == barrier.position.x && creature.position.y + creature.height == barrier.position.y) 
      return 'down'
    else if (creature.position.x == barrier.position.x && creature.position.y - creature.height == barrier.position.y) 
      return 'up'
    else
      return false
  }

  export   const collisionCreatureToCreature = (creature1 : Player | Ood, creature2 : Player | Ood) => {
    if (creature1.position.y == creature2.position.y && Math.abs(creature2.position.x + creature2.velocity!.x - (creature1.position.x + creature1.width / 4 + creature1.velocity!.x)) < creature1.width / 4) {
      return 'right'
    }
    else if (creature1.position.y == creature2.position.y && Math.abs(creature1.position.x + creature1.velocity!.x - (creature2.position.x + creature2.width / 4 + creature2.velocity!.x)) < creature1.width / 4 ) {
      return 'left'
    }
    else if (creature1.position.x == creature2.position.x && Math.abs(creature2.position.y + creature2.velocity!.y - (creature1.position.y + creature1.height / 4 + creature1.velocity!.y)) < creature1.height / 4) 
      return 'down'
    else if (creature1.position.x == creature2.position.x && Math.abs(creature1.position.y + creature1.velocity!.y - (creature2.position.y + creature2.height / 4 + creature2.velocity!.y)) < creature1.height / 4) 
      return 'up'
    else
      return false
  }

  export const collisionCreatureToLever = (creature : Player | Ood, lever : Lever) => {
    if (creature.position.x == lever.position.x && creature.position.y == lever.position.y) {
      return true
    } 
    return false
  }