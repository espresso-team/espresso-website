import { ThemeProvider } from "styled-components";
import Navbar from "./app/Navbar";
import GlobalStyles from "./app/styles/GlobalStyles";
import { light } from "./app/styles/Themes";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";

// This is the chainId will work on.
const activeChainId = ChainId.Goerli;

const App = () => {
  return (
    <ThirdwebProvider desiredChainId={activeChainId}>
      <GlobalStyles />
        <ThemeProvider theme={light}>
           <Navbar />
        </ThemeProvider>
    </ThirdwebProvider>
  )
}
export default App;
