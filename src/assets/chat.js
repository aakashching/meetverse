export default (() => {
  // ---------------------------------------
  //  1. CONFIGURATION (EDIT THESE VALUES)
  // ---------------------------------------
	const url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyD5I5bck9bbUHUJK1mTwK-A4efMd6PDXik"
  // ---------------------------------------
  //  2. CREATE BASIC CHAT WIDGET IN DOM
  // ---------------------------------------
  const container = document.createElement("div");
  container.style.position = "fixed";
  container.style.bottom = "20px";
  container.style.right = "20px";
  container.style.width = "320px";
  container.style.height = "400px";
  container.style.display = "flex";
  container.style.flexDirection = "column";
  container.style.border = "1px solid #ccc";
  container.style.borderRadius = "5px";
  container.style.fontFamily = "sans-serif";
  container.style.backgroundColor = "#fff";
  container.style.zIndex = "999999"; // try to stay on top
 
  const messagesDiv = document.createElement("div");
  messagesDiv.style.flex = "1";
  messagesDiv.style.overflowY = "auto";
  messagesDiv.style.padding = "8px";
  messagesDiv.style.borderBottom = "1px solid #ddd";
  container.appendChild(messagesDiv);
 
  const inputContainer = document.createElement("div");
  inputContainer.style.display = "flex";
  inputContainer.style.padding = "8px";
  container.appendChild(inputContainer);
 
  const inputField = document.createElement("input");
  inputField.type = "text";
  inputField.placeholder = "Type here...";
  inputField.style.flex = "1";
  inputField.style.border = "1px solid #ccc";
  inputField.style.borderRadius = "3px";
  inputField.style.padding = "4px";
  inputContainer.appendChild(inputField);
 
  const sendBtn = document.createElement("button");
  sendBtn.textContent = "Send";
  sendBtn.style.marginLeft = "4px";
  inputContainer.appendChild(sendBtn);
 
  document.body.appendChild(container);
 
  function addMessage(text, role = "assistant") {
    const msg = document.createElement("div");
    msg.style.marginBottom = "8px";
    msg.style.whiteSpace = "pre-wrap";
 
    if (role === "user") {
      msg.style.textAlign = "right";
      msg.style.color = "blue";
      msg.textContent = "You: " + text;
    } else {
      msg.style.textAlign = "left";
      msg.style.color = "green";
      msg.textContent = "AI: " + text;
    }
    messagesDiv.appendChild(msg);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  }
 
  // ---------------------------------------
  //  3. SETUP EVENT HANDLER TO CALL GEMINI/PaLM
  // ---------------------------------------
  sendBtn.addEventListener("click", async () => {
    const userText = inputField.value.trim();
    if (!userText) return;
    inputField.value = "";
    addMessage(userText, "user");
 
    try {
      // Build request body in the format you specified:
      const requestBody = {
        contents: [
          {
            parts: [
              {
                text: userText
              }
            ]
          }
        ]
      };
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });
 
      if (!response.ok) {
        const err = await response.text();
        throw new Error(`Gemini/PaLM API error: ${err}`);
      }
 
      // Adjust parsing based on how your endpoint returns its response
      const data = await response.json();
 
      // Example: data might contain a 'contents' array with an 'output' text
      // This depends entirely on the actual API contract for your endpoint
      const reply = data?.candidates[0].content?.parts?.[0]?.text || "(No response)";
      addMessage(reply, "assistant");
    } catch (error) {
      console.error(error);
      addMessage("Error: " + (error.message || error.toString()));
    }
  });
 
  // Optional: Press Enter to send
  inputField.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      sendBtn.click();
    }
  });
});
