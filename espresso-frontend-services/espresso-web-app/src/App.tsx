import { Component } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { ThemeProvider } from "styled-components";
import Navbar from "./app/Navbar";
import GlobalStyles from "./app/styles/GlobalStyles";
import { light } from "./app/styles/Themes";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Pk from "./components/pk.component";
import Chat from "./components/chat.component";

type Props = {};

type State = {}

class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div>
          <GlobalStyles />
          <ThemeProvider theme={light}>
            <Navbar/>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/pk" element={<Pk />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/chat" element={<Chat />}/>
            </Routes>
          </ThemeProvider>
      </div>
    );
  }
}

export default App;
