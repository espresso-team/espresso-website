import React, { useState, useRef, useEffect, FormEvent } from 'react';
import PropTypes from 'prop-types';
import {MessageList} from './MessageList';
// import SendMessageForm from '../SendMessageForm/SendMessageForm';
import { User } from '../../types/User';
import { IMessage } from '../../types/IMessage';
import './style.css';
import { usePkSystemHook } from '../../state/pk-system-hook';
import { If } from '../../app/If';

interface Props {
  messages: IMessage[];
  isLoading: boolean;
  user: User;
  onSubmit: (mes: string) => void;
  pageRef: React.Ref<HTMLDivElement>
}
var console = require("console-browserify")

export const Chat = ({ messages, isLoading, user, onSubmit, pageRef }: Props) => {
  const scrollToDiv = useRef<HTMLDivElement>(null);
  const [state,action] = usePkSystemHook();
  const [message, setMessage] = useState("")

  const scrollToBottom = () => {
    setTimeout(() => {
      if(scrollToDiv.current)
      scrollToDiv.current.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
    }, 100);
  }

  useEffect(() => {
    console.log("chat messageList", state.messageList);
    scrollToBottom()
  }, [state.messageList]);
  return(
    <div className='chat-box'>
      <div className='msg-page'>
        <MessageList
          isLoading={isLoading}
          messages={messages}
          user={user}
          pageRef={pageRef}
        />
        <div className='chat-box-bottom' ref={scrollToDiv}>
          <div id='end-of-chat'></div>
        </div>
      </div>
      <div className='msg-footer'>
        <form
          className='message-form'
          onSubmit={
            (event: FormEvent) => {
              onSubmit(message);
              setMessage("");
              event.preventDefault();
            }
          }>
          <If condition={action.isModelSelected() === true}>
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
          </If>
        </form>
      </div>
  </div>
  )
};
