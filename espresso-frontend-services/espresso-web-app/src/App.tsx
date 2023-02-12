import { Component } from "react";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { ThemeProvider } from "styled-components";
import Navbar from "./app/Navbar";
import GlobalStyles from "./app/styles/GlobalStyles";
import { light } from "./app/styles/Themes";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Pk from "./components/pk.component";

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
            <Navbar/>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/pk" element={<Pk />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </ThemeProvider>
        </ThirdwebProvider>
      </div>
    );
  }
}

export default App;
