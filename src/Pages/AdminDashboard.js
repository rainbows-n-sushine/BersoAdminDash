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

import img from "../images/logo-removebg.png";
import NavBar from "../components/NavBar";
import api from "../util/Util";
import Menu from "../components/Menu";
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const AdminDashboard = () => {
  const chartRef = useRef(null);

 const [categoriesCount, setCategoriesCount] = useState(0);
 const [listingsCount, setListingsCount] = useState(0);
 const [claimedListingsCount, setClaimedListingsCount] = useState(0);
 const [monthlyUsersData, setMonthlyUsersData] = useState([]);

//  useEffect(() => {
//    async function fetchData() {
//      try {
//        const categoriesRes = await fetch("/category/fetchAll");
//        const categoriesData = await categoriesRes.json();

//        const listingsRes = await fetch("/business/fetch-all");
//        const listingsData = await listingsRes.json();

//       //  const claimedListingsRes = await fetch("/business/fetch-claimed"); // Assuming this endpoint exists
//       //  const claimedListingsData = await claimedListingsRes.json();

//        const monthlyUsersRes = await fetch("/api/users/monthly"); // Assuming this endpoint exists
//        const monthlyUsersData = await monthlyUsersRes.json();

//        setCategoriesCount(categoriesData.categories.length);
//        setListingsCount(listingsData.businesses.length);
//       //  setClaimedListingsCount(claimedListingsData.claimed.length); // Assuming the response contains a `claimed` array
//        setMonthlyUsersData(monthlyUsersData.dataPoints); // Adjust according to actual data structure
//      } catch (error) {
//        console.error("Error fetching data", error);
//      }
//    }

//    fetchData();
//  }, []);

 useEffect(() => {
   if (chartRef.current) {
     chartRef.current.render();
   }
 }, [monthlyUsersData]);
useEffect(()=>{
  fetchCategoriesCount()
  fetchBusinessesCount()
  fetchMonthlyUsers()
},[])


const fetchCategoriesCount=async()=>{
  console.log("im in categories count")
  await api.get('category/fetchAll')
  .then((res)=>{
    const data=res.data
    if(data.success){
      const categories=data.categories.length
      setCategoriesCount(categories)
      console.log("this is categories count: ",categories)
    }else{
      console.log(data.message)
    }

    
  })
  .catch((error)=>{
   if(error){
    console.log('this is the error in fetch categories in admin dashbooard: ',error.message)
   }

  })
}

const fetchBusinessesCount=async()=>{
  await api.get('business/fetch-all')
  .then((res)=>{
    const data=res.data
    if(data.success){
      const businesses=data.businesses.length
      setListingsCount(businesses)
    }else{
      console.log(data.message)
    }

    
  })
  .catch((error)=>{
   if(error){
    console.log('this is the error in fetch businesses in admin dashbooard: ',error.message)
   }

  })
}


const fetchMonthlyUsers=async()=>{
  await api.get('user/fetch-monthly-users')
  .then((res)=>{
    const data=res.data
    if(data.success){
      const dataPoints=data.dataPoints
      setMonthlyUsersData(dataPoints)
      console.log("this is the monthly users data: " ,dataPoints)
    }else{
      console.log(data.message)
    }

    
  })
  .catch((error)=>{
   if(error){
    console.log('this is the error in fetch businesses in admin dashbooard: ',error.message)
   }

  })
}

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
     <NavBar/>
      <div className="dashboard-content flex flex-1">
        <Menu/>
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
