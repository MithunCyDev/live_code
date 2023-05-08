import React, { useEffect, useState } from "react";
import { Dna } from "react-loader-spinner";
import App from "../App";
import logo from "../logo.png";

export const Spiner = () => {
  // Loader Animation
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <>
      {loading ? (
        <div className=" w-full h-screen bg-black flex flex-col justify-center items-center">
          <img className="lg:w-64 xs:w-48" src={logo} alt="logo" />
          <Dna width="80" color="#fa2a55" />
        </div>
      ) : (
        <App />
      )}
    </>
  );
};
