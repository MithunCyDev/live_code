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
            <HiOutlineMenuAlt2 className="text-white w-6 h-6 lg:hidden xs:hidden"/>
          <div className="lg:w-[270px] xs:w-[220px] relative h-full bg-deepBlue px-4 py-4 xs-block lg:block">
            <IoIosArrowBack className="text-liteBlue w-6 h-6 absolute right-[2px] top-80 cursor-pointer hover:text-themeColor"/>
            {/* Logo Here */}
            <div className="flex py-4">
              <img className="lg:w-52 h-auto xs:w-40" src={logo} alt=""/>
            </div>
            {/* Room User Name */}
            <div className="border-liteBlue border-b">
              <h1 className="text-themeColor font-semibold capitalize mt-6 text-lg">{user.name}
                <span className="text-white ml-2 font-medium">Room</span>
              </h1>
            </div>
            <div className="mt-8 flex flex-wrap gap-2">
              <Avatar name={user.name} size={60} round="5px"/>
              <Avatar name={user.name} size={60} color={'#fa2a55'} round="5px"/>
              <Avatar name={user.name} size={60} color={'#618db8'} round="5px"/>
            </div>

            <div className="flex gap-2 items-center absolute bottom-24">
              <h3 className="text-white">Language</h3>
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
