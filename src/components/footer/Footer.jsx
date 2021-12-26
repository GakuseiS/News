import React from 'react'
import {Link} from 'react-router-dom'
import './Footer.scss'

export const Footer = () => {
    return (
        <footer className='footer'>
            <nav className='footer__nav'>
                <ul className='footer__list'>
                    <li className='footer__item'><Link to={'/'} className='footer__link' href="/">Лента</Link></li>
                    <li className='footer__item'><a className='footer__link' href="/">Истории</a></li>
                    <li className='footer__item'><a className='footer__link' href="/">Разборы</a></li>
                    <li className='footer__item'><Link to={'/about'} className='footer__link' href="/">О проекте</Link></li>
                    <li className='footer__item'><a className='footer__link' href="/">Техподдержка</a></li>
                    <li className='footer__item'><a className='footer__link' href="/">Вакансии</a></li>
                </ul>
            </nav>
            <p className='footer__about'>© 2021 «Новости.Ру»</p>
        </footer>
    )
}