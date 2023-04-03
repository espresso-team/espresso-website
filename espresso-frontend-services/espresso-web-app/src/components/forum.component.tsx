import { Component } from "react";
import Footer from "../app/Footer";
import MyForum from "./forum/MyForum";

type Props = {};

type State = {
  content: string;
}

export default class Forum extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      content: "chat page"
    };
  }

  render() {
    return (
      <>
        <MyForum />
        <Footer />
      </>
    );
  }
}