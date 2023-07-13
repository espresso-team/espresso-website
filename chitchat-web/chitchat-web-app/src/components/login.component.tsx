import { Component } from "react";
import Footer from "../app/Footer";
import styled from "styled-components";
import Navbar from "../app/Navbar";
import LoginPage from "./register/LoginPage";

const RegisterPageWrapper = styled.div`
  padding-top: 20px;
`

export default class Login extends Component {
  render() {
    return (
      <>
      <Navbar />
      <RegisterPageWrapper>
        <LoginPage />
        <Footer />
      </RegisterPageWrapper>
      </>
    );
  }
}
