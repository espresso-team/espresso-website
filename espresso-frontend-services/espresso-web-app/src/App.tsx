import { ThemeProvider } from "styled-components";
import Navbar from "./app/Navbar";
import GlobalStyles from "./app/styles/GlobalStyles";
import { light } from "./app/styles/Themes";

const App = () => {
  return (
    <>
      <GlobalStyles />
        <ThemeProvider theme={light}>
           <Navbar />
        </ThemeProvider>
    </>
  )
}
export default App;
