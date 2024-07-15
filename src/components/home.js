import React, { useState, useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import userImg from "../assets/user-image.png";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // Import the default styles
import hyperlink from "../assets/hyperlink.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGear,
  faCreditCard,
  faUser,
  faMagnifyingGlassChart,
  faHome,
  faCommenting,
  faBoxesStacked,
  faFileInvoiceDollar,
  faCalendarDays,
} from "@fortawesome/free-solid-svg-icons";
// import { getExpenses } from "./Services/requests";
import {
  faFacebook,
  faTwitter,
  faInstagram,
  faGithub,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";

import Stock from "./stock";
import Chat from "./chat";
import Reservations from "./reservations";
import Schedule from "./schedule";
import BusinessCards from "./businessCards";
import Widgets from "./widgets";
import Profile from "./profile";
import Settings from "./settings";
import Analysis from "./analysis";
import Home2 from "./home2";

function Home() {
  const navigate = useNavigate();
  const [expenses, setExpenses] = useState([]);
  const [userInfo, setUserInfo] = useState([]);
  const [component, setComponent] = useState(<Home2 userInfo={userInfo} />);
  const [token, setToken] = useState(localStorage.getItem("token"));

  const [data, setData] = useState({ data: [] }); // Set the data state to an empty array
  const [errorCode, setErrorCode] = useState(null); // Set the errorInfo state to null
  const [date, setDate] = useState(new Date());
  const onChange = (newDate) => {
    setDate(newDate);
  };

  const handleStorageChange = () => {
    const updatedToken = localStorage.getItem("token");
    setToken(updatedToken);
  };
  window.addEventListener("storage", handleStorageChange);
  if (!token || token === undefined || token === null) {
    return <Navigate replace to="/" />;
  }
  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  // Function to set the component to be rendered
  const changeComponent = (component) => {
    setComponent(component);
  };

  // Menu items background color change on click
  const menuItems = document.querySelectorAll(".menu-item");
  menuItems.forEach((item) => {
    item.addEventListener("click", function () {
      menuItems.forEach((otherItem) => {
        otherItem.classList.remove("bg-slate-300");
      });
      item.classList.remove("bg-slate-300");
      item.classList.add("bg-slate-300");
    });
  });

  const fetchNewsData = async (url) => {
    try {
      const response = await fetch(url);

      if (!response.ok) {
        const errorText = await response.text();
        const errorCode = `Error Code: ${response.status}.`;
        setErrorCode(errorCode);
        throw new Error(errorCode); // Throw the error with the error information
      }

      const responseData = await response.json();
      setData(responseData); // Update the entire data object
    } catch (error) {
      console.error("Error fetching data:", error);
      setErrorCode(error.message); // Set the errorInfo state to the error message
    }
  };

  // useEffect(() => {
  //   const CovidDataPerDay =
  //     "https://api.thenewsapi.com/v1/news/all?language=en&api_token=UECGzUadiCBYT3YzjqyPJcehE4RRVy4buJA0PQGE";
  //   fetchNewsData(CovidDataPerDay);
  // }, []);

  return (
    <div className="bg-white animate__animated animate__fadeIn m-2">
      {/* Header */}
      <div className="bg-slate-100 border-custom3 shadow-md border-2 rounded-md ml-4 mr-4 mb-2 pt-2 pb-2 flex justify-between">
        <div className="ml-2">
          <h1 className="text-lg font-thin text-left inline-block">
            LastCall | Bar Management
          </h1>
        </div>
        <div>
          <Widgets />
        </div>
      </div>

      {/* Body */}
      <div className="flex h-full">
        <div className=" w-1/6 mr-4 ml-4 shadow-xl">
          {/* Sidebar */}
          <div className="animate__animated animate__fadeIn  h-[100%] shadow-xl rounded-md bg-slate-100 border-custom3 border-2">
            <div className=" flex m-4 justify-start items-center ">
              <img
                src={userImg}
                alt="user"
                className="w-[50px] h-[50px] rounded-full"
              />
              <p className="ml-4 text-lg font-thin">{userInfo.username}</p>
            </div>
            <div className="grid place-items-center">
              <hr className="mb-8 w-[12rem] h-[0.1rem] bg-slate-300" />
              <div className="grid place-items-start mt-2 w-[12rem]">
                <div
                  className="menu-item w-[12rem] text-m font-normal mb-2 hover:cursor-pointer transition duration-300 ease-in-out transform hover:bg-slate-200 rounded-md p-2"
                  onClick={() => changeComponent(<Home2 userInfo={userInfo} />)}
                >
                  <FontAwesomeIcon icon={faHome} className="mr-4 w-4 h-4" />{" "}
                  Home
                </div>
                <div
                  className="menu-item w-[12rem] text-m font-normal mb-2 hover:cursor-pointer transition duration-300 ease-in-out transform hover:bg-slate-200 rounded-md p-2"
                  onClick={() => changeComponent(<Chat userInfo={userInfo} />)}
                >
                  <FontAwesomeIcon
                    icon={faCommenting}
                    className="mr-4 w-4 h-4"
                  />{" "}
                  Chat
                </div>
                <div
                  className="menu-item w-[12rem] text-m font-normal mb-2 hover:cursor-pointer transition duration-300 ease-in-out transform hover:bg-slate-200 rounded-md p-2"
                  onClick={() => changeComponent(<Stock />)}
                >
                  <FontAwesomeIcon
                    icon={faBoxesStacked}
                    className="mr-4 w-4 h-4"
                  />{" "}
                  Stock
                </div>
                <div
                  className="menu-item w-[12rem] text-m font-normal mb-2 hover:cursor-pointer transition duration-300 ease-in-out transform hover:bg-slate-200 rounded-md p-2"
                  onClick={() => changeComponent(<Reservations />)}
                >
                  <FontAwesomeIcon
                    icon={faFileInvoiceDollar}
                    className="mr-4 w-4 h-4"
                  />
                  Reservations
                </div>
                <div
                  className="menu-item w-[12rem] text-m font-normal mb-2 hover:cursor-pointer transition duration-300 ease-in-out transform hover:bg-slate-200 rounded-md p-2"
                  onClick={() => changeComponent(<Schedule />)}
                >
                  <FontAwesomeIcon
                    icon={faCalendarDays}
                    className="mr-4 w-4 h-4"
                  />
                  Schedule
                </div>
                <div
                  className="menu-item w-[12rem] text-m font-normal mb-2 hover:cursor-pointer transition duration-300 ease-in-out transform hover:bg-slate-200 rounded-md p-2"
                  onClick={() => changeComponent(<BusinessCards />)}
                >
                  <FontAwesomeIcon
                    icon={faCreditCard}
                    className="mr-4 w-4 h-4"
                  />
                  Menu
                </div>
                <div
                  className="menu-item w-[12rem] text-m font-normal mb-2 hover:cursor-pointer transition duration-300 ease-in-out transform hover:bg-slate-200 rounded-md p-2"
                  onClick={() => changeComponent(<Analysis />)}
                >
                  <FontAwesomeIcon
                    icon={faMagnifyingGlassChart}
                    className="mr-4 w-4 h-4"
                  />
                  Revenue Analysis{" "}
                </div>
                <div
                  className="menu-item w-[12rem] text-m font-normal mb-2 hover:cursor-pointer transition duration-300 ease-in-out transform hover:bg-slate-200 rounded-md p-2"
                  onClick={() => changeComponent(<Profile />)}
                >
                  <FontAwesomeIcon icon={faUser} className="mr-4 w-4 h-4" />
                  Profile
                </div>
                <div
                  className="menu-item w-[12rem] text-m font-normal mb-2 hover:cursor-pointer transition duration-300 ease-in-out transform hover:bg-slate-200 rounded-md p-2"
                  onClick={() => changeComponent(<Settings />)}
                >
                  <FontAwesomeIcon icon={faGear} className="mr-4 w-4 h-4" />
                  Setings
                </div>
                <div
                  onClick={() => logout()}
                  className="w-[12rem] text-m font-normal mb-2 hover:cursor-pointer transition duration-300 ease-in-out transform hover:bg-slate-200 rounded-md p-2"
                >
                  <button>
                    <FontAwesomeIcon
                      icon={faArrowRightFromBracket}
                      className="mr-6 w-4 h-4"
                    />
                    Log out
                  </button>
                </div>
              </div>
              <hr className="mb-8 mt-8 w-[12rem] h-[0.1rem]  bg-slate-400" />
            </div>

            <div className="grid place-items-center mb-4">
              <p className="text-xl font-thin mb-4 ">Socials</p>
              <hr className="mb-6 w-[4px] rounded-full h-[4px] bg-slate-400" />
              <div className="w-[12rem] text-center flex justify-between">
                <FontAwesomeIcon icon={faFacebook} className="w-6 h-6" />
                <FontAwesomeIcon icon={faInstagram} className="w-6 h-6" />
                <FontAwesomeIcon icon={faTwitter} className="w-6 h-6" />
                <FontAwesomeIcon icon={faGithub} className="w-6 h-6" />
                <FontAwesomeIcon icon={faLinkedin} className="w-6 h-6" />
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="w-5/6 flex mr-4 shadow-xl bg-slate-100 rounded-md border-custom3 border-2">
          <div className="h-full w-full">{component}</div>
        </div>
      </div>
    </div>
  );
}

export default Home;
