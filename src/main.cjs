const { JSDOM } = require("jsdom");

// Create a new JSDOM instance with your HTML content
const dom = new JSDOM(`<!DOCTYPE html>
id="app">Hello, World!</div>
</body>
</html>`);

// Set the global document object to the JSDOM document
global.document = dom.window.document;

// Now you can use document to manipulate the DOM
document.addEventListener("DOMContentLoaded", () => {
  // Your code that manipulates the DOM
  const appDiv = document.getElementById("app");
  appDiv.textContent = "DOM is fully loaded and ready to be manipulated!";

  // Add more DOM manipulation code here
  console.log(appDiv.textContent); // Logs the updated content
});
