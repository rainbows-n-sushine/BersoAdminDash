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

 const [categoriesCount, setCategoriesCount] = useState(0);
 const [listingsCount, setListingsCount] = useState(0);
 const [claimedListingsCount, setClaimedListingsCount] = useState(0);
 const [monthlyUsersData, setMonthlyUsersData] = useState([]);

 useEffect(() => {
   async function fetchData() {
     try {
       const categoriesRes = await fetch("/category/fetchAll");
       const categoriesData = await categoriesRes.json();

       const listingsRes = await fetch("/business/fetch-all");
       const listingsData = await listingsRes.json();

       const claimedListingsRes = await fetch("/business/fetch-claimed"); // Assuming this endpoint exists
       const claimedListingsData = await claimedListingsRes.json();

       const monthlyUsersRes = await fetch("/api/users/monthly"); // Assuming this endpoint exists
       const monthlyUsersData = await monthlyUsersRes.json();

       setCategoriesCount(categoriesData.categories.length);
       setListingsCount(listingsData.businesses.length);
       setClaimedListingsCount(claimedListingsData.claimed.length); // Assuming the response contains a `claimed` array
       setMonthlyUsersData(monthlyUsersData.dataPoints); // Adjust according to actual data structure
     } catch (error) {
       console.error("Error fetching data", error);
     }
   }

   fetchData();
 }, []);

 useEffect(() => {
   if (chartRef.current) {
     chartRef.current.render();
   }
 }, [monthlyUsersData]);

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
       dataPoints: monthlyUsersData,
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
                <Link to="/settings" className="flex items-center text-xl">
                  <FontAwesomeIcon icon={faCog} className="text-xl mr-3" />{" "}
                  Settings
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="dashboard-content-right flex flex-col flex-1 p-4 bg-orange-50">
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
              />
              <h2 className="text-xl font-bold mb-2 text-center">
                Total Categories
              </h2>
              <div className="count text-3xl text-center">
                {categoriesCount}
              </div>
            </div>
            <div className="card w-1/3 bg-white p-4 m-3 rounded-xl shadow">
              <FontAwesomeIcon
                icon={faStore}
                className="text-3xl mt-10 mb-2 items-center mx-44"
              />
              <h2 className="text-xl font-bold mb-2 text-center">
                Total Listings
              </h2>
              <div className="count text-3xl text-center">{listingsCount}</div>
            </div>
            <div className="card w-1/3 bg-white p-4 m-3 rounded-xl shadow">
              <FontAwesomeIcon
                icon={faCheck}
                className="text-3xl mt-10 items-center mx-44 mb-2"
              />
              <h2 className="text-xl font-bold mb-2 text-center">
                Claimed Listings
              </h2>
              <div className="count text-3xl text-center">
                {claimedListingsCount}
              </div>
            </div>
          </div>
          <div className="bg-white p-2 rounded-lg shadow ml-6">
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
