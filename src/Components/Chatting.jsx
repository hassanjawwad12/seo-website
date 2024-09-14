import React, { useState, useEffect, useRef } from "react";
import { FaLock } from "react-icons/fa";
import ReactMarkdown from "react-markdown";
import "./styles.css";
import axios from "axios";

const Chatting = ({ isStateTrue, output }) => {
  const [messages, setMessages] = useState([]);
  const messageInputRef = useRef(null);
  const chatBoxRef = useRef(null);

  useEffect(() => {
    if (output && messages.length === 0) {
      // Add agent's (AI's) response message with markdown enabled
      addMessage("agent", output);
    }
  }, [output]);

  useEffect(() => {
    chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
  }, [messages]);

  useEffect(() => {
    if (messages[messages.length - 1]?.role === "user") {
      getAgentResponse();
    }
  }, [messages]);

  const getAgentResponse = async () => {
    var o = await runPrompt(messages);
    addMessage("agent", o, true);
  };
  const addMessage = (role, content) => {
    const newMessage = {
      role,
      content,
    };

    // Check if the role is "system" and prepend system messages
    if (role === "system") {
      setMessages((prevMessages) => [newMessage, ...prevMessages]);
    } else {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    }
  };

  const runPrompt = async (m) => {
    var output = "";

    const url = `${import.meta.env.VITE_BACKEND_URL}/runPrompt`;
    try {
      const stream = await fetch(`${url}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          //Authorization: jwt,
        },
        body: JSON.stringify({ id: 1, data: 1, messages: m }),
      });

      const reader = stream.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let temp = ""; // we are getting data from gpt here
      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          break;
        }

        // console.log(decoder.decode(value))

        output += decoder.decode(value);
      }
    } catch (err) {
      console.log(err);
    }
    return output;
  };

  const handleMessageSubmit = async (text) => {
    if (text.trim() !== "") {
      // Add the user's message
      addMessage("user", text);
      // Simulate agent's (AI's) response after a delay
      // setTimeout(() => {
      //   const agentResponse = `Agent : ## Top 5 Keywords\n1. *mtl online* - Clicks: 104 - Impressions: 213 - CTR (Click-Through Rate): 48.83% - Position: 5.82\n2. *meilleur restaurant haitien montreal* - Clicks: 33 - Impressions: 377 - CTR: 8.75% - Position: 5.83\n3. *restaurant haitien montreal* - Clicks: 27 - Impressions: 3,744 - CTR: 0.72% - Position: 7.27\n4. *restaurant haitien* - Clicks: 22 - Impressions: 10,797 - CTR: 0.20% - Position: 8.01\n5. *meilleur griot montreal* - Clicks: 19 - Impressions: 356 - CTR: 5.34% - Position: 6.34\n\nPlease note that the CTR (Click-Through Rate) is calculated by dividing the number of clicks by the number of impressions and multiplying by 100. The position refers to the average position of the keyword in search results.`;

      //   // Add agent's (AI's) response message with markdown enabled
      //   addMessage("agent", agentResponse, true);
      // }, 1000);
    }
  };

  return (
    <div className="h-screen w-full flex flex-col justify-end bg-gradient-to-r from-gray-700 via-gray-900 to-black p-4 relative">
      <div
        className="flex-grow p-4 overflow-y-scroll sticky w-full"
        id="chatBox"
        ref={chatBoxRef}
      >
        <div className="flex flex-col h-full  relative gap-2">
        {messages.map((message, index) => (
            <div key={index} className="mb-4 w-full">
              <div
               className={`flex chat-message ${
                message.role === "user"
                  ? "user-message justify-end ml-auto my-1 lg:w-1/2 w-full  "
                  : "agent-message  my-1 lg:w-1/2 w-full  "
              }`}
               
              >
                


                
                {message.role === "agent" ? (
                  <div className="flex flex-col ">
                    <ReactMarkdown>{message.content}</ReactMarkdown>
                  </div>
                ) : (
                  <span className="text-md font-semibold">{`${message.role} :  ${message.content}`}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <form
        className="p-4 flex"
        onSubmit={(e) => {
          e.preventDefault();
          handleMessageSubmit(messageInputRef.current.value);
          messageInputRef.current.value = "";
        }}
      >
        <input
          type="text"
          className="message-input w-full rounded border border-gray-300 px-4 py-2 hover:border-[#7f18ef]/40 text-white bg-gray-500"
          placeholder="Type your message here..."
          ref={messageInputRef}
        />
        <button
          disabled={!isStateTrue}
          className="send-button bg-gray-500 hover:bg-gray-800 text-white rounded px-4 py-2 ml-2"
        >
          {isStateTrue ? (
            <>Send</>
          ) : (
            <>
              <FaLock />
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default Chatting;

/*{message.role === "user" ? (
        <div className="flex w-full justify-end">
          <div className="user-message my-1">
            
            {message.content}
          </div>
        </div>
      ) : (
        <div className="flex w-full justify-start">
          <div className="agent-message my-1">
            
            {message.content}
          </div>
        </div>
      )}
      
      
      
      
      */
