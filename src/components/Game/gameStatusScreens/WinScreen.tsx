export const WinScreen = () => { 
    return (
        <div id="win_game">
            <div className="win_game__units__wrapper">
            <span className="win_game__unit win__text">Задание выполнено успешно!</span>
            <span className="win_game__unit">Приложите вашу ID карту к считывателю</span>
            <span className="win_game__unit">Нажмите Enter <img className='keybord_img' src="./assets_images/enter.png"/> чтобы начать заново</span>
            <hr className='game__hr'/>
            <span className="win_game__unit">Press <img className='keybord_img' src="./assets_images/pressF.png"/> to pay respect</span>
            </div>
        </div>
    )
}