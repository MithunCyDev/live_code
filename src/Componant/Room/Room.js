import React, { useEffect, useState } from "react";
import logo from "../../logo.png";
import { motion } from "framer-motion";
import InnerSpiner from "../../Spiner/InnerSpiner";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useStateValue } from "../../Context/StateProvider";
import { actionType } from "../../Context/Reducer";
import { toast } from "react-hot-toast";

export const Room = () => {
  const [userName, setUserName] = useState("");
  const [roomid, setRoomid] = useState("");
  const [password, setPassword] = useState("");
  const history = useNavigate();
  const [{ user }, dispatch] = useStateValue();

  // Loader Animation
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const HandleRoomId = () => {
    const id = uuidv4();
    setRoomid(id);
  };

  const CreateRoom = async (e) => {
    e.preventDefault();

    //Fetch Data
    const response = await fetch("http://localhost:4000/room", {
      method: "POST",
      body: JSON.stringify({ userName, roomid, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const user = await response.json();

    //Set User In The Local Storage
    localStorage.setItem("user", JSON.stringify(user));

    //Dispatch User in the Context
    dispatch({
      type: actionType.SET_USER,
      user: user,
    });

    //If there is no userName and RoomId Throw Error Msg
    if (!userName || !roomid || !password) {
      toast.error("Every field is required");
    }

    //If the userName is not Found
    else if (response.status === 400) {
      toast.error("Invalid credentials");
    }
    
    //If the Password is not Found
    else if (response.status === 404) {
      toast.error("Invalid Password");
    }

    //Success and go to the Editor Page
    else if (response.status === 200) {
      //If the user is valid then set room id in the localStorage
      localStorage.setItem("roomId", JSON.stringify(roomid));
      //Dispatch RoomId in the Context
      dispatch({
        type: actionType.SET_ROOM,
        roomId: roomid,
      });

      //Go to the Editor Page
      history(`/editor/${roomid}`);
    }
  };

  useEffect(() => {
    sessionStorage.removeItem('authenticated');
   // User Will be LogOut if User ComeBack to the Editor Page
    window.onpopstate = function(event) {
      const authenticated = sessionStorage.getItem('authenticated');
      if (!authenticated) {
        window.history.replaceState(null, null, window.location.href ='/room');
        event.preventDefault();
        localStorage.clear()
      }
    };
  }, []);

  return (
    <>
      {loading ? (
        <InnerSpiner />
      ) : (
        <section className="flex justify-center items-center h-screen w-full font-[roboto]">
          <div className="bg-navyBlue bg-opacity-20 min-w-[340px] h-auto py-8 lg:w-[400px] rounded-md ring-1 ring-liteBlue">
            <div className="flex justify-center items-center mb-8">
              <img className="w-72 h-auto" src={logo} alt="logo" />
            </div>

            <form
              onSubmit={CreateRoom}
              className="flex flex-col justify-center items-center gap-4 px-4"
            >
              <label
                className="flex flex-col text-white gap-2 text-xl "
                htmlFor="name"
              >
                User Name
                <input
                  className=" w-80 h-12 rounded-md focus:outline-none text-white placeholder:text-liteBlue placeholder:opacity-70 text-md px-4 py-2 bg-deepBlue"
                  onChange={(e) => setUserName(e.target.value)}
                  type="name"
                  placeholder="user name"
                  value={userName}
                />
              </label>
              <label
                className="flex flex-col text-white gap-2 text-xl "
                htmlFor="password"
              >
                Password
                <input
                  className=" w-80 h-12 rounded-md focus:outline-none text-white placeholder:text-liteBlue placeholder:opacity-70 text-md px-4 py-2 bg-deepBlue"
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder="Password"
                  value={password}
                />
              </label>

              <label className="flex flex-col text-white gap-2 text-xl ">
                Paste Invitation Room Id
                <input
                  onChange={(e) => setRoomid(e.target.value)}
                  className=" w-80 h-12 rounded-md focus:outline-none text-white placeholder:text-liteBlue placeholder:opacity-70 text-md px-4 py-2 bg-deepBlue"
                  type="text"
                  placeholder="room id"
                  value={roomid}
                />
              </label>

              <div className="flex gap-4">
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  type="submit"
                  className=" bg-themeColor py-2 px-4 w-52 mt-4 text-white font-semibold rounded-md"
                >
                  Create A Room
                </motion.button>

                <motion.button
                  whileTap={{ scale: 0.9 }}
                  className=" bg-themeColor py-2 px-4 w-24 mt-4 text-white font-semibold rounded-md"
                >
                  Join
                </motion.button>
              </div>
            </form>

            <h3 className="flex justify-center mt-4 text-white">
              Don't Have A Room Id?
              <span
                onClick={HandleRoomId}
                className="text-liteBlue ml-2 hover:text-themeColor font-medium cursor-pointer"
              >
                Create New Room
              </span>
            </h3>
          </div>
        </section>
      )}
    </>
  );
};
