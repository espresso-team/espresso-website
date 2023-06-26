import { Component } from "react";
import Footer from "../app/Footer";
import CreateNewBot from "./mybot/createNewBot";
import styled from "styled-components";
import Navbar from "../app/Navbar";
import { createRandomUserId } from "../util/createRandomUserId";

const MyBotPageWrapper = styled.div`
  padding-top: 10px;
`
export default class MyBot extends Component {
  render() {
    const modelId = createRandomUserId(); 
    return (
      <>
      <Navbar />
      <MyBotPageWrapper>
        <CreateNewBot modelId={modelId}/>
        <Footer />
      </MyBotPageWrapper>
      </>
    );
  }
}
