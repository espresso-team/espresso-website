import React, { useState, useRef, useEffect, FormEvent } from 'react';
import PropTypes from 'prop-types';
import {MessageList} from './MessageList';
// import SendMessageForm from '../SendMessageForm/SendMessageForm';
import './style.css';
import { User } from '../../types/User';
import { IMessage } from '../../types/IMessage';

interface Props {
  messages: IMessage[];
  isLoading: boolean;
  user: User;
  onSubmit: (mes: string) => void;
}

export const Chat = ({ messages, isLoading, user, onSubmit }: Props) => {
  const [message, setMessage] = useState("")
  return(
    <div className='chat-box'>
      <div className='msg-page'>
        <MessageList
          isLoading={isLoading}
          messages={messages} 
          user={user}
        />
        <div className='chat-box-bottom'>
          <div id='end-of-chat'></div>
        </div>
      </div>
      <div className='msg-footer'>
        <form
          className='message-form'
          onSubmit={
            (event: FormEvent) => {
              event.preventDefault();
              onSubmit(message);
              setMessage("");
            }
          }>
          <div className='input-group'>
            <input
              type='text'
              className='form-control message-input'
              placeholder='在这里输入'
              value={message}
              onChange={
                (event: React.ChangeEvent<HTMLInputElement>) => {
                  setMessage(event.target.value)
                }
              }
              required
            />
          </div>
        </form>
      </div>
  </div>
  )
};
