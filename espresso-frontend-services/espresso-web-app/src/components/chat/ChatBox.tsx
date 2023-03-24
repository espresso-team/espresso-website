import React, { useEffect, useRef, useState } from 'react'
import { pkSystemApi, usePkSystemHook } from '../../state/pk-system-hook';
import { IMessage } from '../../types/IMessage';
import { User } from '../../types/User';
import { Chat } from './Chat';
import axios from 'axios';

interface Props {
  userId: string;
}

const MockUser1 =
  {
    name: "Jackfdweo2134183",
    avatar: "",
    uid: "01",
  } as User

var console = require("console-browserify")

const ChatBox: React.FC<Props> = () => {
  const [isLoading, setIsLoading] = useState(true);
  const messagesEnd = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    if (messagesEnd && messagesEnd.current) {
      messagesEnd.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  const [state, action] = usePkSystemHook();

  useEffect(() => {
    if (state.messageList.length > 0) {
      setIsLoading(false);
    }
  }, [state.messageList]);

  return (
    <Chat
      messages={state.messageList}
      isLoading={isLoading}
      user={MockUser1}
      pageRef={messagesEnd}
      onSubmit={
        (mes: string) => {
          const newUserMessage = {
            "text": mes,
            "id": state.curImageId.toString(),
            "sender": {
              "name": state.curUserName,
              "uid": state.userId,
              "avatar": "https://data.cometchat.com/assets/images/avatars/ironman.png",
            }
          } as IMessage;

          action.updateMessageList(newUserMessage);
          // send post request
          axios
            .post(`http://localhost:3000/send-message`, 
            {
              "user_id": state.userId,
              "model_id": state.curImageId.toString(),
              "message": mes
              })
            .then((response) => {
              const message = response.data.message;
              const uID:string = response.data.user_id;
              const mID:string = response.data.model_id;
              const receivedMessage =
                {
                  "text": message,
                  "id": mID,
                  "sender": {
                    "name": state.curModelName,
                    "uid": uID,
                    "avatar": state.curModelSrc,
                  }
                } as IMessage;
              
              action.updateMessageList(receivedMessage);
            })
            .catch((err) => console.log(err));
        }} />
  )
};

export default ChatBox