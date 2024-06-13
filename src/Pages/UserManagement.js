import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
} from "@fortawesome/free-solid-svg-icons";
import api from "../util/Util";
import NavBar from "../components/NavBar";
import img from "../images/logo-removebg.png";
import Menu from "../components/Menu";
const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get("user/fetch-all");
        setUsers(res.data.users);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };
    fetchUsers();
  }, []);

  const handleUpdateUserRole = (userId, newRole) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId ? { ...user, role: newRole } : user
      )
    );
  };

  const handleDeleteUser = (userId) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name && user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col h-screen">
     <NavBar/>
      <div className="dashboard-content flex flex-1">
        <Menu/>
        <div className="dashboard-content-right flex flex-col flex-1 p-4 bg-orange-50">
          <div className="flex m-4 ml-5 items-center">
            <FontAwesomeIcon icon={faUsers} className="text-xl mr-3" />
            <h1 className="text-2xl font-bold">List Of Users</h1>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2">User ID</th>
                  <th className="py-2">Name</th>
                  <th className="py-2">Email</th>
                  <th className="py-2">Role</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user._id} className="border-b">
                    <td className="py-2">{user._id}</td>
                    <td className="py-2">{user.name}</td>
                    <td className="py-2">{user.email}</td>
                    <td className="py-2">{user.role}</td>
                    <td className="py-2">
                      <div className="flex space-x-2">
                        <button
                          className="bg-blue-500 text-white px-2 py-1 rounded"
                          onClick={() =>
                            handleUpdateUserRole(user._id, "admin")
                          }
                        >
                          <FontAwesomeIcon icon={faEdit} className="icon" />
                        </button>
                        <button
                          className="bg-red-500 text-white px-2 py-1 rounded"
                          onClick={() => handleDeleteUser(user._id)}
                        >
                          <FontAwesomeIcon icon={faTrash} className="icon" />
                        </button>
                        <Link
                          className="bg-green-500 text-white px-2 py-1 rounded"
                          to={`/user/${user._id}`}
                        >
                          <FontAwesomeIcon icon={faEye} className="icon" />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
