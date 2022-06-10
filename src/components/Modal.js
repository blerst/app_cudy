import React from 'react'
import './Modal.css'
import img1 from './cudy1.png';
import img2 from './Box1.png';
import img3 from './Box2.png';
import img4 from './Box3.png';

function Modal({ closeModal }) {
  return (
    <div className='modalBackground'>
      <div className='modalContainer'>
        <button className='titleCloseBtn' onClick={() => closeModal(false)}> X </button>
        <img className='logo' src={img1} alt=''/>
        <div className='body'>
          <p className='todotext'>To start, you need to enter a todo into the box! </p>
          <img className='todobox' src={img2} alt=''/>
        </div>
        <div className='body'>
          <p className='todotext_3'>If a todo is orange, it is overdue!</p>
          <img className='todobox_img3' src={img3} alt=''/>
        </div>
        <div className='body'>
          <p className='todotext_3'>If a todo is blue, you still have time to do it!</p>
          <img className='todobox_img4' src={img4} alt=''/>
        </div>
      </div>
    </div>
  )
}

export default Modal