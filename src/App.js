import "./App.css";
import SidePanelToggle from "./SidePanelToggle";
import ActiveTabURL from "./pages/ActiveTab/ActiveURL";
import { useState } from "react";
import Extraction from "./pages/scripting/Extraction";

function App() {
  let [getURL, setURL] = useState(0);
  
  return (
    <div className="App">
      <ActiveTabURL getURL={getURL} />
      <SidePanelToggle getURL={getURL} setURL={setURL} />
      <Extraction/>
    </div>
  );
}

export default App;
