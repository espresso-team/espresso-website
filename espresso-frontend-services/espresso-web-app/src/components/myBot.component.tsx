import { Component } from "react";
import Footer from "../app/Footer";
import CreateNewBot from "./mybot/createNewBot";
import styled from "styled-components";
import Navbar from "../app/Navbar";
type Props = {};

type State = {
  content: string;
}

const MyBotPageWrapper = styled.div`
  padding-top: 10px;
`
export default class MyBot extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      content: "chat page"
    };
  }

  render() {
    return (
      <>
      <Navbar />
      <MyBotPageWrapper>
        <CreateNewBot />
        <Footer />
      </MyBotPageWrapper>
      </>
    );
  }
}