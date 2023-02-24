import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { pkSystemApi, usePkSystemHook } from '../../state/pk-system-hook';
import { IMessage } from '../../types/IMessage';
import { User } from '../../types/User';
import { MessageList } from './MessageList';


interface Props {
  userId: string;
}

const MockUser =
  {
    name: "Jack",
    avatar: "https://s2.loli.net/2023/02/22/NA9cIs4veuBMPD8.png",
    uid: "01",
  } as User

const MockMessage = [{
    text: "this is Lucy",
    id: "123",
    sender: MockUser
  },
  {
    text: "hello",
    id: "124",
    sender: MockUser
  }
  ] as IMessage[]

const ChatBox: React.FC<Props> = () => {
  const [state, action] = usePkSystemHook();
  return (<MessageList isLoading={false} messages={MockMessage} user={MockUser} />)
};

export default ChatBox