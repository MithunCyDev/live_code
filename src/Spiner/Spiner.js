import React, { useEffect, useState } from "react";
import { Dna } from "react-loader-spinner";
import logo from "../logo.png";

export const Spiner = () => {
  
  return (
    <div className=" w-full h-screen bg-black flex flex-col justify-center items-center">
      <img className="lg:w-64 xs:w-48" src={logo} alt="logo" />
      <Dna width="80" color="#fa2a55" />
    </div>
  );
};
