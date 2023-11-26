import React from 'react'
import style from './MessageBot.module.scss'

const MessageBot = ({ resposta }) => {
  return (
    <div className={style['bot-content']}>
      <h4>Bot</h4>
      <p className={style['message-content']}>{resposta}</p>
    </div>
  )
}

export default MessageBot