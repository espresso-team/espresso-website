import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { ThemeProvider } from "styled-components";
import GlobalStyles from "./app/styles/GlobalStyles";
import { light } from "./app/styles/Themes";
import Home from "./components/home.component";
import Pk from "./components/pk.component";
import Chat from "./components/chat.component";
import Forum from "./components/forum.component";
import MyBot from "./components/myBot.component";
import { AuthProvider } from './app/AuthContext';
import NotFound from "./components/notFound";
import { logPageView, initialize } from "./app/GaEvent";

const App: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    initialize();
    logPageView(location.pathname);
  }, [location]);

  return (
    <AuthProvider>
      <div>
        <GlobalStyles />
        <ThemeProvider theme={light}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/index" element={<Home />} />
            <Route path="/pk" element={<Pk />} />
            <Route path="/chat/:modelIdLink?" element={<Chat />} />
            <Route path="/forum" element={<Forum />} />
            <Route path="/mybot" element={<MyBot />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ThemeProvider>
      </div>
    </AuthProvider>
  );
};

export default App;
