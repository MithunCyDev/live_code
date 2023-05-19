import React, { useEffect, useState } from "react";
import InnerSpiner from "../../Spiner/InnerSpiner";
import logo from "../../logo.png";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { IoIosArrowBack } from "react-icons/io";
import { useStateValue } from "../../Context/StateProvider";
import Avatar from "react-avatar";

export const Editor = () => {
  const [menu, setMenu] = useState(true);
  const [{ user }] = useStateValue();

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
        <InnerSpiner />
      ) : (
        <section className="w-full h-full bg-black flex">
          <div className="h-full">
            <div
              className={
                menu ? "hidden" : "w-16 bg-blue h-full py-6 px-4 block"
              }
            >
              <HiOutlineMenuAlt2
                onClick={() => setMenu(!menu)}
                className="text-liteBlue w-7 h-7  cursor-pointer hover:text-white"
              />
              <Avatar
                className="mt-6"
                name={user.name}
                size={30}
                color={"#618db8"}
                round="3px"
              />
              <div className="mt-20">
                <Avatar
                  name="sdf sdf"
                  size={30}
                  color={"#fa2a55"}
                  round="3px"
                />
                <Avatar
                  className="mt-2"
                  name="sdf sdf"
                  size={30}
                  color={"#fa2a55"}
                  round="3px"
                />
              </div>
            </div>

            <div
              className={
                menu
                  ? "lg:w-[270px] xs:w-[220px] relative h-full bg-deepBlue px-4 py-4 block"
                  : "hidden"
              }
            >
              <IoIosArrowBack
                onClick={() => setMenu(!menu)}
                className="text-liteBlue w-6 h-6 absolute right-[2px] lg:top-[500px] xs:top-[350px] md:top-[400px] cursor-pointer hover:text-themeColor"
              />
              {/* Logo Here */}
              <div className="flex py-4">
                <img className="lg:w-52 h-auto xs:w-40" src={logo} alt="" />
              </div>
              {/* Room User Name */}
              <div className="bg-navyBlue py-2 px-2 mt-10 rounded-md flex justify-center">
                <h1 className="text-themeColor font-semibold uppercase lg:text-xl xs:text-md">
                  {user.name}'S
                  <span className="text-white ml-2 font-medium">Room</span>
                </h1>
              </div>

              <div className="mt-10">
                <h3 className="text-white font-semibold text-sm">HOST</h3>
                {/* Host Avatar */}
                <div className="mt-4 flex flex-wrap gap-2">
                  <Avatar
                    name={user.name}
                    size={50}
                    color={"#618db8"}
                    round="5px"
                  />
                </div>

                <h3 className="text-white font-semibold text-sm mt-10">
                  USER
                </h3>
                {/* User Avatar */}
                <div className="mt-4 flex flex-wrap gap-2">
                  <Avatar
                    name="Nusrin Sultana"
                    size={50}
                    color={"#fa2a55"}
                    round="5px"
                  />
                  <Avatar
                    name="Nusrin Sultana"
                    size={50}
                    color={"#fa2a55"}
                    round="5px"
                  />
                  <Avatar
                    name="Nusrin Sultana"
                    size={50}
                    color={"#fa2a55"}
                    round="5px"
                  />
                </div>
              </div>

              <div className="flex gap-2 items-center absolute bottom-24">
                <h3 className="text-white">Language:</h3>
                <span className="text-liteBlue font-bold">Javascript</span>
              </div>
              <div className="flex justify-center">
                <button
                  className="text-white bg-black py-1 lg:px-14 xs:px-11 absolute bottom-8 rounded-md font-semibold 
                  text-lg cursor-pointer hover:bg-themeColor"
                >
                  Leave Room
                </button>
              </div>
            </div>
          </div>

          
            <textarea className=" w-full h-screen"></textarea>
          
        </section>
      )}
    </>
  );
};
