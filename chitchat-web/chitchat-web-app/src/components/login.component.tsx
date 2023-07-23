import React, { lazy, Suspense } from 'react';
import Footer from "../app/Footer";
import styled from 'styled-components';
import Navbar from "../app/Navbar";
import LoginPage from "./register/LoginPage";
import Loading from '../app/Loading';

const BackgroundImage = lazy(() => import('../app/BackgroundImage'));

const Section = styled.section`
  min-height: ${props => `calc(110vh - ${props.theme.navHeight})`};
  width: 100vw;
  position: relative;
`

export default class Login extends React.Component {
  render() {
    return (
      <Section id="login">
        <Navbar />
        <Suspense fallback={<Loading />}> 
          <BackgroundImage />
        </Suspense>
        <LoginPage />
        <Footer />
      </Section>
    );
  }
}