/* global chrome */
// import for vector tokenizer
// import { TogetherAI } from "@langchain/community/llms/togetherai";
// import { PromptTemplate } from "@langchain/core/prompts";
// import { FaissStore } from "@langchain/community/vectorstores/faiss";
// import { HuggingFaceInferenceEmbeddings } from "langchain/embeddings/hf";
// import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
// import { VectorDBQAChain } from "langchain/chains";

// other imports
import React, { useState } from "react";
import { Stack, Button, Icon } from "@chakra-ui/react";
import { SearchIcon, ChatIcon } from "@chakra-ui/icons";
import { CheerioWebBaseLoader } from "langchain/document_loaders/web/cheerio";

const Search = ({ onNewChat, Extracte }) => {
  // Example in your sidebar React component
  /* global chrome */

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
      const activeTabUrl = tabs[0].url; // Extract the URL of the active tab

      fetchData(activeTabUrl);
    });

    async function fetchData(url) {
      try {
        // Creating an instance of CheerioWebBaseLoader
        const loader = new CheerioWebBaseLoader(url, {
          selector:
            "[class^=content], [class*= content], [class$=content] div, [class^=content], [class*= content], [class$=content] article, [class^=content], [class*= content], [class$=content] p",
        });

        // Loading the document asynchronously
        const docs = await loader.load();

        // Replace multiple white spaces with a single space
        const cleanedContent = docs[0].pageContent.replace(/\s+/g, " ").trim();

        setCode(cleanedContent);
        console.log(cleanedContent);
        // vectorTokenize(cleanedContent);
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };
  // const vectorTokenize = async (textData) => {
  //   const textSplitter = new RecursiveCharacterTextSplitter({
  //     chunkSize: 1000,
  //     chunkOverlap: 100,
  //   });

  //   const docs = await textSplitter.createDocuments([textData]);
  //   const texts = await textSplitter.splitText(textData);

  //   const embeddings = new HuggingFaceInferenceEmbeddings({
  //     model: "sentence-transformers/all-MiniLM-L6-v2",
  //   });

  //   const ids = createArrayWithIds(texts.length);

  //   const vectorStore = await FaissStore.fromTexts(texts, ids, embeddings);

  //   await vectorStore.save("../Assets/vectorstore");
  // };

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
