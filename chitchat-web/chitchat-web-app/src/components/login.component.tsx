import { Component } from "react";
import Footer from "../app/Footer";
import styled from "styled-components";
import Navbar from "../app/Navbar";
import LoginPage from "./register/LoginPage";
import backgroundJPG from '../assets/BGIWithoutCharacter.png';

const Section = styled.section`
min-height: ${props => `calc(110vh - ${props.theme.navHeight})`};
width: 100vw;
position: relative;
background: url(${backgroundJPG}) no-repeat center center;
background-size: cover;
`

export default class Login extends Component {
  render() {
    return (
      <Section id="login">
        <Navbar />
        <LoginPage />
        <Footer />
      </Section>
    );
  }
}
