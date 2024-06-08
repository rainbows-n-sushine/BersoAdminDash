import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useParams } from "react-router-dom";
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
const ReportDetail = () => {
  const { id } = useParams();

  // Dummy data inside the component
  const reports = [
    {
      id: 1,
      title: "App crashing on startup",
      description: "Whenever I try to open the app, it crashes immediately.",
      date: "2024-06-01",
      status: "pending",
      type: "Technical Issue",
    },
    {
      id: 2,
      title: "Inappropriate comment on review",
      description: "This comment on my business review is offensive.",
      date: "2024-06-02",
      status: "pending",
      type: "Inappropriate Action",
      user: "user123",
      business: "Business ABC",
      stepsTaken: ["Reported comment to moderation team", "User warned"],
    },
    {
      id: 3,
      title: "Feature request: Dark mode",
      description: "Please add a dark mode option to the app.",
      date: "2024-06-03",
      status: "pending",
      type: "Feature Request",
    },
    {
      id: 4,
      title: "Business listing issue",
      description: "The address for my business listing is incorrect.",
      date: "2024-06-04",
      status: "pending",
      type: "Business Issue",
    },
  ];

  // Find the report by ID
   console.log("ID from useParams:", id);
   const report = reports.find((report) => report.id === parseInt(id));
   console.log("Found report:", report);
  
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
          <Link to="/Notifications">
            <FontAwesomeIcon icon={faBell} className="text-lg " />
          </Link>
          <FontAwesomeIcon icon={faUser} className="text-lg " />
          <FontAwesomeIcon icon={faSignOutAlt} className="text-lg" />
        </div>
      </div>
      <div className="dashboard-content flex flex-1">
        <div className="sidebar w-72 p-4 shadow">
          <div className="side-menu">
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
                <Link to="/ReportDetail" className="flex items-center text-xl">
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
          <div className=" flex justify-between items-center p-4 bg-white text-black shadow">
            <Link to="/ProblemReports" className="flex items-center">
              <FontAwesomeIcon icon={faArrowLeft} className="text-lg mr-2" />
              Back to List of reports
            </Link>
          </div>
          <div className=" flex m-4  ml-5 items-center">
            <FontAwesomeIcon icon={faChartBar} className="text-xl mr-3 " />
            <h1 className="font-bold text-2xl">Report Detail</h1>
          </div>
          {/* <div className="report-details p-4 bg-white rounded-lg shadow mb-4">
            <h1 className="text-2xl font-bold mb-2">{report.title}</h1>
            <p className="mb-2">
              <strong>Description:</strong> {report.description}
            </p>
            <p className="text-gray-500 mb-2">
              <strong>Date:</strong> {report.date}
            </p>
            <p
              className={`status text-${
                report.status === "resolved" ? "green" : "red"
              }-500 font-bold mb-2`}
            >
              {report.status === "resolved" ? "Resolved" : "Pending"}
            </p>
            <p className="mb-2">
              <strong>Type:</strong> {report.type}
            </p>
            {report.type === "Inappropriate Action" && (
              <div className="inappropriate-details mb-2">
                <p className="mb-2">
                  <strong>User:</strong> {report.user}
                </p>
                <p className="mb-2">
                  <strong>Business:</strong> {report.business}
                </p>
              </div>
            )}
            {report.stepsTaken && report.stepsTaken.length > 0 && (
              <div className="steps-taken mb-2">
                <p className="mb-2">
                  <strong>Steps Taken:</strong>
                </p>
                <ul className="list-disc list-inside">
                  {report.stepsTaken.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ul>
              </div>
            )}
          </div> */}
          {/* <div className="reports-list">
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
          </div>*/}
        </div>
      </div>
    </div>
  );
};

export default ReportDetail;
