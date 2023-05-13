import React, { useEffect, useState } from "react";
import InnerSpiner from "../../Spiner/InnerSpiner";
import logo from '../../logo.png';
import { HiOutlineMenuAlt2 } from 'react-icons/hi'
import { IoIosArrowBack } from 'react-icons/io'
import { useStateValue } from "../../Context/StateProvider";
import Avatar from "react-avatar";

export const Editor = () => {

  const [menu, setMenu] = useState(false)
  const [{user}] = useStateValue();

  // Loader Animation
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  console.log(user)

  return (
    <>
      {/* {loading ? (
        <InnerSpiner />
      ) : ( */}
        <section className="w-full h-full bg-black ">
            
            <div className="w-16 bg-liteBlue h-full py-4 px-4 hidden">
              <HiOutlineMenuAlt2 className="text-deepBlue w-7 h-7  cursor-pointer hover:text-white"/>
            </div>

          <div className="lg:w-[270px] xs:w-[220px] relative h-full bg-deepBlue px-4 py-4 block">
            <IoIosArrowBack className="text-liteBlue w-6 h-6 absolute right-[2px] lg:top-[500px] xs:top-[350px] md:top-[400px] cursor-pointer hover:text-themeColor"/>
            {/* Logo Here */}
            <div className="flex py-4">
              <img className="lg:w-52 h-auto xs:w-40" src={logo} alt=""/>
            </div>
            {/* Room User Name */}
            <div className="bg-navyBlue py-2 px-2 mt-10 rounded-md flex justify-center">
              <h1 className="text-themeColor font-semibold uppercase lg:text-2xl xs:text-lg">{user.name}
                <span className="text-white ml-2 font-medium">Room</span>
              </h1>
            </div>

            <div className="mt-10">
              <h3 className="text-white font-semibold text-lg">Connected User:</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                <Avatar name={user.name} size={60} round="5px"/>
                <Avatar name='dfsd sd' size={60} color={'#fa2a55'} round="5px"/>
                <Avatar name='sdfdsf sdf' size={60} color={'#618db8'} round="5px"/>
              </div>
            </div>

            <div className="flex gap-2 items-center absolute bottom-24">
              <h3 className="text-white">Language:</h3>
              <span className="text-liteBlue font-bold">Javascript</span>
            </div>

            <button className="text-white bg-black py-1 px-10 absolute bottom-8 rounded-md font-semibold 
              text-lg cursor-pointer hover:bg-themeColor">
                Leave Room
            </button>

          </div>

        </section>
      {/* )} */}
    </>
  );
};
