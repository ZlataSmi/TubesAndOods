import type { ComponentPropsWithRef } from 'react';

export interface CanvasProps extends ComponentPropsWithRef<"canvas"> {
    draw: (context : CanvasRenderingContext2D | null, count : number) => void,
}
