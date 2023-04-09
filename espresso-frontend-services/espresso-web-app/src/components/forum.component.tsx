import { Component } from "react";
import Footer from "../app/Footer";
import MyForum from "./forum/MyForum";
import styled from "styled-components";
type Props = {};

type State = {
  content: string;
}

const ForumPageWrapper = styled.div`
  padding-top: 60px;
`
export default class Forum extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      content: "chat page"
    };
  }

  render() {
    return (
      <ForumPageWrapper>
        <MyForum />
        <Footer />
      </ForumPageWrapper>
    );
  }
}