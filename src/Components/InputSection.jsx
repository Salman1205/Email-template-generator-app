import React from 'react'

const InputSection = ({ setUrlFromShop, urlForShop, setResultToDefault, handleSendPrompt, prompt }) => {
  return (
    <div className="inputContainer">
          <p>Describe the email you'd like to create</p>
          <textarea 
              name="prompt" 
              id="prompt"
              ref={prompt}
              // style={{width: "391px", height: "154px"}}
              placeholder="Enter your text here..."
              className="promptTextArea">
          </textarea>
          <label htmlFor="urlinput">Enter the url:</label>
          <input name = "urlinput"type="text" value={urlForShop} onChange={(event) => {
            setUrlFromShop(event.target.value);
          }}/>
          <button onClick={() => {setResultToDefault(); handleSendPrompt();}} >Send to Server</button>
        </div>
  )
}

export default InputSection
