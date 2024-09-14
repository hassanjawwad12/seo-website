import { Fragment, useState, useEffect } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import supabase from "../Supabase";
import axios from "axios";

export default function Options() {

const [loading, setLoading] = useState(false);

  useEffect(() => {
    getWebsites();
  }, []);

  const getWebsites = async () => {
    console.log(`${import.meta.env.VITE_BACKEND_URL}/gapi/searchConsole`);
    const access_token = (await supabase.auth.getSession()).data.session
      .access_token;

    const allData = await supabase.auth.getSession();

     setLoading(true);
    var res = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/gapi/searchConsole`,
      {
        method: "get",
        param: null,
        path: "/sites",
        p_token: allData.data.session.provider_token,
      },
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    setLoading(false);
    console.log(res);

    const tempList = [];
    console.log(res.data.siteEntry);
    for (let i = 0; i < res.data.siteEntry.length; i++) {
      let siteURL = res.data.siteEntry[i].siteUrl; //split("sc-domain:")[1];
      console.log(siteURL);
      tempList.push({ id: i, name: siteURL });
    }
    console.log(res.data.siteEntry);
    setPeople(tempList);
    setSelected(tempList[0]);
  };

  const handleNext = async () => {
    let encoded_uri = encodeURIComponent(selected.name);
    localStorage.setItem("website", encoded_uri);
    window.location.replace("/selection");
  };

  const [people, setPeople] = useState([""]);

  const [selected, setSelected] = useState(people[0]);
  const [query, setQuery] = useState("");

  const filteredPeople =
    query === ""
      ? people
      : people.filter((person) =>
          person.name
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  return (
    <>
      <div className="bg-gray-800 min-h-screen flex flex-col items-center justify-center relative">
        <h1 className="md:text-5xl text-3xl text-white mb-20 font-extrabold italic absolute top-0 mt-4">
          Choose a website
        </h1>

        {loading ? (
       <>
       <div className=" animate-spin rounded-full border-t-4 border-b-4 border-green-700 h-16 w-16 mx-auto" />
       </>
      ) : (
        <>
         <div className="flex items-center justify-center ml-2 mr-2">
          <Combobox value={selected} onChange={setSelected}>
            <div className="relative mt-1">
              <div className=" cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                <Combobox.Input
                  className="w-full border-none py-2 pl-20 pr-20 text-2xl leading-5 text-gray-900 focus:ring-0"
                  displayValue={(person) => person.name}
                  onChange={(event) => setQuery(event.target.value)}
                />
                <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronUpDownIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </Combobox.Button>
              </div>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                afterLeave={() => setQuery("")}
              >
                <Combobox.Options className=" md:text-2xl text-xl absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-gray-400 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ">
                  {filteredPeople.length === 0 && query !== "" ? (
                    <div className="relative cursor-default select-none py-2 px-4 text-gray-700 md:text-2xl text-xl">
                      Nothing found.
                    </div>
                  ) : (
                    filteredPeople.map((person) => (
                      <Combobox.Option
                        key={person.id}
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 pl-10 pr-4 ${
                            active
                              ? "bg-teal-600 bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 via-blue-800 to-purple-900 font-extrabold md:text-2xl text-xl"
                              : "text-gray-900"
                          }`
                        }
                        value={person}
                      >
                        {({ selected, active }) => (
                          <>
                            <span
                              className={`block truncate ${
                                selected ? "font-medium" : "font-normal"
                              }`}
                            >
                              {person.name}
                            </span>
                            {selected ? (
                              <span
                                className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                  active
                                    ? "text-white text-2xl"
                                    : "text-teal-600"
                                }`}
                              >
                                <CheckIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Combobox.Option>
                    ))
                  )}
                </Combobox.Options>
              </Transition>
            </div>
          </Combobox>

        </div>

        </>
      )}


       

        <button
          onClick={handleNext}
          className="mb-4 absolute bottom-0 w-1/4 text-3xl shadow bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-2 rounded hover:scale-105 ease-in duration-500 "
        >
          Next
        </button>
      </div>
    </>
  );
}
