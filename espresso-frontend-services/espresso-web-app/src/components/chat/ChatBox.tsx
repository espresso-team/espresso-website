import React, { useEffect, useRef, useState } from 'react'
import { usePkSystemHook } from '../../state/pk-system-hook';
import { IMessage } from '../../types/IMessage';
import { User } from '../../types/User';
import { Chat } from './Chat';
import axios from 'axios';
import { ENDPOINT } from '../../types/Env';
import { useParams } from 'react-router-dom';
import GenderType from '../../types/GenderType';
import ChatHeader from './ChatHeader';

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
  const { modelIdLink } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const messagesEnd = useRef<HTMLDivElement>(null);
  const [state, action] = usePkSystemHook();
  
  useEffect(() => {
    console.log("Chat page - state.curUserName is", state.curUserName);
    if(state.curUserName === "User"){
      action.fetchUserProfile(GenderType.UNKNOWN, "未命名");
    }
    // if directly access to a chat page, meanwhile the chat is not jumping from mybot
    if(modelIdLink) {
      console.log("calling handleJoinChat:",modelIdLink);
      action.handleJoinChat(modelIdLink)
    }
  }, [modelIdLink]);

  useEffect(() => {
    if (state.messageList.length > 0) {
      setIsLoading(false);
    }
  }, [state.messageList]);

  return (
    <>
    <ChatHeader />
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
              //"avatar": "https://s2.loli.net/2023/03/25/JjnqHlgpFrEaN97.png",
              "avatar": state.userGender === GenderType.FAMALE ? "https://s2.loli.net/2023/05/20/Q3KUmsAc4pHvGzj.png": "https://s2.loli.net/2023/05/20/y3t5xrdBj6UaEOQ.png",
            }
          } as IMessage;

          action.updateMessageList(newUserMessage);
          // send post request
          console.log("state.curImageId.toString()",state.curImageId.toString())
          axios
            .post(`${ENDPOINT}/send-message`, 
            {
              "user_id": state.userId,
              "model_id": state.curModelIdString,
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
        </>
  )
};

export default ChatBox