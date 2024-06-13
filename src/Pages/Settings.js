import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import {
  faHome,
  faUsers,
  faLayerGroup,
  faChartBar,
  faCog,
  faSignOutAlt,
  faBell,
  faUser,
  faSave,
} from "@fortawesome/free-solid-svg-icons";

import img from "../images/logo-removebg.png";
import NavBar from "../components/NavBar";

const Settings = () => {
  const [settings, setSettings] = useState({
    notification: true,
    darkMode: false,
    language: "English",
  });

  const handleToggle = (key) => {
    setSettings({ ...settings, [key]: !settings[key] });
  };

  const handleLanguageChange = (e) => {
    setSettings({ ...settings, language: e.target.value });
  };

  const handleSave = () => {
    // Save settings logic here
    console.log("Settings saved:", settings);
  };

  return (
    <div className="settings-container flex flex-col h-screen">
     <NavBar/>
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
                <Link to="/Notifications" className="flex items-center text-xl">
                  <FontAwesomeIcon icon={faBell} className="text-xl mr-3" />
                  Notifications
                </Link>
              </li>
              <li className="mb-4">
                <Link to="/Settings" className="flex items-center text-xl">
                  <FontAwesomeIcon icon={faCog} className="text-xl mr-3" />
                  Settings
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="dashboard-content-right flex flex-col flex-1 p-4 bg-orange-50">
          <div className="flex m-4 ml-5 items-center">
            <FontAwesomeIcon icon={faCog} className="text-xl mr-3" />
            <h1 className="font-bold text-2xl">Settings</h1>
          </div>
          <div className="settings-list mt-4 p-4 bg-white rounded-lg shadow">
            <div className="setting-item flex justify-between items-center mb-6">
              <span className="font-bold text-xl">Notifications</span>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={settings.notification}
                  onChange={() => handleToggle("notification")}
                />
                <span className="slider round"></span>
              </label>
            </div>
            <div className="setting-item flex justify-between items-center mb-6">
              <span className="font-bold text-xl">Dark Mode</span>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={settings.darkMode}
                  onChange={() => handleToggle("darkMode")}
                />
                <span className="slider round"></span>
              </label>
            </div>
            <div className="setting-item flex justify-between items-center mb-6">
              <span className="font-bold text-xl">Language</span>
              <select
                className="p-2 border rounded"
                value={settings.language}
                onChange={handleLanguageChange}
              >
                <option value="English">English</option>
                <option value="Spanish">Spanish</option>
                <option value="French">French</option>
              </select>
            </div>
            <div className="flex justify-end mt-20">
              <button
                className="btn-save p-2 bg-orange-500 text-white rounded"
                onClick={handleSave}
              >
                <FontAwesomeIcon icon={faSave} className="mr-1" /> Save Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
