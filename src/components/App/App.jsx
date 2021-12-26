import React, { useState } from 'react'
import { Footer } from '../footer/Footer';
import {Header} from '../header/Header'
import { Content } from '../content/Content';
import { Auth } from '../auth/Auth';
import { About } from '../About/About';
import { Modal } from '../Modal/Modal';
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.scss'


const App = () => {
  
  const [authModal, setAuthModal] = useState(false)
  const [modal, setModal] = useState({id: '', open: false})
  const [cards, setCards] = useState([{"id":"464671d1-02ea-453d-af39-875c621e2574", "title":"The Daffodil Sky", "text":"We’re going to get older whether we like it or not, so the only question is whether we get on with our lives, or desperately cling to the past.", "image":"/uploads/post/image/5ca14998-3635-4ecf-a728-59a3ccb967c6/thumb_9_image_2.jpg","sort":13,"date":"2021-12-26T11:38:21Z"},
  {"id":"b29b099f-0ecd-4744-83f7-8992a4ebb95c","title":"The Road Less Traveled","text":"The future is scary but you can’t just run back to the past because it’s familiar.","image":"/uploads/post/image/5ca14998-3635-4ecf-a728-59a3ccb967c6/thumb_9_image_2.jpg","sort":12,"date":"2021-12-22T13:01:43Z"},
  {"id":"4d3b6a34-f98d-4443-8260-9cb1c2270eff","title":"By Grand Central Station I Sat Down and Wept","text":"Revenge fantasies never work out the way you want.","image":"/uploads/post/image/5ca14998-3635-4ecf-a728-59a3ccb967c6/thumb_9_image_2.jpg","sort":11,"date":"2021-12-22T13:01:40Z"},
  {"id":"47bec0dd-364d-47d1-8eec-0f6920cf2b7a","title":"Ego Dominus Tuus","text":"The future is scary but you can’t just run back to the past because it’s familiar.","image":"/uploads/post/image/5ca14998-3635-4ecf-a728-59a3ccb967c6/thumb_9_image_2.jpg","sort":10,"date":"2021-12-22T13:01:25Z"},
  {"id":"44315111-5924-420c-b693-738f803a1af0","title":"The Way of All Flesh","text":"That’s life, you know, we never end up where you thought you wanted to be.","image":"/uploads/post/image/5ca14998-3635-4ecf-a728-59a3ccb967c6/thumb_9_image_2.jpg","sort":9,"date":"2021-12-22T13:01:18Z"},
  {"id":"4d5e3a31-3ce8-4fe1-9f8b-66a5aa19e2dd","title":"O Jerusalem!","text":"Because sometimes even if you know how something’s gonna end that doesn’t mean you can’t enjoy the ride.","image":"/uploads/post/image/5ca14998-3635-4ecf-a728-59a3ccb967c6/thumb_9_image_2.jpg","sort":8,"date":"2021-12-22T12:50:40Z"},
  {"id":"0027ae35-e91d-4fed-ab28-3f1c365baba1","title":"Fear and Trembling","text":"We’re going to get older whether we like it or not, so the only question is whether we get on with our lives, or desperately cling to the past.","image":"/uploads/post/image/5ca14998-3635-4ecf-a728-59a3ccb967c6/thumb_9_image_2.jpg","sort":7,"date":"2021-12-22T09:00:50Z"},
  {"id":"4349abc1-80cf-4bac-8577-f8f057041569","title":"The Yellow Meads of Asphodel","text":"The future is scary but you can’t just run back to the past because it’s familiar.","image":"/uploads/post/image/5ca14998-3635-4ecf-a728-59a3ccb967c6/thumb_9_image_2.jpg","sort":6,"date":"2021-12-22T09:00:49Z"},
  {"id":"f93f9797-22ff-4f3e-82f9-96f7d65aaf37","title":"Tender Is the Night","text":"Whenever I’m sad, I stop being sad and be awesome instead.","image":"/uploads/post/image/5ca14998-3635-4ecf-a728-59a3ccb967c6/thumb_9_image_2.jpg","sort":5,"date":"2021-12-22T08:45:48Z"},
  {"id":"4d760d06-c8cd-4dd6-b2bd-612f53fedb2a","title":"A Confederacy of Dunces","text":"Whether a gesture’s charming or alarming, depends on how it’s received.","image":"/uploads/post/image/5ca14998-3635-4ecf-a728-59a3ccb967c6/thumb_9_image_2.jpg","sort":4,"date":"2021-12-22T08:45:48Z"}])

  return (
    <Router>
      <div className="App">
            <Header setAuthModal={setAuthModal} />
            <Routes >
              <Route path='/' element={<Content cards={cards} openModal={setModal} setCards={setCards}/>} />
              <Route path='/about' element={<About />} />
            </Routes >
            <Footer />
            {authModal && <Auth openModal={setAuthModal} />}
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
