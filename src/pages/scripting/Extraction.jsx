/* global chrome */

import React, { useState } from 'react';

export default function Extraction() {
    const [code, setCode] = useState("");
    const handleGetHTML = async () => {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        const [result] = await chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: () => document.documentElement.outerHTML
        });
        console.log(result); // Do something with the HTML
        setCode(result);
    };

    return (
        <>
        <button onClick={handleGetHTML}>Get Page HTML</button>
            <div style={{color: '#fff'}}>
                {JSON.stringify(code)}
            </div>
        </>

    );
}