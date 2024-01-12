/* global chrome */

import React, { useState, useEffect } from "react";
import styles from "./activetab.module.css";

export default function ActiveTabURL({ getURL }) {
  const [activeTabUrl, setActiveTabUrl] = useState("");

  useEffect(() => {
    // Function to fetch and set the active tab URL
    const fetchActiveTabUrl = () => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        setActiveTabUrl(tabs[0]?.url ?? "");
      });
    };

    // Initial fetch
    fetchActiveTabUrl();

    // Set interval to fetch the active tab URL every 3 seconds
    const intervalId = setInterval(fetchActiveTabUrl, 1000);

    // Event listener for tab activation changes
    const handleTabActivated = (activeInfo) => {
      chrome.tabs.get(activeInfo.tabId, (tab) => {
        setActiveTabUrl(tab.url);
      });
    };

    // Add the event listener
    chrome.tabs.onActivated.addListener(handleTabActivated);

    // Clean up: remove the event listener and clear the interval
    return () => {
      chrome.tabs.onActivated.removeListener(handleTabActivated);
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className={styles.activeTabContainer}>
      <p className={styles.activeTabContainerText}>{activeTabUrl}</p>
    </div>
  );
}
