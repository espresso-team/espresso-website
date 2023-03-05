import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { pkSystemApi, usePkSystemHook } from '../../state/pk-system-hook';
import { IMessage } from '../../types/IMessage';
import { User } from '../../types/User';
import { Chat } from './Chat';
import axios from 'axios';

interface Props {
  userId: string;
}

const MockUser =
  {
    name: "Jack",
    avatar: "https://s2.loli.net/2023/02/22/NA9cIs4veuBMPD8.png",
    uid: "01",
  } as User

const MockUser1 =
  {
    name: "Jack",
    avatar: "",
    uid: "01",
  } as User

const MockMessage = [
  {
    "text": "你好呀~ 是不是很想我了呢？嘻嘻，我也好想你哦！",
    "id": "1",
    "sender": {
      "name": "小美",
      "uid": "user1",
      "avatar": "https://s2.loli.net/2023/02/22/AsruGwFVWnyK23P.png",
    },
  },
  {
    "text": "你昨晚睡觉的时候做梦，喊的那个男生的名字是谁",
    "id": "2",
    "sender": {
      "name": "ZL",
      "uid": "user2",
      "avatar": "https://data.cometchat.com/assets/images/avatars/ironman.png",
    },
  },
  {
    "text": "啊，真的吗？！我好像完全不记得做了什么梦诶，也没喊名字啊... 你一定是开玩笑吧？嘻嘻~",
    "id": "3",
    "sender": {
      "name": "小美",
      "uid": "user1",
      "avatar": "https://s2.loli.net/2023/02/22/AsruGwFVWnyK23P.png",
    },
  }
] as IMessage[]

var console = require("console-browserify")

const ChatBox: React.FC<Props> = () => {
  const messagesEnd = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    if (messagesEnd && messagesEnd.current) {
      messagesEnd.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  const [state, action] = usePkSystemHook();

  useEffect(() => {
    console.log("Chatbox messageList", state.messageList);
    //scrollToBottom();
  }, [state.messageList]);

  return (
    <Chat
      messages={state.messageList}
      isLoading={false}
      user={MockUser1}
      pageRef={messagesEnd}
      onSubmit={
        (mes: string) => {
          const newUserMessage = {
            "text": mes,
            "id": state.curImageId.toString(),
            "sender": {
              "name": state.curUserName,
              "uid": state.curUserId.toString(),
              "avatar": "https://data.cometchat.com/assets/images/avatars/ironman.png",
            }
          } as IMessage;

          action.updateMessageList(newUserMessage);
          // send post request
          const res = axios
            .post(`http://localhost:3000/send-message`, 
            {
              "user_id": state.curUserId.toString(),
              "model_id": state.curImageId.toString(),
              "message": mes
              })
            .then((response) => {
              // console.log("new join-chat response", response.data)
              const message = response.data.message;
              const uID:string = response.data.user_id;
              const mID:string = response.data.model_id;
              const mIDNumber: number = +mID;
              const receivedMessage =
                {
                  "text": message,
                  "id": mID,
                  "sender": {
                    "name": state.images[mIDNumber].name,
                    "uid": uID,
                    "avatar": state.images[mIDNumber].src,
                  }
                } as IMessage;
              
              action.updateMessageList(receivedMessage);
            })
            .catch((err) => console.log(err));
        }} />
  )
};

export default ChatBox