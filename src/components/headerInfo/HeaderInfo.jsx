import React, { useState } from 'react'
import styles from './HeaderInfo.module.scss'

const HeaderInfo = ({onClick}) => {

  const [activeButton, setActiveButton] = useState('information');

  const handleClick = (reference) => {
    setActiveButton(reference);
    onClick(reference);
  }

  return (
    <>
    <div className={styles['text-content']}>
        <h1>Bem-vindo as configurações de chatbot Whatsapp</h1>
        <p>Aqui você pode criar e editar seu chatbot</p>
    </div>
    <div className={`${styles.actions}`}>
        <button className={` ${activeButton === 'information' ? styles.clicked : ''}`} onClick={() => handleClick('information')}>
          Base de Informações
          </button>
        <button className={` ${activeButton === 'chat' ? styles.clicked : ''}`} onClick={() => handleClick('chat')}>
          Chat
          </button>
    </div>
    </>
  )
}

export default HeaderInfo