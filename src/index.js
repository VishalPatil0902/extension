import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';  // Your main React component

// Access chrome.sidePanel API
// const sidePanel = window.chrome.sidePanel;

// Show the sidebar with activation and pinning
// sidePanel.show({ activate: true, pinned: true });

ReactDOM.render(<App />, document.getElementById('root'));