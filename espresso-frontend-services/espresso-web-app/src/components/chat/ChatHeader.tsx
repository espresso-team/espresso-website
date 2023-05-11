import { message } from 'antd';
import axios from 'axios';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { usePkSystemHook } from '../../state/pk-system-hook';
import { ENDPOINT } from '../../types/Env';
import { HttpStatus } from '../../types/HttpStatus';
import { Model } from '../../types/Model';
import { User } from '../../types/User';

const ChatHeaderWrapper = styled.section`
  margin: 0rem 3rem 1rem 5rem;
  background-color: #e9d6d6;
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  border-radius: 15px;
  overflow-x: auto;

  @media (max-width: 60em) {
    margin: 0rem 1rem 1rem 1rem;
  }
`;

const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 1rem;
  cursor: pointer;
  border: 2px solid #ffffff;
`;

interface Props {
    users: User[];
    onAvatarClick: (userId: string) => void;
}

const ChatHeader: React.FC<Props> = ({ users, onAvatarClick }) => {
    const [state, action] = usePkSystemHook();
    useEffect(() => {
        const fetchChatHeaderData = async () => {
            // By default, we fetch all the public models.
            console.log("ChatHeader - user name", state.curUserName);
            state.userId = "xxx"
            console.log("ChatHeader - user id", state.userId);
            await axios
              .get(`${ENDPOINT}/model-profile`,
                {
                  params: {
                    user_id: state.userId,
                    is_selected: false,
                  }
                })
              .then((response) => {
                console.log("ChatHeader - fetchModelProfile", response)
                if (response.status === HttpStatus.OK) {
                  const curModelArray = response.data.data as Model[];
                  console.log("ChatHeader -  curModelArray", curModelArray);
                }
                else {
                  message.error("页面错误，请刷新重试")
                  console.log("fetchModelProfile response failed", response)
                }
              })
              .catch((err) => {
                message.error("页面错误，请刷新重试");
                console.log(err)
              });
      
          };
          fetchChatHeaderData();
    }, []);
    return (
        <ChatHeaderWrapper>
            {users.map((user) => (
                <Avatar
                    key={user.uid}
                    src={user.avatar}
                    onClick={() => onAvatarClick(user.uid)}
                    alt={`${user.name}'s avatar`}
                />
            ))}
        </ChatHeaderWrapper>
    );
};

export default ChatHeader;
