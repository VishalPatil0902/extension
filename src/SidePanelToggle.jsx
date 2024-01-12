import React, { useState } from "react";

const SidePanelToggle = ({ getURL, setURL }) => {
  return (
    <button className="neonButton" onClick={() => setURL(!getURL)}>
      Get Started
    </button>
  );
};

export default SidePanelToggle;
