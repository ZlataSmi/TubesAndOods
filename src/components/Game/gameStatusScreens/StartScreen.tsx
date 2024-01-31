export const StartScreen = () => { 
    return (
        <div id="start_game">
            <div className="start_game__units__wrapper">
                <span className="start__text start_game__unit">Система аварийного питания вентиляции</span>
                <div className="rules start_game__unit">
                    <div className="rule__unit">
                        <div className="rules__img__wrapper">
                            <img className="rules__img" src="./assets_images/player.png"/>
                        </div>
                        <span className="rules__text">Член экипажа, отправленный в вентиляцию для перезапуска системы аварийного включения</span> 
                    </div>
                    <div className="rule__unit">
                        <div className="rules__img__wrapper">
                            <img className="rules__img" src="./assets_images/wsad.png"/>
                        </div>
                        <span className="rules__text">Кнопки для направления члена экипажа</span> 
                    </div>
                    <div className="rule__unit">
                        <div className="rules__img__wrapper">
                            <img className="rules__img" src="./assets_images/lever_both.png"/>
                        </div>
                        <span className="rules__text">Все рычаги системы питания должны быть подняты</span> 
                    </div>
                    <div className="rule__unit">
                        <div className="rules__img__wrapper">
                            <img className="rules__img" src="./assets_images/ood.png"/>
                        </div>
                        <span className="rules__text">Уды обезумели от голоса Сатаны в их головах. Берегитесь!</span> 
                    </div>
                    <div className="rule__unit">
                        <div className="rules__img__wrapper">
                            <img className="rules__img" src="./assets_images/door_both.png"/>
                        </div>
                        <span className="rules__text">Для открытия/закрытия дверей нажмите <img className='keybord_img' src="./assets_images/pressF.png"/></span> 
                    </div>
                </div>
                <span className="start_game__unit">Нажмите Enter <img className='keybord_img' src="./assets_images/enter.png"/> чтобы начать</span>
            </div>
        </div>
    )
}