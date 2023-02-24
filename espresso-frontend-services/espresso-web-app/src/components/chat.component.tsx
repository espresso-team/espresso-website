import { Component } from "react";
import Footer from "../app/Footer";
import ChatBox from "./chat/ChatBox";

type Props = {};

type State = {
  content: string;
}

export default class Chat extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      content: "chat page"
    };
  }

  render() {
    return (
      <>
        <ChatBox userId={"test1"}/>
        <Footer />
      </>
    );
  }
}