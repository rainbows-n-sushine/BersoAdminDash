import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faCheck,
  faTrash,
  faHome,
  faUsers,
  faLayerGroup,
  faChartBar,
  faCog,
  faSignOutAlt,
  faUser,
  faArrowLeft,
  faBuilding,
  faEnvelope,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";

import img from "../images/logo-removebg.png";

const NotificationDetail = () => {
  const { id } = useParams(); // Assuming the notification ID is passed via URL params
  const [notificationDetail, setNotificationDetail] = useState(null);

  const dummyData = {
    1: {
      id: 1,
      title: "New Business Registered",
      description: "Business XYZ has registered on the platform.",
      date: "2024-06-01",
      business: {
        name: "Business XYZ",
        address: "123 Main St, Anytown, USA",
        email: "contact@businessxyz.com",
        phone: "123-456-7890",
        registeredBy: "John Doe",
      },
    },
    2: {
      id: 2,
      title: "New Report",
      description: "A new report has been submitted.",
      date: "2024-06-02",
      business: {
        name: "Business ABC",
        address: "456 Elm St, Anytown, USA",
        email: "contact@businessabc.com",
        phone: "098-765-4321",
        registeredBy: "Jane Smith",
      },
    },
  };

  useEffect(() => {
    // Simulate fetching data from an API
    const fetchNotificationDetail = () => {
      setNotificationDetail(dummyData[id]);
    };

    fetchNotificationDetail();
  }, [id]);

  const handleVerifyBusiness = () => {
    // Add your logic to verify the business
    console.log("Business verified");
  };

  const handleDeleteBusiness = () => {
    // Add your logic to delete the business
    console.log("Business deleted");
  };

  if (!notificationDetail) {
    return <div>Loading...</div>;
  }

  return (
    <div className="notification-detail-container flex flex-col h-screen">
      <div className="top-bar flex justify-between items-center p-4 bg-white text-black shadow">
        <div className="flex items-center">
          <img src={img} alt="Logo" className="w-12 h-12 mr-2" />
          <h1 className="text-xl font-bold text-orange-600">Berso Admin</h1>
        </div>
        <div className="top-bar-icons flex items-center justify-between w-60">
          <Link to="/Notifications">
            <FontAwesomeIcon icon={faBell} className="text-lg " />
          </Link>
          <FontAwesomeIcon icon={faUser} className="text-lg mr-2" />
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
                  Categories
                </Link>
              </li>
              <li className="mb-4">
                <Link
                  to="/ProblemReports"
                  className="flex items-center text-xl"
                >
                  <FontAwesomeIcon icon={faChartBar} className="text-xl mr-3" />
                  Problem Reports
                </Link>
              </li>
              <li className="mb-4">
                <Link to="/settings" className="flex items-center text-xl">
                  <FontAwesomeIcon icon={faCog} className="text-xl mr-3" />
                  Settings
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="dashboard-content-right flex flex-col flex-1 p-4 bg-orange-50">
          <div className=" flex justify-between items-center p-4 bg-white text-black shadow">
            <Link to="/Notifications" className="flex items-center">
              <FontAwesomeIcon icon={faArrowLeft} className="text-lg mr-2" />
              Back to List of Notifications
            </Link>
          </div>
          <div className="flex m-4 ml-5 items-center">
            <FontAwesomeIcon icon={faBell} className="text-xl mr-3" />
            <h1 className="font-bold text-2xl">Notification Detail</h1>
          </div>
          <div className="notification-detail bg-white p-4 rounded-lg shadow">
            <h2 className="font-bold text-xl text-orange-500">
              {notificationDetail.title}
            </h2>
            <p className="mt-2">{notificationDetail.description}</p>
            <p className="text-gray-500">{notificationDetail.date}</p>
            <div className="business-details mt-4 p-8">
              <h3 className="font-bold text-xl">Business Details</h3>
              <p className=" mt-3 p-2">
                <FontAwesomeIcon icon={faBuilding} />{" "}
                <strong className="ml-2">Name:</strong>{" "}
                {notificationDetail.business.name}
              </p>
              <p className=" mt-3 p-2">
                <FontAwesomeIcon icon={faBuilding} />{" "}
                <strong className="ml-2">Address:</strong>{" "}
                {notificationDetail.business.address}
              </p>
              <p className=" mt-3 p-2">
                <FontAwesomeIcon icon={faEnvelope} />{" "}
                <strong className="ml-2">Email:</strong>{" "}
                {notificationDetail.business.email}
              </p>
              <p className=" mt-3 p-2">
                <FontAwesomeIcon icon={faPhone} />{" "}
                <strong className=" ml-2">Phone:</strong>{" "}
                {notificationDetail.business.phone}
              </p>
              <p className=" mt-3 p-2">
                <FontAwesomeIcon icon={faUser} />{" "}
                <strong className="ml-2">Registered By:</strong>{" "}
                {notificationDetail.business.registeredBy}
              </p>
            </div>
            <div className="actions mt-4 flex">
              <button
                className="btn-verify mr-2 p-2 bg-green-500 text-white rounded"
                onClick={handleVerifyBusiness}
              >
                <FontAwesomeIcon icon={faCheck} className="mr-1" /> Verify
                Business
              </button>
              <button
                className="btn-delete p-2 bg-red-500 text-white rounded"
                onClick={handleDeleteBusiness}
              >
                <FontAwesomeIcon icon={faTrash} className="mr-1" /> Delete
                Business
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationDetail;
