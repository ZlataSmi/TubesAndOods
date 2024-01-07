import { CanvasProps } from "../../common/interfaces/interfaces"
import Canvas from "../Canvas/Canvas"

import './Game.css'

export const Game = () => {


  const draw: CanvasProps["draw"] = (ctx, count) => {
    if(ctx != null) {

      var p = new Path2D("M10 10 h 80 v 80 h -80 Z");
      ctx.fill(p);
  }
}

  return (
    <>
      <Canvas className="game__canvas" width={innerWidth} height={innerHeight} draw={draw}/>
    </>
  )
}
