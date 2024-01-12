/* global chrome */

import React, { useState, useEffect } from 'react';
import styles from './activetab.module.css'

export default function ActiveTabURL() {
  const [activeTabUrl, setActiveTabUrl] = useState('');

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      setActiveTabUrl(tabs[0]?.url ?? '');
    });

    chrome.tabs.onActivated.addListener((activeInfo) => {
      chrome.tabs.get(activeInfo.tabId, (tab) => {
        setActiveTabUrl(tab.url);
      });
    });

    return () => {
      chrome.tabs.onActivated.removeListener();
    };
    
  }, []);

  return (
    <div className={styles.activeTabContainer}>
      <p className={styles.activeTabContainerText}>{activeTabUrl}</p>
    </div>
  );
}
