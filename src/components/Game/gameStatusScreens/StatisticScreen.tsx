import { StatisticProps } from "../../../common/interfaces/interfaces"
import { renderGameStatistics } from "./renderGameStatistics"

export const StatisticScreen = (props : StatisticProps) => { 
    
    const {gameGlobalStatistic} = props

    return (
        <div id="game_statistic">
            <div className="statistic__units__wrapper">
                {renderGameStatistics(gameGlobalStatistic)}
            </div>
        </div>
    )
}