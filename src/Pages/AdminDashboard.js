import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faChartBar,
  faCog,
  faSearch,
  faBell,
  faUser,
  faSignOutAlt,
  faUsers,
  faBuilding,
  faLayerGroup,
  faStore,
  faCheck,
  
} from "@fortawesome/free-solid-svg-icons";
// import "./UserManagement";
import CanvasJSReact from "@canvasjs/react-charts";
import { Link } from "react-router-dom";
import img from "../images/logo-removebg.png";
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const AdminDashboard = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.render();
    }
  }, []);

  const options = {
    animationEnabled: true,
    title: {
      text: "Monthly Users - 2024",
    },
    axisX: {
      valueFormatString: "MMM",
    },
    axisY: {
      title: "Number of users",
      prefix: "",
    },
    data: [
      {
        yValueFormatString: "#,###",
        xValueFormatString: "MMMM",
        type: "spline",
        dataPoints: [
          { x: new Date(2017, 0), y: 25060 },
          { x: new Date(2017, 1), y: 27980 },
          { x: new Date(2017, 2), y: 42800 },
          { x: new Date(2017, 3), y: 32400 },
          { x: new Date(2017, 4), y: 35260 },
          { x: new Date(2017, 5), y: 33900 },
          { x: new Date(2017, 6), y: 40000 },
          { x: new Date(2017, 7), y: 52500 },
          { x: new Date(2017, 8), y: 32300 },
          { x: new Date(2017, 9), y: 42000 },
          { x: new Date(2017, 10), y: 37160 },
          { x: new Date(2017, 11), y: 38400 },
        ],
      },
    ],
  };

  return (
    <div className="admin-dashboard flex flex-col h-screen">
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
        <div className="sidebar w-72 p-4 shadow flex">
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
            <FontAwesomeIcon icon={faHome} className="text-xl mr-3 " />
            <h1 className="font-bold text-2xl">Admin's Dashboard</h1>
          </div>
          <div className="cards-container flex justify-between mb-6 p-2">
            <div className="card w-1/3 h-52 bg-white p-4 m-3 rounded-xl shadow items-center justify-center">
              <FontAwesomeIcon
                icon={faLayerGroup}
                size={40}
                className="text-3xl mt-10 items-center mx-44 mb-2"
              />{" "}
              <h2 className="text-xl font-bold  mb-2 text-center">
                Total Categories
              </h2>
              <div className="count text-3xl text-center">50+</div>
            </div>
            <div className="card w-1/3 bg-white p-4 m-3 rounded-xl shadow">
              <FontAwesomeIcon
                icon={faStore}
                className="text-3xl mt-10 mb-2 items-center mx-44"
              />{" "}
              <h2 className="text-xl font-bold  mb-2 text-center">
                Total Listings
              </h2>
              <div className="count text-3xl text-center">100+</div>
            </div>
            <div className="card w-1/3 bg-white p-4 m-3 rounded-xl shadow">
              <FontAwesomeIcon
                icon={faCheck}
                className="text-3xl mt-10 items-center mx-44 mb-2"
              />
              <h2 className="text-xl font-bold mb-2 text-center">
                Claimed Listings
              </h2>
              <div className="count text-3xl text-center">20+</div>
            </div>
          </div>
          <div className=" bg-white p-2 rounded-lg shadow ml-3">
            <CanvasJSChart
              options={options}
              onRef={(ref) => (chartRef.current = ref)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
