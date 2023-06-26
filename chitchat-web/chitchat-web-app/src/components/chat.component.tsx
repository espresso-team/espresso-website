import { Component } from "react";
import Footer from "../app/Footer";
import ChatBox from "./chat/ChatBox";
import styled from "styled-components";
import Navbar from "../app/Navbar";

const ChatPageWrapper = styled.div`
  padding-top: 20px;
`

export default class Chat extends Component {
  render() {
    return (
      <>
      <Navbar />
        <ChatPageWrapper>
          <ChatBox userId={"test1"}/>
          <Footer />
        </ChatPageWrapper>
      </>
    );
  }
}
