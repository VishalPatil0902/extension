/* global chrome */

import React, { useState } from "react";

export default function Extraction() {
  const [code, setCode] = useState("");
  const handleGetHTML = async () => {
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });
    const [result] = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => document.documentElement.outerHTML,
    });
    console.log(result); // Do something with the HTML
    setCode(result);
  };
  // Example in your sidebar React component

  const handleScrape = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTabId = tabs[0].id;

      // Send a message to the content script to initiate scraping
      chrome.tabs.sendMessage(activeTabId, { action: "scrape" }, (response) => {
        console.log(response);
        setCode(JSON.stringify(response));
      });
    });
  };

  return (
    <>
      <button onClick={handleScrape}>Get Page HTML</button>
      <div style={{ color: "#fff" }}>{JSON.stringify(code)}</div>
    </>
  );
}
