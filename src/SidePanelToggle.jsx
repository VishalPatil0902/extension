import React, { useState } from 'react';

const SidePanelToggle = () => {
  // const [isPanelOpen, setIsPanelOpen] = useState(false);

  // const togglePanel = async () => {
  //   try {
  //     if (isPanelOpen) {
  //       await window.chrome.sidePanel.hide();
  //     } else {
  //       await window.chrome.sidePanel.show({ activate: true, pinned: true }); // Customize options as needed
  //     }
  //     setIsPanelOpen(!isPanelOpen);
  //   } catch (error) {
  //     console.error('Error toggling side panel:', error);
  //   }
  // };
  chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
    let url = tabs[0].url;
    });

  return (
    <button style={{background:'black'}} >
      {/* {isPanelOpen ? 'Hide Side Panel' : 'Show Side Panel'} */}
      
     </button>
  );
};

export default SidePanelToggle;