import React, { useEffect, useState, useRef } from "react";
import InnerSpiner from "../../Spiner/InnerSpiner";
import logo from "../../logo.png";
import {
  HiOutlineMenuAlt2,
  HiOutlineVideoCamera,
  HiOutlinePhone,
} from "react-icons/hi";
import { TbMicrophoneOff } from "react-icons/tb";
import { IoIosArrowBack } from "react-icons/io";
import { useStateValue } from "../../Context/StateProvider";
import Avatar from "react-avatar";
import EditorField from "./EditorField";
import io from "socket.io-client";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { actionType } from "../../Context/Reducer";

export const Editor = () => {
  const [menu, setMenu] = useState(true);
  const [alert, setAlert] = useState(false);
  const [{ user, roomId }, dispatch] = useStateValue();
  const socketRef = useRef(null);
  const [client, setClient] = useState([]);
  const [host, setHost] = useState();
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
    // Join the room with the provided roomId
    socketRef.current.emit("joinRoom", roomId, user);

    // setCode(newCode);

    //Listening for joined event
    socketRef.current.on("joined", ({ clients, user, socketId }) => {
      if (!sessionStorage.getItem("alertShown")) {
        toast.success(`${user} joined the room`);

        sessionStorage.setItem("alertShown", true);
      }
      setClient(clients);
      sessionStorage.setItem("authenticated", true);
      //Select host from all user
      setHost(clients[0].userName);
    });

    //Disconnected user from a room
    socketRef.current.on("disconnected", ({ socketId, userName }) => {
      setClient((prev) => {
        return prev.filter((client) => client.socketId !== socketId);
      });
      toast.success(`${userName} left the room`);
    });

    //React Cleaning Function
    return () => {
      //Clear Memory after disconnect the user
      socketRef.current.disconnect();
      socketRef.current.off("joined");
      socketRef.current.off("disconnected");
    };
  }, [socketRef, user, roomId]);

  //Leave Room Function, Navigate to the Home Page or Room Page
  const leaveRoom = () => {
    if (user) {
      navigate("/");
      localStorage.clear(); //Clear LocalStorage

      dispatch({
        type: actionType.SET_USER,
        user: "",
      });
      dispatch({
        type: actionType.SET_ROOM,
        roomId: "",
      });
    }
  };

  const leaveAlert = () => {
    if (user) {
      setAlert(true);
    }
  };

  //Copy Room Id
  const handleCopy = () => {
    navigator.clipboard
      .writeText(roomId)
      .then(() => toast.success("Room Id Copied"))
      .catch((error) => {
        console.log(error);
        toast.error("Room Id Not Copied");
      });
  };

  return (
    <>
      {loading ? (
        <InnerSpiner />
      ) : (
        <section className="w-screen h-full bg-black flex overflow-hidden">
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
                name={host}
                size={30}
                color={"#618db8"}
                round="5px"
              />

              <div className="mt-20">
                {client.map((name, index) => (
                  <Avatar
                    key={index}
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
                className="z-[999] text-liteBlue w-6 h-6 absolute right-[2px] lg:top-[500px] xs:top-[350px] md:top-[400px] cursor-pointer hover:text-themeColor"
              />
              {/* Logo Here */}
              <div className="flex py-4">
                <img className="lg:w-52 h-auto xs:w-40" src={logo} alt="" />
              </div>
              {/* Room User Name */}
              <div className="bg-black py-2 px-2 mt-10 rounded-md flex justify-center">
                <h1 className="text-themeColor font-semibold uppercase lg:text-xl xs:text-md">
                  {host}'S
                  <span className="text-white ml-2 font-medium">Room</span>
                </h1>
              </div>

              <div className="mt-10">
                <h3 className="text-white font-semibold text-sm mt-10">
                  Connected User
                </h3>
                {/* User Avatar */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {client.map((name, index) => (
                    <Avatar
                      key={index}
                      name={name.userName}
                      size={50}
                      color={"#fa2a55"}
                      round="7px"
                    />
                  ))}
                </div>
              </div>

              {/* Call Section */}
              <div className="flex justify-center gap-2 fixed lg:left-8 xs:left-5 bottom-52">
                <motion.div
                  whileTap={{ scale: 0.9 }}
                  className="border border-navyBlue py-2 px-4 rounded-md cursor-pointer"
                >
                  <HiOutlineVideoCamera className="text-themeColor w-6 h-6 " />
                </motion.div>
                <motion.div
                  whileTap={{ scale: 0.9 }}
                  className="border border-navyBlue py-2 px-4 rounded-md cursor-pointer"
                >
                  <HiOutlinePhone className="text-themeColor w-6 h-6 " />
                </motion.div>
                <motion.div
                  whileTap={{ scale: 0.9 }}
                  className="border border-navyBlue py-2 px-4 rounded-md cursor-pointer"
                >
                  <TbMicrophoneOff className="text-gray w-6 h-6" />
                </motion.div>
              </div>

              {/* Language JavaScript Section */}
              <div className="flex justify-center gap-2 fixed lg:left-8 xs:left-5 bottom-36">
                <h3 className="text-white">Language:</h3>
                <span className="text-liteBlue font-bold">Javascript</span>
              </div>

              {/* Copy Room ID */}
              <div className="flex justify-center">
                <motion.button
                  onClick={handleCopy}
                  whileTap={{ scale: 0.9 }}
                  className=" text-white bg-black py-1 lg:px-12 xs:px-9 fixed bottom-24 rounded-md font-semibold 
                  text-lg cursor-pointer"
                >
                  Copy Room Id
                </motion.button>
              </div>

              {/* Leave Room Section */}
              <div className="flex justify-center">
                <motion.button
                  onClick={leaveAlert}
                  whileTap={{ scale: 0.9 }}
                  className=" text-white bg-themeColor py-1 lg:px-14 xs:px-11 fixed bottom-10 rounded-md font-semibold 
                  text-lg cursor-pointer"
                >
                  Leave Room
                </motion.button>
              </div>
            </div>
          </div>

          {/* Alert box section */}
          <div
            className={
              alert
                ? "w-screen h-screen fixed z-[9999] flex justify-center items-center backdrop-blur-sm"
                : " hidden"
            }
          >
            <motion.div
              className="lg:w-[400px] lg:h-[170px] xs:w-[200px] xs:h-[100px] backdrop-blur-lg rounded-md 
            transition-all duration-300 flex flex-col justify-center items-center lg:gap-6 xs:gap-3 shadow-sm shadow-liteBlue border-t-liteBlue border"
            >
              <h1 className="text-white font-semibold lg:text-lg xs:text-sm">
                Are you want to leave?
              </h1>
              <div className="">
                <motion.button
                  onClick={leaveRoom}
                  whileHover={{ scale: 1.1 }}
                  className="mr-4 text-white bg-themeColor lg:py-2 xs:py-1 lg:px-6 xs:px-4 cursor-pointer font-medium rounded-md"
                >
                  Yes
                </motion.button>
                <motion.button
                  onClick={() => setAlert(false)}
                  whileHover={{ scale: 1.1 }}
                  className="text-white bg-liteBlue lg:py-2 xs:py-1 lg:px-6 xs:px-4 cursor-pointer font-medium rounded-md"
                >
                  No
                </motion.button>
              </div>
            </motion.div>
          </div>

          {/* Text Editor */}
          <EditorField
            socketRef={socketRef}
            className="lg:w-screen h-screen xs:w-screen fixed left-0 right-0"
          />
        </section>
      )}
    </>
  );
};
