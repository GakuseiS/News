import React, {useState} from 'react'
import { NewsItem } from '../NewsItem/NewsItem'
import './Content.scss'

export const Content = ({cards, openModal, setCards}) => {

    const [modal, setModal] = useState(false)
    const [active, setActive] = useState({one: true, two: false, three: false})

    // useEffect(() => {
    //     fetch('http://dev-exam.l-tech.ru/api/v1/posts', {
    //         mode: 'cors',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     }).then(rs => rs.json()).then(data => console.log(data))
    // }, [])

    const sortCards = ({type}) => {
        if(type === 'pop') {
          setCards(cards.sort((left, right) => right.sort - left.sort))
        } else if(type === 'old') {
          setCards(cards.sort((left, right) => {
            if(new Date(left.date) > new Date(right.date)) {
              return 1
            } else if(new Date(left.date) < new Date(right.date)) {
              return -1
            } else {
              return 0
            }
          }))
        } else {
         setCards(cards.sort((left, right) => {
            if(new Date(left.date) < new Date(right.date)) {
              return 1
            } else if(new Date(left.date) > new Date(right.date)) {
              return -1
            } else {
              return 0
            }
          }))
        }
      }

    return (
        <main className='content'>
            <h2 className='content__title'>Лента</h2>
            <div>
                <p className='content__sort' onClick={() => setModal(prev => !prev)}>Сортировка <span className='content__arrow' ></span></p>
                <div className='content__list'>
                    {cards.map(card => {return <NewsItem key={card.id} id={card.id} image={card.image} title={card.title} text={card.text} date={card.date} openModal={openModal}/>})}
                </div>
            </div>
            {modal && <div className='content__modal'>
                <ul className='content__modal-list'>
                    {active.one && <li className='content__modal-item content__modal-item--active'>По популярности</li>}
                    {!active.one && <li className='content__modal-item' onClick={() => {setActive({one: true, two: false, three: false}); sortCards({type: 'pop'})}}>По популярности</li>}
                    {active.two && <li className='content__modal-item content__modal-item--active'>Сначала старые</li>}
                    {!active.two && <li className='content__modal-item' onClick={() => {setActive({one: false, two: true, three: false}); sortCards({type: 'old'})}}>Сначала старые</li>}
                    {active.three && <li className='content__modal-item content__modal-item--active'>Сначала новые</li>}
                    {!active.three && <li className='content__modal-item' onClick={() => {setActive({one: false, two: false, three: true}); sortCards({type: 'new'})}}>Сначала новые</li>}
                </ul>
            </div>}
        </main>
    )
}