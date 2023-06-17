import React, { useEffect, useState, useRef } from "react";
import InnerSpiner from "../../Spiner/InnerSpiner";
import logo from "../../logo.png";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { IoIosArrowBack } from "react-icons/io";
import { useStateValue } from "../../Context/StateProvider";
import Avatar from "react-avatar";
import EditorField from "./EditorField";
import io from "socket.io-client";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';

export const Editor = () => {
  const [menu, setMenu] = useState(true);
  const [{ user, roomId }] = useStateValue();
  const socketRef = useRef(null);
  const copyTextRef = useRef(null);
  const [userName, setUserName] = useState("");
  const [client, setClient] = useState([]);
  const navigate = useNavigate();

  // Loader Animation
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  useEffect(() => {
    socketRef.current = io(process.env.REACT_APP_BACKEND_URL);
    setUserName(user);
    // Join the room with the provided roomId
    socketRef.current.emit("joinRoom", roomId, user);

    //Listening for joined event
    socketRef.current.on("joined", ({ clients, user, socketId }) => {
      if (user !== userName) {
        toast.success(`${user} joined the room`);
        console.log(`${user} joined the room`);
      }

      setClient(clients);
    });

    socketRef.current.on("disconnected", ({ socketId, userName }) => {
      setClient((prev) => {
        return prev.filter((client) => client.socketId !== socketId);
      });
      toast.success(`${userName} left the room`);
    });

    //React Cleaning Function
    return () => {
      //Clear Memory after disconnect the user
      socketRef.current.off('joined')
      socketRef.current.off('disconnected')
      socketRef.current.disconnect();
    };

  }, [user, roomId]);

  //Leave Room Function, Navigate to the home Page
  const leaveRoom = ()=>{
    navigate('/') // useNavigate
  };

  //Copy Room Id
  const handleCopy = ()=>{
    navigator.clipboard.writeText(roomId)
  };

  return (
    <>
      {loading ? (
        <InnerSpiner />
      ) : (
        <section className="w-full h-full bg-black flex overflow-hidden">
          <div className="h-screen">
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
                name={user}
                size={30}
                color={"#618db8"}
                round="5px"
              />

              <div className="mt-20">
                {client.map((name) => (
                  <Avatar 
                    key={name.index}
                    className="mb-3"
                    name={name.userName}
                    size={30}
                    color={"#fa2a55"}
                    round="5px"
                  />
                ))}
              </div>
            </div>

            <div
              className={
                menu
                  ? "lg:w-[270px] xs:w-[220px] relative h-screen bg-deepBlue px-4 py-4 block"
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
                  {user}'S
                  <span className="text-white ml-2 font-medium">Room</span>
                </h1>
              </div>

              <div className="mt-10">
                <h3 className="text-white font-semibold text-sm">HOST</h3>
                {/* Host Avatar */}
                <div className="mt-4 flex flex-wrap gap-2">
                  <Avatar name={user} size={50} color={"#618db8"} round="7px" />
                </div>

                <h3 className="text-white font-semibold text-sm mt-10">USER</h3>
                {/* User Avatar */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {client.map((name) => (
                    <Avatar
                      key={name.index}
                      name={name.userName}
                      size={50}
                      color={"#fa2a55"}
                      round="7px"
                    />
                  ))}
                </div>
              </div>
                
                {/* Language JavaScript Section */}
              <div className="flex justify-center gap-2 fixed left-6 bottom-36">
                <h3 className="text-white">Language:</h3>
                <span className="text-liteBlue font-bold">Javascript</span>
              </div>
              
              {/* Copy Room ID */}
              <div className="flex justify-center">
                <motion.button
                  onClick={handleCopy}
                  whileTap={{ scale:0.9 }}
                  className=" text-white bg-black py-1 lg:px-12 xs:px-9 fixed bottom-24 rounded-md font-semibold 
                  text-lg cursor-pointer"
                >
                  Copy Room Id
                </motion.button>
              </div>

              {/* Leave Room Section */}
              <div className="flex justify-center">
                <motion.button
                  onClick={leaveRoom}
                  whileTap={{ scale: 0.9 }}
                  className=" text-white bg-themeColor py-1 lg:px-14 xs:px-11 fixed bottom-10 rounded-md font-semibold 
                  text-lg cursor-pointer"
                >
                  Leave Room
                </motion.button>
              </div>
            </div>
          </div>

          {/* Text Editor */}
          <EditorField className="lg:w-screen h-screen xs:w-screen" />
        </section>
      )}
    </>
  );
};
