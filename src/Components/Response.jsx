import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
const Response = (props) => {
  const [generatedResponse, setGeneratedResponse] = useState("Loading...");
  const navigate = useNavigate();

  const generateResponse = () => {
    setGeneratedResponse(props.response);
  };

  // Call the generateResponse function when the component mounts
  useEffect(() => {
    generateResponse();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black relative">
      <h2 className=" absolute top-0 mt-8 md:text-6xl text-4xl font-extrabold  bg-gradient-to-r from-cyan-600 via-blue-800 to-purple-900 bg-clip-text text-transparent">
        Reponse
      </h2>
      <div className="container w-3/4 p-10 py-10 mx-auto bg-gray-600 rounded-lg shadow-lg ml-4 mr-4 text-white">
        <p className="md:text-2xl text-xl italic">{generatedResponse}</p>
      </div>
      <button
        className=" absolute bottom-0 mb-4 px-4 py-2 bg-blue-700 hover:bg-blue-900 text-white font-bold text-2xl rounded-lg shadow"
        onClick={() => navigate.push("/")}
      >
        Back
      </button>
    </div>
  );
};

export default Response;
