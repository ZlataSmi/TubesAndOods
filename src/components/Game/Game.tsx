import Canvas from "../Canvas/Canvas.tsx"

import './Game.css'

export const Game = () => {

  const draw = (context, count) => {
    context.clearRect(0,0,context.canvas.width, context.canvas.height)
    context.fillStyle = 'grey';
    const delta = count % 800
    context.fillRect(10 +delta,10,100,100);
}

const draw2 = (context, count) => {
  context.clearRect(0,0,context.canvas.width, context.canvas.height)
  context.fillStyle = 'grey';
  const delta = count % 100
  context.fillRect(10 ,10 +delta,100,100);
}

  return (
    <>
      <Canvas className="game__canvas1" draw={draw}/>
      <Canvas className="game__canvas2" draw={draw2}/>
    </>
  )
}
