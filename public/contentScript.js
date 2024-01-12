// contentScript.js

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "scrape") {
    // Your scraping logic here

    // Example: Scrape all divs, h tags, and p tags
    const divs = Array.from(document.querySelectorAll("div")).map(
      (div) => div.outerHTML
    );
    const headings = Array.from(
      document.querySelectorAll("h1, h2, h3, h4, h5, h6")
    ).map((heading) => heading.outerHTML);
    const paragraphs = Array.from(document.querySelectorAll("p")).map(
      (paragraph) => paragraph.outerHTML
    );

    // Combine the scraped data
    const scrapedData = {
      divs: divs,
      headings: headings,
      paragraphs: paragraphs,
    };

    // Send the scraped data back to the sidebar
    sendResponse({ data: scrapedData });
  }
});
