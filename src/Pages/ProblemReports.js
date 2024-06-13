import React, { useState,useEffect } from "react";
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
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import api from "../util/Util";

import img from "../images/logo-removebg.png";
import NavBar from "../components/NavBar";
const ProblemReports = () => {

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
  
  const [reportList, setReportList] = useState([]);
  const [filter, setFilter] = useState("All");

  useEffect(()=>{
    fetchReports();
  },[])
  const fetchReports=async()=>{

    await api.get('report/fetch-all')
    .then((res)=>{
      console.log(res.data.message)
      if(res.data.success){
        setReportList(res.data.reports)
      }
    })
    .catch((error)=>{
      if(error){
        console.log("this is the error in fetch reports: ",error.message)
      }
    })
  }






 const handleResolve = (id) => {
   const updatedReports = reportList.map((report) =>
     report.id === id ? { ...report, status: "resolved" } : report
   );
   setReportList(updatedReports);
 };

 const handleDelete = (id) => {
   const updatedReports = reportList.filter((report) => report.id !== id);
   setReportList(updatedReports);
 };

 const handleFilterChange = (type) => {
   setFilter(type);
 };

 const filteredReports =
   filter === "All"
     ? reportList
     : reportList.filter((report) => report.type === filter);


  return (
    <div className="report-container flex flex-col h-screen">
     <NavBar/>
      <div className="dashboard-content flex flex-1">
        <div className="sidebar w-72 p-4 shadow">
          <div className="side-menu">
            {" "}
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
                <Link to="/Notifications" className="flex items-center text-xl">
                  <FontAwesomeIcon icon={faBell} className="text-xl mr-3" />
                  Notifications
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
          <div className="filter-bar flex justify-center my-4">
            {[
              "All",
              "Technical Issue",
              "Inappropriate Action",
              "Feature Request",
              "Business Issue",
            ].map((type) => (
              <button
                key={type}
                className={`mx-2 px-4 py-2 rounded ${
                  filter === type ? "bg-orange-400 text-white" : "bg-gray-200"
                }`}
                onClick={() => handleFilterChange(type)}
              >
                {type}
              </button>
            ))}
          </div>
          <div className="reports-list mt-4">
            {filteredReports.map((report) => (
              <div
                key={report._id}
                className="report-item p-4 border-b bg-white rounded-lg shadow mb-4 flex justify-between "
              >
                <div className="flex-col">
                  <h2 className="font-bold text-orange-500">
                    <Link
                      to="/ReportDetail/:id"
                      className="text-orange-500 font-bold text-xl"
                    >
                      {report.title}
                    </Link>
                  </h2>
                  <p>{report.description}</p>
                  <p className="text-gray-500">{report.date}</p>
                  <p
                    className={`status text-${
                      report.status === "resolved" ? "green" : "red"
                    }-500 font-bold`}
                  >
                    {report.status === "resolved" ? "Resolved" : "Pending"}
                  </p>
                  <p className="mb-2">
                    <strong>Type:</strong> {report.type}
                  </p>
                </div>
                <div className="actions mt-2 flex">
                  {report.status === "pending" && (
                    <button
                      className="btn-resolve mr-2 p-2 bg-green-500 text-white rounded"
                      onClick={() => handleResolve(report.id)}
                    >
                      <FontAwesomeIcon icon={faCheck} className="mr-1" />{" "}
                      Resolve
                    </button>
                  )}
                  <button
                    className="btn-delete p-2 bg-red-500 text-white rounded"
                    onClick={() => handleDelete(report.id)}
                  >
                    <FontAwesomeIcon icon={faTrash} className="mr-1" /> Delete
                  </button>
                </div>
              </div>
            ))}
            {filteredReports.length === 0 && (
              <p className="text-center mt-4">No problem reports found.</p>
            )}
            {/* {sampleReports.map((report) => (
              <Link to="/ReportDetail">
                <div
                  key={report.id}
                  className="report-item p-4 border-b bg-white rounded-xl mb-3 "
                >
                  <h2>{report.id}</h2>
                  <h2 className="font-bold text-xl">{report.title}</h2>
                  <p>{report.description}</p>
                  <p className="text-gray-500">{report.date}</p>
                </div>
              </Link>
            ))} */}
            {/* {sampleReports.length === 0 && (
              <p className="text-center mt-4">No problem reports found.</p>
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemReports;
