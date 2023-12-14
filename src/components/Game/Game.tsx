import { CanvasProps } from "../../common/interfaces/interfaces"
import Canvas from "../Canvas/Canvas"

import './Game.css'

export const Game = () => {

  const draw: CanvasProps["draw"] = (context, count) => {
    if(context != null) {
      context.clearRect(0,0,context.canvas.width, context.canvas.height)
      context.fillStyle = 'grey';
      const delta = count % 800
      context.fillRect(10 +delta,10,100,100);
    }

}

const draw2: CanvasProps["draw"] = (context, count) => {
  if(context != null) {
    context.clearRect(0,0,context.canvas.width, context.canvas.height)
    context.fillStyle = 'grey';
    const delta = count % 100
    context.fillRect(10 ,10 +delta,100,100);
  }
}

  return (
    <>
      <Canvas className="game__canvas1" draw={draw}/>
      <Canvas className="game__canvas2" draw={draw2}/>
    </>
  )
}
