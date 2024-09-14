import React from "react";
import supabase from "../Supabase";
import axios from "axios";
import { useState, useEffect } from "react";
import { getCountry, getQueries, getDevices, getSearch } from "../gapi";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { AiOutlineMenu } from "react-icons/ai";
import Chatting from "./Chatting";
import { AiOutlineClose } from "react-icons/ai";
import { BiMessageAltDetail } from "react-icons/bi";

const Selection = () => {
  const [buttons, setButtons] = useState([]);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isStateTrue, setIsStateTrue] = useState(false);
  const [output, setOutput] = useState(null);
  const [tooltipVisible, setTooltipVisible] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const [loading, setLoading] = useState(false);
  const [modelState, setModelState] = useState(false);
  const [modelContent, setModelContent] = useState(
    "Please wait while we generate the response"
  );

  const content = [
    "Click this button to learn more about our services.",
    "Explore our pricing plans by clicking here.",
    "Contact us for any inquiries or support.",
    "Discover our latest promotions and offers.",
    "Join our newsletter for updates and news.",
    "Click this button to learn more about our services.",
    "Explore our pricing plans by clicking here.",
    "Contact us for any inquiries or support.",
    "Discover our latest promotions and offers.",
    "Join our newsletter for updates and news.",
    "Click this button to learn more about our services.",
    "Explore our pricing plans by clicking here.",
    "Contact us for any inquiries or support.",
    "Discover our latest promotions and offers.",
    "Join our newsletter for updates and news.",
  ];

  useEffect(() => {
    getButtons().then((res) => {
      setButtons(res.dat);
    });
  }, []);

  const getButtons = async () => {
    var res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/getButtons`);

    return res.data;
  };

  const runPrompt = async (id, data) => {
    // res = await axios.post(
    //   `${import.meta.env.VITE_BACKEND_URL}/runPrompt`,
    //   {
    //     id: id,
    //     data: data,
    //   },
    //   {
    //     headers: {
    //       // Authorization: `Bearer ${access_token}`,
    //     },
    //   }
    // );

    var output = "";

    const url = `${import.meta.env.VITE_BACKEND_URL}/runPrompt`;
    try {
      const stream = await fetch(`${url}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          //Authorization: jwt,
        },
        body: JSON.stringify({ id: id, data: data }),
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

  const handleButton = async (q) => {
    setIsStateTrue(!isStateTrue);
    setSidebarOpen(!isSidebarOpen);
    setLoading(true);

    // console.log(`Data is ${q.data}`);
    // console.log(q.prompt);
    switch (q.data) {
      case "keywords":
        console.log("Getting keywords");
        const keywords = await getQueries(50);
        console.log(keywords);
        console.log(`Getting Output for ${q.prompt}`);
        const output = await runPrompt(q.id, keywords);
        console.log(output);
        setOutput(output);

        break;

      case "country":
        console.log("Getting country");
        const country = await getCountry(50);
        console.log(country);
        console.log(`Getting Output for ${q.prompt}`);
        const output1 = await runPrompt(q.id, country);
        console.log(output1);
        setOutput(output);

        break;

      case "devices":
        console.log("Getting devices");
        const devices = await getDevices(50);
        console.log(devices);
        console.log(`Getting Output for ${q.prompt}`);
        const output2 = await runPrompt(q.id, devices);
        console.log(output2);
        setOutput(output);

        break;
      case "search":
        console.log("Getting search");
        const search = await getSearch(50);
        console.log(search);
        console.log(`Getting Output for ${q.prompt}`);
        const output3 = await runPrompt(q.id, search);
        console.log(output3);
        setOutput(output);

        break;
      case "custom":
        console.log("Getting custom");
        const custom = await getQueries(50);
        console.log(custom);
        console.log(`Getting Output for ${q.prompt}`);
        const output4 = await runPrompt(q.id, custom);
        console.log(output4);
        setOutput(output);

        break;
      default:
        console.log("No data");
        break;
    }

    setLoading(false);
  };

  return (
    <>
      <div
        className={`min-h-screen w-full lg:flex lg:flex-row  justify-center items-center ${
          loading ? "bg-gray-600" : ""
        }`}
      >
        <>
          <div className=" h-full bg-gray-800">
            <button
              type="button"
              className=" z-10 top-0  w-[25%] h-[5%] left-0 items-center p-2 ml-3 py-4 text-sm text-white rounded-lg lg:hidden block"
              onClick={toggleSidebar}
            >
              <AiOutlineMenu size={30} />
            </button>
          </div>

         

          <div className="lg:w-[22%] md:block w-0">
            
            <aside
              id="default-sidebar"
              className={`fixed top-0 left-0 z-40 md:w-80 w-60 h-screen transition-transform ' ${
                isSidebarOpen ? "translate-x-0 " : "-translate-x-full"
              } md:translate-x-0`}
              aria-label="Sidebar"
            >
              <div className="h-full flex flex-col items-center overflow-y-scroll bg-[#28282B]">

              {isSidebarOpen && (
              <button
                type="button"
                className=" lg:hidden block mt-3  p-2 rounded-full bg-white/30 text-white/70 hover:bg-white/50 focus:outline-none"
                onClick={toggleSidebar}
              >
                <AiOutlineClose size={30} />
              </button>
            )}

                <p className="text-xl mb-4 mt-8 font-bold text-white">
                  Options
                </p>
                {buttons.map((button) => (
                  <button
                    key={button.id}
                    data-tooltip-target="tooltip-right"
                    data-tooltip-placement="right"
                    onClick={() => {
                      handleButton(button);
                    }}
                    className=" transparent-button mt-4 text-md shadow mb-2 px-1 py-2 w-[70%] rounded-xl text-white font-semibold hover:bg-gray-800 transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500"
                  >
                    <div className="flex">
                      <BiMessageAltDetail className="text-white text-xl mr-2 " />
                      {button.label}
                    </div>
                  </button>
                ))}
                <button
                  title="help me AR "
                  className=" transparent-button mt-4 text-lg shadow mb-2 py-3 px-2 w-[80%] rounded-xl text-white font-semibold hover:bg-gray-800 transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  {" "}
                  Test{" "}
                </button>
              </div>
            </aside>
          </div>
          <div className="w-full ">
            {!loading ? (
              <div className=" bg-gray-600 animate-spin rounded-full border-t-4 border-b-4 border-gray-900 h-20 w-20 mx-auto" />
              
            ) : (
              <Chatting isStateTrue={isStateTrue} output={output} />
            )}
          </div>
        </>
      </div>
    </>
  );
};

export default Selection;

/*
   

  {isSidebarOpen && (
              <button
                type="button"
                className="z-20 lg:hidden block fixed mt-3 top-4 right-7 transform -translate-y-1/2 p-2 rounded-full bg-white/30 text-white/70 hover:bg-white/50 focus:outline-none"
                onClick={toggleSidebar}
              >
                <AiOutlineClose size={30} />
              </button>
            )}



*/
