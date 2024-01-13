/* global chrome */

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "scrape") {
    const mainContent = [];

    // Get all h1, h2, h3, h4, p, span, and li elements, excluding those within nav, sidebar, or footer
    const elements = document.querySelectorAll(
      "body > :not(nav):not(sidebar):not(footer) h1, body > :not(nav):not(sidebar):not(footer) h2, body > :not(nav):not(sidebar):not(footer) h3, body > :not(nav):not(sidebar):not(footer) h4, body > :not(nav):not(sidebar):not(footer) p, body > :not(nav):not(sidebar):not(footer) span, body > :not(nav):not(sidebar):not(footer) li"
    );

    // Iterate through the elements and merge h1/h2/h3 with the following p/span, excluding those with less than or equal to 4 words
    for (let i = 0; i < elements.length; i++) {
      const currentElement = elements[i];
      let mergedText = currentElement.innerText;

      if (mergedText.split(" ").length > 4) {
        // Check for more than 4 words
        if (
          (currentElement.tagName === "H1" ||
            currentElement.tagName === "H2" ||
            currentElement.tagName === "H3" ||
            currentElement.tagName === "H4") &&
          elements[i + 1] &&
          (elements[i + 1].tagName === "P" ||
            elements[i + 1].tagName === "SPAN" ||
            elements[i + 1].tagName === "LI")
        ) {
          mergedText += " -> " + elements[i + 1].innerText;
          i++; // Skip the next element since it's already merged
        }

        mainContent.push(mergedText);
      }
    }

    sendResponse({ data: mainContent });
  }
});
