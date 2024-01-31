import { GameGlobalStatistic } from "../../../common/interfaces/interfaces";

export const renderGameStatistics = (gameGlobalStatistic : GameGlobalStatistic) => {

    const statisticsDiv : JSX.Element[] = []

    let payRespect = 0;

    if (localStorage.getItem('pressF') != null) {
        payRespect = JSON.parse(localStorage.getItem('pressF') as string)
    }

    statisticsDiv.push(
        <div key='3' className='statistic__unit'>
            <div className="statistic__img__wrapper">
                <img className="statistic__img" src="./assets_images/ood_n_lever.png"/>
            </div>
            <span className="statistic__text">Всего Уды опустили рычагов: {gameGlobalStatistic.allOodSwitchedLevers}</span>    
        </div>
    )
    statisticsDiv.push(
        <div key='4' className='statistic__unit'>
            <div className="statistic__img__wrapper">
                <img className="statistic__img" src="./assets_images/player_dead.png"/>
            </div>
            <span className="statistic__text">Членов экипажа погибло в вентиляции:  {gameGlobalStatistic.playerDeaths}</span>    
        </div>
    )
    statisticsDiv.push(
        <div key='5' className='statistic__unit'>
            <div className="statistic__img__wrapper">
                <img className="statistic__img" src="./assets_images/win.png"/>
            </div>
            <span className="statistic__text">Успешных перезапусков питания вентиляции: {gameGlobalStatistic.gameWins} </span>    
        </div>
    )
    if(payRespect != 0) {
        statisticsDiv.push(
            <div key='6' className='statistic__unit'>
                <div className="statistic__img__wrapper">
                    <img className="statistic__img" src="./assets_images/pressF.png"/>
                </div>
                <span className="statistic__text">Игроков, нажавших <img className='keybord_img' src="./assets_images/pressF.png"/> to pay respect: {payRespect} </span>    
            </div>
        )}
    return statisticsDiv
}