import { Component } from "react";
import Footer from "../app/Footer";
import Game from "./pk/Game"
import styled from "styled-components"
import Navbar from "../app/Navbar";

const PKPageWrapper = styled.div`
  padding-top: 30px;
`

export default class Pk extends Component {
  render() {
    return (
      <>
        <Navbar />
        <PKPageWrapper>
          <Game userId={"test1"}/>
          <Footer />
        </PKPageWrapper>
      </>
    );
  }
}
