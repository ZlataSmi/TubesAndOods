import {CanvasProps} from '../../common/interfaces/interfaces'
import { useEffect, useRef } from "react";

const Canvas  = (props : CanvasProps) => {

    const {draw, ... rest} = props
    const ref = useRef<HTMLCanvasElement>(null)

    useEffect(() => { 

        if( ref.current != undefined) {
            const canvas = ref.current; 
            const context = canvas.getContext('2d'); 
            let animationID = 0;

            const renderer = () => {
                animationID=window.requestAnimationFrame(renderer)
                draw(context, animationID)
            }
                renderer()
        }
    })
   
    return <canvas ref={ref} {...rest}/>
}

export default Canvas;