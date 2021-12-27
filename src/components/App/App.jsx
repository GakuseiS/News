import React, { useState } from 'react'
import { Footer } from '../footer/Footer';
import {Header} from '../header/Header'
import { Content } from '../content/Content';
import { Auth } from '../auth/Auth';
import { About } from '../About/About';
import { Modal } from '../Modal/Modal';
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.scss'
import { useEffect } from 'react/cjs/react.development';


const App = () => {
  
  const [authModal, setAuthModal] = useState(false)
  const [modal, setModal] = useState({id: '', open: false})
  const [loading, setLoading] = useState(true)
  const [cards, setCards] = useState([])
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    fetch('http://dev-exam.l-tech.ru/api/v1/posts', {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json()).then(data => {setCards(data); setLoading(false)})
  }, [])

    return (
      <Router>
        <div className="App">
              <Header setAuthModal={setAuthModal} isAuthenticated={isAuthenticated}/>
              <Routes >
                <Route path='/' element={<Content cards={cards} openModal={setModal} setCards={setCards} loading={loading}/>} />
                <Route path='/about' element={<About />} />
              </Routes >
              <Footer />
              {authModal && <Auth openModal={setAuthModal} setAuth={setIsAuthenticated}/>}
              {modal && cards.map(card => {
                if(card.id === modal.id) {
                  return <Modal key={card.id} title={card.title} text={card.text} image={card.image} date={card.date} openModal={setModal}/>}
                else {
                  return null
                }
              })}
        </div>
        </Router>
    );
  }
  

  

export default App;
