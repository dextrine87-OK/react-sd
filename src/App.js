import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [textPrompt, setTextPrompt] = useState("");
  const [prompts, setPrompts] = useState([]);

  const generateImage = async () => {
    const apiKey = "APIKEY";
    const url = "https://stablediffusionapi.com/api/v3/text2img";
    const proxyUrl = "https://cors-anywhere.herokuapp.com/";

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key: apiKey, prompt: textPrompt }),
    };

    try {
      const response = await fetch(proxyUrl + url, requestOptions);
      const data = await response.json();

      const imageUrl = data.output[0];

      setPrompts([...prompts, { prompt: textPrompt, imageUrl }]);
    } catch (error) {
      console.error("Error generating image:", error);
    }
  };

  const handleClick = async () => {
    setPrompts([...prompts, { prompt: textPrompt, imageUrl: "" }]);
    setTextPrompt("");
    await generateImage();
  };

  return (
    <div className="container">
      <input
        className="input-container"
        type="text"
        placeholder="Enter a text prompt"
        value={textPrompt}
        onChange={(e) => setTextPrompt(e.target.value)}
      />
      <button onClick={handleClick}>Generate Image</button>
      <ul className="prompts-list">
        {prompts.map((item, index) => (
          <li key={index} className="prompt-item">
            <p className="prompt-text">{item.prompt}</p>
            {item.imageUrl && (
              <img
                onerror="removeImage($(this));"
                src={item.imageUrl}
                alt="Generated Image"
                className="generated-image"
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
