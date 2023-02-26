import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { pkSystemApi, usePkSystemHook } from '../../state/pk-system-hook';
import { IMessage } from '../../types/IMessage';
import { User } from '../../types/User';
import { Chat } from './Chat';


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
  },
] as IMessage[]

const ChatBox: React.FC<Props> = () => {
  const [state, action] = usePkSystemHook();
  return (
    <Chat
      messages={MockMessage}
      isLoading={false}
      user={MockUser1}
      onSubmit={
        (mes: string) => {
          var console = require("console-browserify")
          console.log("mes", mes)
        }} />
  )
};

export default ChatBox