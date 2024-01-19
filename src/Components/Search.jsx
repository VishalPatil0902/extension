/* global chrome */

import React, { useState } from "react";
import { Stack, Button, Icon } from "@chakra-ui/react";
import { SearchIcon, ChatIcon } from "@chakra-ui/icons";
import { CheerioWebBaseLoader } from "langchain/document_loaders/web/cheerio";
import { useNavigate } from "react-router-dom";


function createArrayWithIds(n) {
  const resultArray = [];

  for (let i = 1; i <= n; i++) {
    resultArray.push({ id: i });
  }

  return resultArray;
}

const Search = ({ onNewChat, Extracte }) => {

  const navigate = useNavigate();
  const [code, setCode] = useState("");


  const handleScrape = () => {
    navigate("/chat/website/conversation");
    // chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    //   const activeTabId = tabs[0].id;
    //   const activeTabUrl = tabs[0].url; // Extract the URL of the active tab

    //   fetchData(activeTabUrl);
    // });

    // async function fetchData(url) {
    //   try {
    //     // Creating an instance of CheerioWebBaseLoader
    //     const loader = new CheerioWebBaseLoader(url, {
    //       selector:
    //         "[class^=content], [class*= content], [class$=content] div, [class^=content], [class*= content], [class$=content] article, [class^=content], [class*= content], [class$=content] p",
    //     });

    //     // Loading the document asynchronously
    //     const docs = await loader.load();

    //     // Replace multiple white spaces with a single space
    //     const cleanedContent = docs[0].pageContent.replace(/\s+/g, " ").trim();

    //     setCode(cleanedContent);
    //     console.log(cleanedContent);
    //   } catch (error) {
    //     console.error("Error:", error);
    //   }
    // }
  };


  return (
    <Stack direction="row" spacing={3} width="100%" marginTop="0.5rem">
      <Button
        leftIcon={<ChatIcon />}
        bg={"#6fa6cb"}
        color={"#fff"}
        variant="solid"
        width="100%"
        onClick={onNewChat}
      >
        New Chat
      </Button>
      <Button
        rightIcon={<SearchIcon />}
        colorScheme="blue"
        variant="solid"
        width="100%"
        onClick={handleScrape}
      >
        Read Website
      </Button>
    </Stack>
  );
};

export default Search;
