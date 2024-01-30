import type { ComponentPropsWithRef, ComponentPropsWithoutRef } from 'react';

export interface CanvasProps extends ComponentPropsWithRef<"canvas"> {
    draw: (context : CanvasRenderingContext2D | null, count : number) => void,
}

export interface GameGlobalStatistic {
        allOodSwitchedLevers: number,
        playerDeaths: number,
        gameWins: number
}

export interface StatisticProps extends ComponentPropsWithoutRef<'div'> {
    gameGlobalStatistic: GameGlobalStatistic
}