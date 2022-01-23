import React, { useState } from 'react'
import InputMask from 'react-input-mask'
import { useEffect } from 'react/cjs/react.development'
import './Auth.scss'
import bird from './BigBird.jpg'

export const Auth = ({openModal, setAuth}) => {
    const [phone, setPhone] = useState('')
    const [pass, setPass] = useState('')
    const [showPass, setShowPass] = useState(false)
    const [myMask, setMyMask] = useState({phoneMask: ''})
    const [error, setError] = useState(false)

    useEffect(() => {
        fetch('http://dev-exam.l-tech.ru/api/v1/phone_masks', {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json()).then(data => setMyMask(data))
    }, [])

    const doSubmit = async (e) => {
        e.preventDefault()

        const rs = await fetch('http://dev-exam.l-tech.ru/api/v1/auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `phone=${phone}&password=${pass}`
        })

        if(rs.status === 200) {
            localStorage.setItem('login', phone)
            localStorage.setItem('pass', pass)
            setAuth(true)
            openModal(false)
        } else {
            setError(true)
        }        
    }

    return (
        <div className='auth'>
            <img src={bird} className='auth__img' alt="Bird" />
            <div className='auth__right'>
                <p className='auth__choose'><span className='auth__select auth__select--active'>Войти</span><span className='auth__select'>Зарегистрироваться</span></p>
                <p className='auth__text'>Введите телефон и пароль для входа в личный кабинет.</p>
                {error && <p className='auth__error'>Данные логин и пароль не найдены.</p>}
                <form className='auth__form' action="/" method='POST' onSubmit={e => doSubmit(e)}>
                    <label className='auth__label-normal' htmlFor="tel">Контактный телефон</label>
                    <InputMask  className='auth__input' id='tel' name='phone' value={phone} placeholder={myMask.phoneMask.replace(/Х/g, '_')} mask={myMask.phoneMask.replace(/Х/g, '9')} onChange={e => { setPhone(e.target.value.replace(/[\s+-]/g, ''))}} required/>
                    <label className='auth__label-normal' htmlFor="pass">Пароль <span className='auth__show' onClick={(e) => {e.target.classList.toggle('auth__show--active'); setShowPass(showPass => !showPass)}}></span></label>
                    <input className='auth__input' id='pass' type={showPass ? 'text' : 'password'} name='password' value={pass} placeholder='Введите пароль' onChange={e => setPass(e.target.value)} required />
                    <div className='auth__wrapper'>
                        <input className='auth__checkbox' type="checkbox" name="terms" id="terms" required/>
                        <label className='auth__label-checkbox' htmlFor="terms"> <span className='auth__custom-checkbox'></span> <div> Я принимаю условия <a className='auth__link' href="/">Пользовательского соглашения</a></div></label>
                    </div>
                    <button className='button auth__button' type='submit'>Вход</button>
                </form>
                <p className='auth__remember'><a className='auth__link' href="/">Забыли пароль?</a></p>
                <span className='auth__cross' onClick={() => openModal(false)}></span>
            </div>
        </div>
    )
}