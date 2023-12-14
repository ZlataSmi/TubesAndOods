import useCanvas from "./useCanvas";
import {CanvasProps} from '../../common/interfaces/interfaces'


const Canvas  = (props : CanvasProps) => {


    const {draw, ... rest} = props
    const ref = useCanvas(draw)
   
    return <canvas ref={ref} {...rest}/>
}

export default Canvas;