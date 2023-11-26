import React from 'react'
import style from './MessageUser.module.scss'

const MessageUser = ({pergunta}) => {
  return (
    <div className={style['user-content']}>
        <h4>Você</h4>
        <p className={style['message-content']}>{pergunta}</p>
    </div>
  )
}

export default MessageUser