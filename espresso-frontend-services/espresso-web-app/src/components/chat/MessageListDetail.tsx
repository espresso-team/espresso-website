import React, { useEffect, useState } from 'react'
import { IMessage } from '../../types/IMessage';
import { User } from '../../types/User';
import "./style.css"

interface Props {
  messages: { text: string; id: string; sender: User }[];
  user: User;
}
const isUser = (user: User, message: IMessage) => {
  return user.uid === message.sender.uid;
}

const getRenderName = (isUser: boolean, message: IMessage) => {
  let renderName;
  if (isUser) {
    renderName = null;
  } else {
    renderName = <div className='sender-name'>{message.sender.name}</div>;
  }
  return renderName
}

export const MessageListDetail = ({ messages, user }: Props) => {
  return (
    <>
      {messages.map(message => {
        return (
          <div
            key={message.id}
            className='chat-bubble-row'
            style={{ flexDirection: isUser(user, message) ? 'row-reverse' : 'row' }}>
            <img
              src={message.sender.avatar}
              alt='sender avatar'
              className='avatar'
              style={isUser(user, message) ? { marginLeft: '15px' } : { marginRight: '15px' }}
            />
            <div className={`chat-bubble ${isUser(user, message) ? 'is-user' : 'is-other'}`}>
              {getRenderName(isUser(user, message), message)}
              <div
                className='message'
                style={{ color: isUser(user, message) ? '#FFF' : '#2D313F' }}>
                {message.text}
              </div>
            </div>
          </div>
        )
      })}
    </>
  )
}