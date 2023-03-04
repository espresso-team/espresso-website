import React, { useEffect, useState } from 'react'
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
  const [state, action] = usePkSystemHook();
  const [messageList, setMessageList] = useState([] as IMessage[])

  useEffect(() => {
    // 这里写需要在第一次挂载时执行的代码
    const res = axios
      .post(`http://localhost:3000/join-chat`,
        {
          "user_id": state.curUserId.toString(),
          "model_id": state.curImageId.toString()
        }
      )
      .then((response) => {
        console.log("response", response.data)
        const message = response.data.message;
        const uID = response.data.user_id;
        const mID = response.data.model_id;
        const initialMessage =
          {
            "text": message,
            "id": mID,
            "sender": {
              "name": state.images[mID].name,
              "uid": uID,
              "avatar": state.images[mID].src,
            }
          } as IMessage;
        setMessageList([initialMessage])
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Chat
      messages={messageList}
      isLoading={false}
      user={MockUser1}
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

          var console = require("console-browserify")
          console.log("newUserMessage", newUserMessage)
          // add newUserMessage to messageList
          let newMessageList: IMessage[] = messageList;
          newMessageList.push(newUserMessage);
          setMessageList(newMessageList);

          // send post request
          const res = axios
            .post(`http://localhost:3000/send-message`, 
            {
              "user_id": state.curUserId.toString(),
              "model_id": state.curImageId.toString(),
              "message": mes
              })
            .then((response) => {
              console.log("new join-chat response", response.data)
              const message = response.data.message;
              const uID:string = response.data.user_id;
              const mID:string = response.data.model_id;
              const mIDNumber: number = +mID;
              console.log("debug uID", uID)
              console.log("debug mID", mID)
              const initialMessage =
                {
                  "text": message,
                  "id": mID,
                  "sender": {
                    "name": state.images[mIDNumber].name,
                    "uid": uID,
                    "avatar": state.images[mIDNumber].src,
                  }
                } as IMessage;

              console.log("debug initialMessage", initialMessage)
              let newMessageList: IMessage[] = messageList
              console.log("debug newMessageList", newMessageList)
              newMessageList.push(initialMessage)
              setMessageList(newMessageList)
            })
            .catch((err) => console.log(err));
        }} />
  )
};

export default ChatBox