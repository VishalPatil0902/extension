import "./App.css";
import SidePanelToggle from "./SidePanelToggle";
import ActiveTabURL from "./pages/ActiveTab/ActiveURL";
import { useState } from "react";
import Extraction from "./pages/scripting/Extraction";
import { ChakraProvider } from '@chakra-ui/react'
import Home from "./pages/Home/Home";
import Search from "./Components/Search";


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
            {/* <ActiveTabURL getURL={getURL} />
            <SidePanelToggle getURL={getURL} setURL={setURL} />
            <Extraction/> */}
            <Search onNewChat={handleNewChat} />
            <Home messages={messages} setMessages={setMessages} />
        </div>
    </ChakraProvider>
  );    
}

export default App;
