import React from 'react'
import './Modal.scss'

export const Modal = ({title, text, date, image, openModal}) => {

    return (
        <div className='modal'>
            <h1 className='modal__title'>{title}</h1>
            <p className='modal__date'>{new Intl.DateTimeFormat('ru-RU', {day: '2-digit', month: 'long', hour: '2-digit', minute: '2-digit'}).format(new Date(date))}</p>
            <img className='modal__img' src={'/uploads/post/image/5f0c9c53-4eed-42bc-8293-2c90d72cc78b/thumb_1_image_12.jpg'} width={740} height={470} alt={title} />
            <p className='modal__text'>{text}</p>
            <span className='modal__cross' onClick={() => openModal({id: '', open: false})}></span>
        </div>
    )
}