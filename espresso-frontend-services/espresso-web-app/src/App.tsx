import { Component } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { ThemeProvider } from "styled-components";
import styled from 'styled-components'
import Navbar from "./app/Navbar";
import GlobalStyles from "./app/styles/GlobalStyles";
import { light, dark } from "./app/styles/Themes";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Pk from "./components/pk.component";
import Chat from "./components/chat.component";
import Forum from "./components/forum.component";
import MyBot from "./components/myBot.component";
import backgroundImage from './assets/backgroundImage.jpeg';
import { AuthProvider } from './app/AuthContext';
import NotFound from "./components/notFound";


type Props = {};

type State = {}

class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <AuthProvider>
        <div>
          <GlobalStyles />
          <ThemeProvider theme={light}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/index" element={<Home />} />
              <Route path="/pk" element={<Pk />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/forum" element={<Forum />} />
              <Route path="/mybot" element={<MyBot />} />
              <Route path="*" element={<NotFound />} /> 
            </Routes>
          </ThemeProvider>
        </div>
      </AuthProvider>
    );
  }
}

export default App;
