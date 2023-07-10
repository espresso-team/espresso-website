import { Component } from "react";
import Footer from "../app/Footer";
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
          <Footer />
        </PKPageWrapper>
      </>
    );
  }
}
