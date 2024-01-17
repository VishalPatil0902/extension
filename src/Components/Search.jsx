/* global chrome */

import React,{useState} from 'react'
import { Stack,Button,Icon } from '@chakra-ui/react'
import { SearchIcon,ChatIcon } from '@chakra-ui/icons'

const Search = ({onNewChat,Extracte}) => {
  
  const [code, setCode] = useState("");

  // Example in your sidebar React component
  const handleScrape = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTabId = tabs[0].id;
      console.log(activeTabId);

      // Send a message to the content script to initiate scraping
      chrome.tabs.sendMessage(activeTabId, { action: "scrape" }, (response) => {
        console.log(JSON.stringify(response));
        setCode(response);
      });
    });
  };

  
  
  return (
    <Stack direction='row' spacing={3} width='100%' marginTop='0.5rem'>
      <Button leftIcon={<ChatIcon />} bg={'#6fa6cb'} color={'#fff'} variant='solid' width='100%' onClick={onNewChat}>
        New Chat
      </Button>
      <Button rightIcon={<SearchIcon />} colorScheme='blue' variant='solid' width='100%' onClick={handleScrape}>
        Read Website
      </Button>
    </Stack>
  )
}

export default Search