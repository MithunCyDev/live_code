import React, { useEffect, useState } from "react";
import logo from "../../logo.png";
import bg from "../../bg2.jpg";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { toast } from "react-hot-toast";

export const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alertMessage, setAlertMessage] = useState(false);
  const [submit, setSubmit] = useState(true);
  const history = useNavigate();

  // const clientid = 747315352467-3c1bahbmlbos8tv3tgdebe33v7218b9h.apps.googleusercontent.com
  // const clientScrect = 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

  // //Google Signin
  // const responseMessage = (response) => {
  //   console.log(response);
  // };
  // const errorMessage = (error) => {
  //   console.log(error);
  // };


  const HandleSubmit = async (e) => {
    e.preventDefault();
    setSubmit(email, name, password);
    
    
    //Check User Name with Regular Expression
    const regex = /^[a-zA-Z0-9]+$/;
    const userName = regex.test(name);

    if (!name || !email || !password) {
      toast.error("Every Field Required");
    } else if (!userName) {
      toast.error("User Name Incorrect Way");
    } else {
      //Fetch Data
      const response = await fetch("http://localhost:4000/signup", {
        method: "POST",
        body: JSON.stringify({ name, email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      // const backendMessage = await response.json();
      // setAlertMessage(backendMessage);

      if(response.status === 400){
        toast.error("Invalid email address")
      }
      else if(response.status === 302){
        toast.error("User Already Exit")
      }
      else if(response.status === 208){
        toast.error("User Name Already Taken")
      }
      else if(response.status === 201){
        toast.success("User Created Successfully")
        setEmail("");
        setName("");
        setPassword("");
      }
      else if(response.status === 500){
        toast.error("Internal server error")
      }
      // display response from backend
      // redirect to next page after 3sec. if SignUp is successful
      setTimeout(() => {
        if (response.status === 201) {
          history("/room");
        }
      }, 3000);
    }
  };

  // Alert PopUp Message Timeout
  const message = useEffect(() => {
    setTimeout(() => {
      setAlertMessage(false);
    }, 4000);
  }, [alertMessage]);

  return (
    <section className="flex h-screen w-full font-[roboto]">
      <div className="h-full w-full grid lg:grid-cols-2 xs:grid-cols-1  gap-10 content-start">
        <div className="lg:block xs:hidden">
          <img
            className="lg-block xs-hidden object-cover w-full h-screen"
            src={bg}
            alt=""
          />
        </div>

        <div className="flex flex-col  lg:mx-auto lg:my-auto xs:w-full h-screen xs:flex xs:justify-center xs:items-center">
          <div className="bg-navyBlue bg-opacity-20 min-w-[330px] h-[580px] lg:w-[400px] rounded-md ring-1 ring-liteBlue">
            <div className="flex justify-center items-center py-10">
              <img className="w-[274px] h-auto" src={logo} alt="logo" />
            </div>

            {/* Alert PopUp Message
            <div className="flex justify-center">
              <div
                className={
                  alertMessage
                    ? "bg-themeColor px-4 py-2 fixed top-10 rounded-md min-w-[150px] text-center transition-all duration-150"
                    : "hidden"
                }
              >
                <h1 className="text-white font-medium">{alertMessage}</h1>
              </div>
            </div> */}

            <form
              method="POST"
              onSubmit={HandleSubmit}
              className="flex flex-col justify-center items-center gap-4 "
            >
              <label
                className="flex flex-col text-white gap-2 text-xl "
                htmlFor="text"
              >
                User Name
                <input
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  className={
                    submit
                      ? "rounded-md focus:outline-blue text-white placeholder:text-liteBlue placeholder:opacity-70 placeholder:text-[15] text-md px-6 py-2 bg-deepBlue"
                      : "rounded-md focus:outline-none border border-themeColor text-white placeholder:text-liteBlue placeholder:opacity-70 placeholder:text-[15] text-md px-6 py-2 bg-deepBlue"
                  }
                  type="name"
                  placeholder="user name"
                />
              </label>

              <label className="flex flex-col text-white gap-2 text-xl ">
                Email
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  className={
                    submit
                      ? "rounded-md focus:outline-blue text-white placeholder:text-liteBlue placeholder:opacity-70 placeholder:text-[15] text-md px-6 py-2 bg-deepBlue"
                      : "rounded-md focus:outline-none border border-themeColor text-white placeholder:text-liteBlue placeholder:opacity-70 placeholder:text-[15] text-md px-6 py-2 bg-deepBlue"
                  }
                  type="email"
                  placeholder="type your email"
                />
              </label>

              <label className="flex flex-col text-white gap-2 text-xl ">
                Password
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  className={
                    submit
                      ? "rounded-md focus:outline-blue text-white placeholder:text-liteBlue placeholder:opacity-70 placeholder:text-[15] text-md px-6 py-2 bg-deepBlue"
                      : "rounded-md focus:outline-none border border-themeColor text-white placeholder:text-liteBlue placeholder:opacity-70 placeholder:text-[15] text-md px-6 py-2 bg-deepBlue"
                  }
                  type="password"
                  placeholder="type your password"
                />
              </label>
              {/* Submit Button */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={message}
                className=" bg-themeColor py-2 px-4 w-[277px] mt-4 text-white font-semibold rounded-md"
              >
                Sign Up
              </motion.button>
            </form>

            {/* Social SignUp Button Button */}
            <div className="flex gap-6 justify-center mt-6">
              <motion.button
                whileTap={{ scale: 0.9 }}
                type="button"
                className="text-themeColor bg-navyBlue ring-1 ring-deepBlue font-medium rounded-full text-sm px-3 py-3 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 "
              >
                <svg
                  className="w-4 h-4 "
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fab"
                  data-icon="facebook-f"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 320 512"
                >
                  <path
                    fill="currentColor"
                    d="M279.1 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.4 0 225.4 0c-73.22 0-121.1 44.38-121.1 124.7v70.62H22.89V288h81.39v224h100.2V288z"
                  ></path>
                </svg>
              </motion.button>

              {/* <GoogleLogin onSuccess={responseMessage} onError={errorMessage}/> */}

              <motion.button
                whileTap={{ scale: 0.9 }}
                type="button"
                className="text-themeColor bg-navyBlue ring-1 ring-deepBlue font-medium rounded-full text-sm px-3 py-3 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 "
              >
                <svg
                  className="w-4 h-4"
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fab"
                  data-icon="google"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 488 512"
                >
                  <path
                    fill="currentColor"
                    d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                  ></path>
                </svg>
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.9 }}
                type="submit"
                className="text-themeColor bg-navyBlue ring-1 ring-deepBlue font-medium rounded-full text-sm px-3 py-3 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 "
              >
                <svg
                  className="w-4 h-4"
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fab"
                  data-icon="github"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 496 512"
                >
                  <path
                    fill="currentColor"
                    d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"
                  ></path>
                </svg>
              </motion.button>
            </div>
          </div>

          {/* Already have A Account */}
          <div className="py-4">
            <Link to="/room">
              <span className="text-liteBlue font-medium  cursor-pointer hover:text-themeColor">
                Already Have a Account
              </span>
            </Link>
          </div>

          <footer className=" xs:hidden md:hidden lg:block bottom-10 fixed">
            <h3 className="text-white">
              Developed By
              <span className="font-bold text-themeColor"> Mithun C-y ❤</span>
            </h3>
          </footer>
        </div>
      </div>
    </section>
  );
};
