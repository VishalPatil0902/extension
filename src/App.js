/* global chrome */
import "./App.css";
import { MemoryRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SidePanelToggle from "./SidePanelToggle";
import ActiveTabURL from "./pages/ActiveTab/ActiveURL";
import { useState } from "react";
import Extraction from "./pages/scripting/Extraction";
import { ChakraProvider } from '@chakra-ui/react'
import Home from "./pages/Home/Home";
import Search from "./Components/Search";
import Bottom from "./Components/Bottom";
import WebChat from "./pages/Chat-Website/WebChat";
import ErrorComponent from "./Components/ErrorComponent";

function App() {
  let [getURL, setURL] = useState(0);

  const [messages, setMessages] = useState([
    {
      text: 'Hi ask me anything related to the website',
      isBot: true,
    },
  ]);

  const handleNewChat = () => {
    setMessages([
      {
        text: 'Hi, ask me anything related to the website',
        isBot: true,
      },
    ]);
  };



  return (
    <ChakraProvider>
      <div className="App">
        <Router>
          <Search onNewChat={handleNewChat} />
          <Routes>
            <Route exact path="/" element={<Home messages={messages} setMessages={setMessages} />} />
            <Route exact path="/chat-website-conversation" element={<WebChat messages={messages} setMessages={setMessages} />} />
            <Route path="/error/try-again/:url" element={<ErrorComponent/>} />

          </Routes>
          <Bottom />
        </Router>
      </div>
    </ChakraProvider>
  );
}

export default App;
