import { useEffect, useRef } from "react"; 
import {CanvasProps} from '../../common/interfaces/interfaces'

const useCanvas  = (draw : CanvasProps["draw"]) => {

    const ref = useRef<HTMLCanvasElement>(null)

    useEffect(() => { 
        if( ref.current != undefined) {
            const canvas = ref.current; 
            const context = canvas.getContext('2d'); 
            let count = 0;
            let animationID : number;
    
            const renderer = () => {
                count ++;
                draw(context, count)
                animationID=window.requestAnimationFrame(renderer)
            }
            renderer()
    
            return () => window.cancelAnimationFrame(animationID)
        }

    },[draw])

    return ref
}

export default useCanvas;