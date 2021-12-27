import React from 'react'
import './NewsItem.scss'

export const NewsItem = ({image, title, text, date, id, openModal}) => {

    const doShortText = () => {
        let newText
        
        if(text.length > 174) {
            newText = text.substr(0, 174)
        } else {
            newText = text
        }

        return newText + '...'
    }

    return (
        <div className='newsItem' onClick={() => {openModal({id, open: true})}}>
            <img className='newsItem__img' src={'/uploads/post/image/5f0c9c53-4eed-42bc-8293-2c90d72cc78b/thumb_1_image_12.jpg'} width={364} height={260} alt={title} />
            <div className='newsItem__wrapper'> 
                <h5 className='newsItem__title'>{title}</h5>
                <p className='newsItem__text'>{doShortText()}</p>
                <p className='newsItem__date'>{new Intl.DateTimeFormat('ru-RU', {day: '2-digit', month: 'long', hour: '2-digit', minute: '2-digit'}).format(new Date(date))}</p>
            </div>
        </div>
    )
}