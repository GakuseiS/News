import React, { useState, useEffect } from 'react'
import InputMask from "react-input-mask";
import { Controller, useForm } from 'react-hook-form';
import { boolean, object, string } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import './Auth.scss'
import bird from 'src/assets/images/BigBird.jpg';


interface IAuth {
    openModal: Function;
    setAuth: Function;
}

const schema = object({
    phone: string().required(),
    password: string().required(),
    terms: boolean().oneOf([true])
})

export const Auth: React.FC<IAuth> = ({openModal, setAuth}) => {
    const [showPass, setShowPass] = useState(false)
    const [myMask, setMyMask] = useState({phoneMask: ''})
    const [error, setError] = useState(false);
    const {register, handleSubmit, control, formState: {errors}} = useForm({
        mode: 'onBlur',
        resolver: yupResolver(schema)
    });

    useEffect(() => {
        fetch('http://dev-exam.l-tech.ru/api/v1/phone_masks', {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json()).then(data => setMyMask(data))
    }, [])

    const doSubmit = async (data: any) => {
        const rs = await fetch('http://dev-exam.l-tech.ru/api/v1/auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `phone=${data.phone.replace(/[\s+-]/g, '')}&password=${data.password}`
        })

        if(rs.status === 200) {
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
                <form className='auth__form' action="/" method='POST' onSubmit={handleSubmit(doSubmit)}>
                    <label className='auth__label-normal' htmlFor="tel">Контактный телефон</label>
                    <Controller 
                        control={control}
                        name='phone'
                        defaultValue={''}
                        render={({field: { onChange, value }}) => <InputMask className={`auth__input ${!!errors.phone ? 'auth__form-error': ''}`} id='tel' value={value} placeholder={myMask.phoneMask.replace(/Х/g, '_')} mask={myMask.phoneMask.replace(/Х/g, '9')} onChange={onChange} />}
                    />
                    <label className='auth__label-normal' htmlFor="pass">Пароль <span className='auth__show' onClick={(e: any) => {e.target.classList.toggle('auth__show--active'); setShowPass(showPass => !showPass)}}></span></label>
                    <input {...register('password')} className={`auth__input ${!!errors.password ? 'auth__form-error': ''}`} id='pass' type={showPass ? 'text' : 'password'} name='password' placeholder='Введите пароль' />
                    <div className='auth__wrapper'>
                        <input {...register('terms')} className={`auth__checkbox`} type="checkbox" name="terms" id="terms"/>
                        <label className='auth__label-checkbox' htmlFor="terms"> <span className={`auth__custom-checkbox ${!!errors.terms ? 'auth__form-error': ''}`}></span> <div> Я принимаю условия <a className='auth__link' href="/">Пользовательского соглашения</a></div></label>
                    </div>
                    <button className='button auth__button' type='submit'>Вход</button>
                </form>
                <p className='auth__remember'><a className='auth__link' href="/">Забыли пароль?</a></p>
                <span className='auth__cross' onClick={() => openModal(false)}></span>
            </div>
        </div>
    )
}