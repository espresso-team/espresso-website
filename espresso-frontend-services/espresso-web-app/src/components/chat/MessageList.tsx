import React, { useEffect, useState } from 'react'
import MDSpinner from 'react-md-spinner';
import './style.css';
import emptyChatImage from '../../assets/empty-state.svg';
import { User } from '../../types/User';
import { RenderMessageFunction } from '../../types/RenderMessageFunction';
import { If } from '../../app/If';
import { IMessage } from '../../types/IMessage';
import { MessageListDetail } from './MessageListDetail';
import { usePkSystemHook } from '../../state/pk-system-hook';

interface Props {
    isLoading: boolean;
    messages: IMessage[];
    user: User;
    pageRef: React.Ref<HTMLDivElement>
    //renderMessage?: RenderMessageFunction;
}

export const MessageList = ({ isLoading, messages, user, pageRef }: Props) => {
    var console = require("console-browserify")
    console.log("MessageList - messages",messages)
    return (
        <>
            <If condition={!isLoading && !messages.length}>
                <div className='text-center img-fluid empty-chat'>
                    <div className='empty-chat-holder'>
                        <img src={emptyChatImage} className='img-res' alt='empty chat' />
                    </div>

                    <div>
                        <h2> 你好我是你的AI朋友 </h2>
                        <h6 className='empty-chat-sub-title'>
                            在下面输入你的第一条消息把~
                        </h6>
                    </div>
                </div>
            </If>
            <If condition={!isLoading && messages.length > 0}>
                <MessageListDetail user={user} messages={messages} pageRef={pageRef}/>
            </If>
            <If condition={isLoading}>
                <div className='loading-messages-container'>
                    <MDSpinner size={100} />
                    <span className='loading-text'>Loading Messages</span>
                </div>
            </If>
        </>
    )
};