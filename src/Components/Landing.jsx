import React from "react";
import supabase from "../Supabase";
import { useEffect, useState } from "react";

const Landing = () => {
  // useEffect(() => {
  //   saveSession();
  // }, []);

  // const saveSession = async () => {};

  const oAuth = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
       // redirectTo: "https://peelush.pages.dev/options",
        redirectTo: "http://localhost:5173/options",
        skipBrowserRedirect: false,
        scopes:
          "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/webmasters",
        queryParams: {
          access_type: "offline",
          prompt: "consent",
        },
      },
    });
  };

  return (
    <>
      <div className="relative flex items-center justify-center h-screen">
        <div className="absolute inset-0 z-0">
          <img
            src="gray.jpg"
            alt="Background"
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>
        <div className="z-10 text-white text-center">
          <div className="flex items-center justify-center">
            <img src="latest.png" alt="Logo" className=" w-1/3" />
          </div>
          <h1 className="md:text-7xl text-3xl font-bold mt-4">PREDIICT</h1>
          <p className="md:text-2xl font-bold text-lg mt-6 ml-1 mr-1">
            Let us handle your SEO using the power of AI. So dont wait to get
            your websites optimized.
          </p>
          <button
            onClick={oAuth}
            className="mt-8 bg-white text-black font-bold py-4 px-4 rounded"
          >
            Sign in with Google
            <img
              src="google-logo.svg"
              alt="Google Logo"
              className="w-6 h-6 mr-2 inline-block ml-2"
            />
          </button>
        </div>
      </div>
    </>
  );
};

export default Landing;
