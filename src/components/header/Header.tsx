import React from 'react'
import {NavLink} from 'react-router-dom'
import './Header.scss'
import logo from './logo.svg'
import login from './login.svg'

interface IHeader {
    setAuthModal: Function;
    isAuthenticated: boolean;
}

export const Header:React.FC<IHeader> = ({setAuthModal, isAuthenticated}) => {
    return (
        <header className='header'>
            <img className='header__logo' src={logo} alt="Новости" />
            <nav className='header__nav'>
                <ul className='header__list'>
                    <li className='header__item'><NavLink className={({isActive}) => isActive ? 'header__link header__link--active' : 'header__link'} to={'/'}>Лента</NavLink></li>
                    <li className='header__item'><NavLink className='header__link' to="/">Истории</NavLink></li>
                    <li className='header__item'><NavLink className='header__link' to="/">Разборы</NavLink></li>
                    <li className='header__item'><NavLink className={({isActive}) => isActive ? 'header__link header__link--active' : 'header__link'} to={'/about'}>О проекте</NavLink></li>
                </ul>
            </nav>
            {isAuthenticated && <p className='header__auth'>Вы авторизированы</p>}
            {!isAuthenticated && <img className='header__login' src={login} alt="Логин" onClick={() => setAuthModal(true)} />}
        </header> 
    )
}