import { StatisticProps } from "../../../common/interfaces/interfaces"
import { renderGameStatistics } from "./renderGameStatistics"

export const LoseScreen = (props : StatisticProps) => { 

    const {gameGlobalStatistic} = props
    const gameStatistics = renderGameStatistics(gameGlobalStatistic)
    const randomFact = gameStatistics[Math.floor(Math.random() * gameStatistics.length)]

    return (
        <div id="lose_game">
            <div className="lose__game__bcg_noise">
                <div className="lose_game__units__wrapper">
                    <span className="lose_game__unit die__text">LOL YOU DIED</span>
                    <span className="lose_game__unit">Нажмите Enter <img className='keybord_img' src="./assets_images/enter.png"/> чтобы начать заново</span>
                    <hr className='game__hr'/>
                    {randomFact}
                    <span className="lose_game__unit">Press <img className='keybord_img' src="./assets_images/pressF.png"/> to pay respect</span>
                </div>
            </div>

        </div>
    )
}