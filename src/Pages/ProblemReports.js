import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import {
  faHome,
  faChartBar,
  faCog,
  faSearch,
  faBell,
  faUser,
  faSignOutAlt,
  faEye,
  faTrash,
  faEdit,
  faUsers,
  faStore,
  faLayerGroup,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";

import img from "../images/logo-removebg.png";
const ProblemReports = () => {
  // State to hold problem reports
  const [reports, setReports] = useState([]);

  // Sample problem reports (you can replace this with your own data)
  const sampleReports = [
    {
      id: 1,
      title: "App crashing on startup",
      description: "Whenever I try to open the app, it crashes immediately.",
      date: "2024-06-01",
    },
    {
      id: 2,
      title: "Unable to login",
      description: "I can't seem to log in to my account.",
      date: "2024-06-02",
    },
    {
      id: 3,
      title: "Feature request: Dark mode",
      description: "Please add a dark mode option to the app.",
      date: "2024-06-03",
    },
  ];

  // Function to handle submission of a new report
  const handleSubmit = (event) => {
    event.preventDefault();
    // Add your logic to handle report submission here
    // For simplicity, let's just console.log the input values
    console.log("Report submitted!");
  };

  return (
    <div className="report-container flex flex-col h-screen">
      <div className="top-bar flex justify-between items-center p-4 bg-white text-black shadow">
        <div className=" flex items-center ">
          <img src={img} alt="Logo" className="w-12 h-12 mr-2" />
          <h1 className="text-xl font-bold items-center text-orange-600">
            Berso Admin
          </h1>
        </div>
        <div className="flex items-center">
          <FontAwesomeIcon icon={faSearch} className="text-lg mr-2" />
          <input
            type="text"
            placeholder="Search"
            className="py-1 px-2 bg-gray-200 rounded w-96"
          />
        </div>
        <div className="top-bar-icons flex items-center justify-between w-60">
          <FontAwesomeIcon icon={faBell} className="text-lg " />
          <FontAwesomeIcon icon={faUser} className="text-lg " />
          <FontAwesomeIcon icon={faSignOutAlt} className="text-lg" />
        </div>
      </div>
      <div className="dashboard-content flex flex-1">
        <div className="sidebar w-72 p-4 shadow">
          <div className="side-menu justify-between">
            <h2 className="text-2xl font-bold my-5">Menu</h2>
            <ul>
              <li className="mb-4">
                <Link to="/" className="flex items-center text-xl">
                  <FontAwesomeIcon icon={faHome} className="text-xl mr-3" />
                  {/* <FontAwesomeIcon icon="fa-solid fa-house" /> */}
                  Home
                </Link>
              </li>
              <li className="mb-4">
                <Link
                  to="/UserManagement"
                  className="flex items-center text-xl"
                >
                  <FontAwesomeIcon icon={faUsers} className="text-xl mr-3" />
                  User
                </Link>
              </li>
              <li className="mb-4">
                <Link
                  to="/BusinessListing"
                  className="flex items-center text-xl"
                >
                  <FontAwesomeIcon
                    icon={faLayerGroup}
                    className="text-xl mr-3"
                  />
                  Catagories
                </Link>
              </li>
              <li className="mb-4">
                <Link
                  to="/ProblemReports"
                  className="flex items-center text-xl"
                >
                  <FontAwesomeIcon icon={faChartBar} className="text-xl mr-3" />{" "}
                  Problem Reports
                </Link>
              </li>
              <li className="mb-4">
                <Link to="/settings" className="flex items-center text-xl">
                  <FontAwesomeIcon icon={faCog} className="text-xl mr-3" />{" "}
                  Settings
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="dashboard-content-right flex flex-col flex-1 p-4  bg-orange-50">
          <div className=" flex m-4  ml-5 items-center">
            <FontAwesomeIcon icon={faChartBar} className="text-xl mr-3 " />
            <h1 className="font-bold text-2xl">Problem Reports</h1>
          </div>
          {/*<div className="top-bar flex justify-between items-center p-4 bg-white text-black shadow">
             <Link to="/" className="flex items-center">
              <FontAwesomeIcon icon={faArrowLeft} className="text-lg mr-2" />
              Back to Dashboard
            </Link>
            <h1 className="text-xl font-bold">Problem Reports</h1>
            <div></div> 
          </div>*/}
          <div className="reports-list">
            {sampleReports.map((report) => (
              <div
                key={report.id}
                className="report-item p-4 border-b bg-white rounded-xl mb-3 "
              >
                <h2>{report.id}</h2>
                <h2 className="font-bold text-xl">{report.title}</h2>
                <p>{report.description}</p>
                <p className="text-gray-500">{report.date}</p>
              </div>
            ))}
            {sampleReports.length === 0 && (
              <p className="text-center mt-4">No problem reports found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemReports;
