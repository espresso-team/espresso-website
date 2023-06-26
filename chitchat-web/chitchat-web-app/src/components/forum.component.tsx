import { Component } from "react";
import Footer from "../app/Footer";
import MyForum from "./forum/MyForum";
import styled from "styled-components";
import Navbar from "../app/Navbar";

const ForumPageWrapper = styled.div`
  padding-top: 20px;
`
export default class Forum extends Component {
  render() {
    return (
      <>
      <Navbar />
      <ForumPageWrapper>
        <MyForum />
        <Footer />
      </ForumPageWrapper>
      </>
    );
  }
}
