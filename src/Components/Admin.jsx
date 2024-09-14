import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

const Admin = () => {
  const [buttons, setButtons] = useState([]);
  const [newEntry, setNewEntry] = useState({});
  const [loading, setLoading] = useState(false);

  const updateDom = async () => {
    getButtons().then((res) => {
      setButtons(res.dat);
    });
  };

  const refresh = async () => {
    window.location.reload();
  };

  const addNewEntry = async (b) => {
    setLoading(true);
    const res = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/changePrompt/add`,
      { label: newEntry.label, prompt: newEntry.prompt, data: newEntry.data },
      {
        headers: {
          //Authorization: `Bearer ${access_token}`,
        },
      }
    );

    updateDom();
    setLoading(false);

    return res.data;
  };
  const delPrompt = async (b) => {
    setLoading(true);

    const res = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/changePrompt/delete`,
      { id: b.id },
      {
        headers: {
          //Authorization: `Bearer ${access_token}`,
        },
      }
    );

    updateDom();
    setLoading(false);
    return res.data;
  };
  const updatePrompt = async (b) => {
    setLoading(true);

    console.log(b);
    const res = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/changePrompt/`,
      {
        label: b.label,
        prompt: b.prompt,
        data: b.data,
        id: b.id,
      },
      {
        headers: {
          //Authorization: `Bearer ${access_token}`,
        },
      }
    );
    updateDom();
    setLoading(false);
    return res.data;
  };

  useEffect(() => {
    updateDom();
  }, []);

  const getButtons = async () => {
    setLoading(true);

    var res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/getButtons`);
    setLoading(false);

    return res.data;
  };

  return (
    <div
      className={` min-h-screen flex items-center justify-center bg-gray-800 ${
        loading ? "animate-pulse" : ""
      }`}
    >
      <div className="bg-gray-800 p-8 rounded-md shadow-lg">
        <h1 className="md:text-7xl text-3xl text-white mb-10 text-center italic">
          Welcome ADMIN 🖐!
        </h1>
        <p className="r-0"></p>
        {buttons.map((button) => (
          <div className="flex flex-col mt-5" key={button.id}>
            <h1 className="md:text-5xl text-2xl font-bold mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-600 via-green-800 to-green-900">
                {/* Button Label */}
                {button.label}
              </span>
            </h1>
            <div className="flex flex-row">
              {/* Prompt */}

              <input
                type="text"
                className="bg-black text-white border-2 border-gray-600 rounded-md p-2 mb-4 w-full"
                placeholder="Prompt"
                value={button.prompt}
                onChange={(e) => {
                  var newB = [...buttons];
                  newB[button.id - 1].prompt = e.target.value;
                  console.log(newB[button.id - 1].prompt);
                  setButtons(newB);

                  button.prompt = e.target.value;
                }}
              />

              {/* Data */}

              <input
                type="text"
                className="bg-black text-white border-2 border-gray-600 rounded-md p-2 mb-4 w-full"
                placeholder="Data"
                value={button.data}
                onChange={(e) => {
                  var newB = [...buttons];
                  newB[button.id - 1].data = e.target.value;
                  console.log(newB[button.id - 1].data);
                  setButtons(newB);

                  button.data = e.target.value;
                }}
              />
            </div>
            <input
              type="text"
              className="bg-black text-white border-2 border-gray-600 rounded-md p-2 mb-4 w-full"
              placeholder="Label"
              value={button.label}
              onChange={(e) => {
                var newB = [...buttons];
                newB[button.id - 1].label = e.target.value;
                console.log(newB[button.id - 1].label);
                setButtons(newB);

                button.label = e.target.value;
              }}
            />
            <div className="flex justify-center space-x-5">
              <button
                onClick={() => {
                  updatePrompt(button);
                }}
                q
                className=" text-2xl shadow bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-3 rounded hover:scale-105 ease-in duration-500 "
              >
                Save
              </button>
              <button
                onClick={() => {
                  delPrompt(button);
                }}
                className=" text-2xl shadow bg-red-400 hover:bg-red-500 text-white font-bold py-2 px-3 rounded hover:scale-105 ease-in duration-500 "
              >
                Delete
              </button>
            </div>
          </div>
        ))}
        <div className="flex flex-col mt-5">
          <h1 className="md:text-5xl text-2xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-600 via-green-800 to-green-900">
              {/* Button Label */}
              Add a new entry
            </span>
          </h1>
          <div className="flex flex-row">
            {/* Prompt */}

            <input
              type="text"
              className="bg-black text-white border-2 border-gray-600 rounded-md p-2 mb-4 w-full"
              placeholder="Prompt"
              onChange={(e) => {
                setNewEntry({ ...newEntry, prompt: e.target.value });
              }}
            />

            {/* Data */}

            <input
              type="text"
              className="bg-black text-white border-2 border-gray-600 rounded-md p-2 mb-4 w-full"
              placeholder="Data"
              onChange={(e) => {
                setNewEntry({ ...newEntry, data: e.target.value });
              }}
            />
          </div>
          <input
            type="text"
            className="bg-black text-white border-2 border-gray-600 rounded-md p-2 mb-4 w-full"
            placeholder="Label"
            onChange={(e) => {
              setNewEntry({ ...newEntry, label: e.target.value });
            }}
          />
          <div className="flex justify-center">
            <button
              onClick={addNewEntry}
              className=" text-2xl shadow bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-3 rounded hover:scale-105 ease-in duration-500 "
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
