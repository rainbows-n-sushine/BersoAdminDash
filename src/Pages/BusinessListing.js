import React, { useEffect, useState } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { debounce } from "lodash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import {
  faSearch,
  faBell,
  faUser,
  faSignOutAlt,
  faBuilding,
  faStore,
  faHotel,
  faUtensils,
  faCog,
  faHome,
  faGift,
  faBriefcase,
  faCar,
  faShoppingBag,
  faUsers,
  faChartBar,
  faLayerGroup,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import api from "../util/Util";
import { Link } from "react-router-dom";
import * as solidIcons from "@fortawesome/free-solid-svg-icons";
import "./BusinessListing.css"; // if you have additional custom CSS
import img from "../images/logo-removebg.png";
library.add(fas);
const allIcons = Object.keys(solidIcons).filter(
  (iconName) => iconName !== "prefix"
);

const BusinessListing = () => {
  const [businesses, setBusinesses] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showAddCategoryForm, setShowAddCategoryForm] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryDescription, setNewCategoryDescription] = useState("");
  const [categoriesFetched, setCategoriesFetched] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState({
    name: "",
    description: "",
    icon: "",
  });
  const [activeTab, setActiveTab] = useState("businesses"); // New state for tab selection

  library.add(fas);
  const allIcons = Object.keys(fas).filter((iconName) => iconName !== "prefix");

  useEffect(() => {
    async function getCategories() {
      await api
        .get("category/fetchAll")
        .then((res) => {
          const categories_fetched = res.data.categories;
          console.log(categories_fetched);
          setCategoriesFetched(categories_fetched);
        })
        .catch((err) => {
          if (err) {
            console.log("error in getCategories : ", err.messsage);
          }
        });
    }
    async function fetchBusinesses() {
      await api
        .get("business/fetch-all")
        .then((res) => {
          console.log(res.data);
          const data = res.data.businesses;
          setBusinesses(data);
        })
        .catch((err) => {
          if (err) {
            console.log("error in fetch businesses :", err);
          }
        });
    }
    fetchBusinesses();
    getCategories();
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleAddCategoryClick = () => {
    setShowAddCategoryForm(true);
  };

  const handleSearch = debounce((value) => {
    setSearchTerm(value);
  }, 300);

  // const filteredIcons = allIcons.filter(iconName =>
  //   iconName.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  // const filteredIcons = allIcons.filter((iconName) =>
  //   iconName.toLowerCase().includes(searchTerm.toLowerCase())
  // );
  const filteredIcons = allIcons.filter((iconName) =>
    iconName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add logic to handle form submission (e.g., sending the category name to the server)
    console.log(
      "New Category Name:",
      category.name,
      "\nDescription: ",
      category.description,
      "Icon: ",
      category.icon
    );
    await api
      .post("category/register", { category })
      .then((res) => {
        console.log(res.data);
        window.location.reload();
      })
      .catch((err) => {
        if (err) {
          console.log(err);
        }
      });

    // Resets the form
    setNewCategoryName("");
    // Hides the form
    setShowAddCategoryForm(false);
  };

  const handleAddCategoryFormClose = () => {
    setShowAddCategoryForm(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategory({ ...category, [name]: value });
  };

  const filteredBusinesses = selectedCategory
    ? businesses.filter((business) => {
        // let filterCategory=[]
        for (var i = 0; i < business.category.length; i++) {
          console.log("this is the selected Category", selectedCategory);
          console.log("this is the business category: ", business.category[i]);
          if (business.category[i] === selectedCategory) {
            // filterCategory.push(business.category[i])
            return true;
          }
        }
        return false;
      })
    : businesses;

  const categories = [
    ...new Set(businesses.map((business) => business.category)),
  ];

  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState("");

  const handleIconSelect = (iconName) => {
    setSelectedIcon(iconName);
    setCategory({ ...category, icon: iconName });
    setDropdownVisible(false);
  };

  return (
    <div className="flex flex-col h-screen">
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
          </Link>{" "}
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
        <div className="dashboard-content-right flex flex-col flex-1 p-4  bg-orange-50">
          <div className=" flex m-4  ml-5 items-center">
            <FontAwesomeIcon icon={faLayerGroup} className="text-xl mr-3" />
            <h1 className="text-2xl font-bold">Businesses and Catagories</h1>
          </div>
          <div className="flex mt-4">
            <div className="w-full md:w-2/12 p-4 bg-orange-100">
              <h2 className="text-xl font-semibold mb-4">Categories</h2>
              <ul>
                <li
                  className={`cursor-pointer p-2 rounded-md ${
                    selectedCategory === null ? "bg-white" : ""
                  }`}
                  onClick={() => handleCategoryClick(null)}
                >
                  All
                </li>
                {categoriesFetched.map((fetchedCategory) => (
                  <li
                    key={fetchedCategory._id}
                    className={`cursor-pointer p-2 ${
                      selectedCategory === fetchedCategory._id
                        ? "bg-gray-200"
                        : ""
                    }`}
                    onClick={() => handleCategoryClick(fetchedCategory._id)}
                  >
                    {fetchedCategory.name}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex-1 p-4 bg-orange-100">
              <div className="mb-4">
                <button
                  className={`p-2 ${
                    activeTab === "businesses"
                      ? "bg-orange-300 text-white"
                      : "bg-white"
                  }`}
                  onClick={() => setActiveTab("businesses")}
                >
                  Businesses
                </button>
                <button
                  className={`p-2 ml-2 ${
                    activeTab === "categories"
                      ? "bg-orange-300 text-white"
                      : "bg-white"
                  }`}
                  onClick={() => setActiveTab("categories")}
                >
                  Categories
                </button>
              </div>
              {activeTab === "businesses" && (
                <div>
                  <h2 className="text-xl font-semibold mb-4">Businesses</h2>
                  {filteredBusinesses.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {filteredBusinesses.map((business) => (
                        <div
                          key={business._id}
                          className="p-4 border rounded-md"
                        >
                          <FontAwesomeIcon
                            icon={solidIcons[business.icon] || faBuilding}
                            className="text-2xl mb-2"
                          />
                          <span className="block font-semibold">
                            {business.business_name}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p>No businesses found.</p>
                  )}
                </div>
              )}
              {activeTab === "categories" && (
                <div>
                  <button
                    className="mb-4 p-2 bg-orange-300 text-white rounded-md"
                    onClick={handleAddCategoryClick}
                  >
                    Add Category
                  </button>
                  <div className="flex">
                    <FontAwesomeIcon
                      icon={solidIcons.faLayerGroup}
                      className="text-xl text-center mb-2 mr-2"
                    />
                    <h2 className="text-xl font-semibold mb-4">
                      Manage Categories
                    </h2>
                  </div>{" "}
                  {categoriesFetched.map((fetchedCategory) => (
                    <div
                      key={fetchedCategory._id}
                      className="p-4 border rounded-md mb-2"
                    >
                      <FontAwesomeIcon
                        icon={solidIcons[fetchedCategory.icon] || faBuilding}
                        className="text-2xl mb-2"
                      />
                      <span className="block font-semibold">
                        {fetchedCategory.name}
                      </span>
                      <span className="block text-gray-600">
                        {fetchedCategory.description}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {showAddCategoryForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-4 rounded-md w-11/12 md:w-1/2 lg:w-1/3">
            <button
              type="button"
              className="float-right text-xl"
              onClick={handleAddCategoryFormClose}
            >
              <FontAwesomeIcon icon="fa-solid fa-xmark" />
            </button>
            <h2 className="text-xl font-semibold mb-4">Add Category</h2>
            <form onSubmit={handleSubmit}>
              <label htmlFor="newCategoryName" className="block mb-2">
                Category Name:
              </label>
              <input
                type="text"
                id="newCategoryName"
                name="name"
                value={category.name}
                onChange={handleChange}
                required
                className="p-2 w-full mb-4 border rounded-md"
              />
              <label htmlFor="newCategoryDescription" className="block mb-2">
                Category Description:
              </label>
              <input
                type="text"
                id="newCategoryDescription"
                name="description"
                value={category.description}
                onChange={handleChange}
                className="p-2 w-full mb-4 border rounded-md"
              />
              <div className="relative mb-4">
                <label htmlFor="newCategoryIcon" className="block mb-2">
                  Category Icon:
                </label>
                <input
                  type="text"
                  id="newCategoryIcon"
                  value={selectedIcon !== "" ? selectedIcon : searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onFocus={() => setDropdownVisible(true)}
                  className="p-2 w-full border rounded-md"
                />
                {dropdownVisible && (
                  <div className="absolute z-10 bg-white border rounded-md mt-1 w-full max-h-64 overflow-auto">
                    {filteredIcons.map((iconName) => (
                      <div
                        key={iconName}
                        className="p-2 flex items-center cursor-pointer hover:bg-gray-100"
                        onClick={() => handleIconSelect(iconName)}
                      >
                        <FontAwesomeIcon
                          icon={solidIcons[iconName]}
                          className="mr-2"
                        />
                        <span>{iconName}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="submit"
                  className="p-2 bg-gray-800 text-white rounded-md"
                >
                  Add
                </button>
                <button
                  type="button"
                  onClick={handleAddCategoryFormClose}
                  className="p-2 bg-gray-200 rounded-md"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BusinessListing;
