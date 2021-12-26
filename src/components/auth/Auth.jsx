import React, { useState } from 'react'
import InputMask from 'react-input-mask'
import './Auth.scss'
import bird from './BigBird.jpg'

const myMask = {phoneMask: '+7 ХХХ ХХХ-ХХ-ХХ'}

export const Auth = ({openModal}) => {
    const [phone, setPhone] = useState('')
    const [pass, setPass] = useState('')
    const [showPass, setShowPass] = useState(false)

    // useEffect( () => {
    //     const fetchData = async () => {
    //         const rs = await fetch('http://dev-exam.l-tech.ru/api/v1/phone_masks', {
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //         })
    //         if(rs.status === 200) {
    //             rs.then(res => res.json()).then(data => console.log(data))
    //         }
    //     }
    //     fetchData()
        
    // }, [])

    const doSubmit = async (e) => {
        e.preventDefault()

        let headers = new Headers();

        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        headers.append('Origin','http://localhost:3000');

        const rs = await fetch('http://dev-exam.l-tech.ru/api/v1/auth', {
            mode: 'cors',
            credentials: 'include',
            method: 'POST',
            headers: headers,
            body: {phone, password: pass}
        })

        console.log(rs.status)
    }

    return (
        <div className='auth'>
            <img src={bird} alt="Bird" />
            <div className='auth__right'>
                <p className='auth__choose'><span className='auth__select auth__select--active'>Войти</span><span className='auth__select'>Зарегистрироваться</span></p>
                <p className='auth__text'>Введите телефон и пароль для входа в личный кабинет.</p>
                <form action="/" method='POST' onSubmit={e => doSubmit(e)}>
                    <label className='auth__label-normal' htmlFor="tel">Контактный телефон</label>
                    <InputMask  className='auth__input' id='tel' name='tel' value={phone} placeholder={myMask.phoneMask.replace(/Х/g, '_')} mask={myMask.phoneMask.replace(/Х/g, '9')} onChange={e => setPhone(e.target.value)} required/>
                    <label className='auth__label-normal' htmlFor="pass">Пароль <span className='auth__show' onClick={(e) => {e.target.classList.toggle('auth__show--active'); setShowPass(showPass => !showPass)}}></span></label>
                    <input className='auth__input' id='pass' type={showPass ? 'text' : 'password'} name='pass' value={pass} placeholder='Введите пароль' onChange={e => setPass(e.target.value)} required />
                    <div className='auth__wrapper'>
                        <input className='auth__checkbox' type="checkbox" name="terms" id="terms" />
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