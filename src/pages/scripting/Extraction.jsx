/* global chrome */

import React, { useState } from "react";
import { TogetherAI } from "@langchain/community/llms/togetherai";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { HuggingFaceInferenceEmbeddings } from "langchain/embeddings/hf";
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import {ConversationalRetrievalQAChain} from 'langchain/chains';

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

  const handleScrape = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTabId = tabs[0].id;

      // Send a message to the content script to initiate scraping
      chrome.tabs.sendMessage(activeTabId, { action: "scrape" }, (response) => {
        console.log(response);
        setCode(response);
      });
    });
  };

  return (
    <>
      <button className="neonButton" style={{marginTop: '10px'}} onClick={handleScrape}>Get HTML</button>
      {/* <div style={{ color: "#fff" }}>{JSON.stringify(code)}</div> */}
      {
        code && code.data.map((text)=>(
          <p style={{color: '#fff'}}>{text}</p>
        ))
      }
    </>
  );
}
