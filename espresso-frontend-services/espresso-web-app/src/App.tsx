import { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { ThemeProvider } from "styled-components";
import Navbar from "./app/Navbar";
import GlobalStyles from "./app/styles/GlobalStyles";
import { light } from "./app/styles/Themes";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";

import IUser from './types/user.type';

import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import { ConnectButton } from "@web3uikit/web3";

// This is the chainId will work on.
const activeChainId = ChainId.Goerli;

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
        <ThirdwebProvider desiredChainId={activeChainId}>
          <GlobalStyles />
          <ThemeProvider theme={light}>
            <Navbar />
          </ThemeProvider>
        </ThirdwebProvider>

        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>

      </div>
    );
  }
}

export default App;
