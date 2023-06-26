import { Component } from "react";
import Footer from "../app/Footer";
import styled from "styled-components";
import Navbar from "../app/Navbar";
import RegisterWizard from "./register/RegisterWizard";

const RegisterPageWrapper = styled.div`
  padding-top: 20px;
`

export default class Register extends Component {
  render() {
    return (
      <>
      <Navbar />
      <RegisterPageWrapper>
        <RegisterWizard />
        <Footer />
      </RegisterPageWrapper>
      </>
    );
  }
}
