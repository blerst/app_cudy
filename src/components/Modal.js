import React from 'react'
import './Modal.css'

function Modal({ closeModal }) {
  return (
    <div className='modalBackground'>
      <div className='modalContainer'>
        <button onClick={() => closeModal(false)}> X </button>
        <div className='title'>
          <h1>Yoooo</h1>
        </div>
        <div className='body'>
          <p>What up homie!</p>
        </div>
      </div>
    </div>
  )
}

export default Modal