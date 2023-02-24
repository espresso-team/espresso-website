import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
// import MessageList from '../MessageList/MessageList';
// import SendMessageForm from '../SendMessageForm/SendMessageForm';
import './style.css';

interface Props {
  messages: { message: string; author: string }[];
  onSendMessage: (message: string) => void;
}

const Chat: React.FC<Props> = ({ messages, onSendMessage }) => {
  const [messageList, setMessageList] = useState(messages);
  const messageListRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messageList]);

  const addMessage = (message: { message: string; author: string }) => {
    setMessageList([...messageList, message]);
  };

  const sendMessage = (message: string) => {
    onSendMessage(message);
  };

  const scrollToBottom = () => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  };

  return (
    <div className="chat-container">
      {/* <MessageList messages={messageList} messageListRef={messageListRef} />
      <SendMessageForm onSendMessage={sendMessage} onAddMessage={addMessage} /> */}
    </div>
  );
};

// Chat.propTypes = {
//   messages: PropTypes.arrayOf(
//     PropTypes.shape({
//       message: PropTypes.string.isRequired,
//       author: PropTypes.string.isRequired,
//     }),
//   ).isRequired,
//   onSendMessage: PropTypes.func.isRequired,
// };

export default Chat;
