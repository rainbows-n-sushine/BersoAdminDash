import React, { useState, useEffect } from "react";
import { useParams, Link , useLocation, useNavigate} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import api from "../util/Util"
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
  faPerson,
} from "@fortawesome/free-solid-svg-icons";

import img from "../images/logo-removebg.png";
import NavBar from "../components/NavBar";
import Menu from "../components/Menu";

const NotificationDetail = ({route}) => {
   // Assuming the notification ID is passed via URL params
  // const {notification}=route.useParams()
  const [isReport,setIsReport]=useState(false)
  const [businessId,setBusinessId]=useState('')
  const [reportId,setReportId]=useState('')
  const [userId,setUserId]=useState('')
  const [businessOwnerId,setBusinessOwnerId]=useState('')
  const [notification,setNotification]=useState({})
  const {state}=useLocation()
  const navigate=useNavigate()  
  const [notificationDetail, setNotificationDetail] = useState(notification);


  

  




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

  const getNotifDetails=async()=>{
    // setNotificationDetail(notification)

    if (!state || !state.notification) {
      console.log('i am waiting')
    } else {
      setNotification(state.notification);
      setNotificationDetail(state.notification)
    if(state.notification){
      console.log('this is notification ',state.notification.notif_type)
      

    if(state.notification.notif_type==="New Report"){
      setIsReport(true)
      setReportId(state.notification._id)
      setUserId(state.notification.user) 

    }else{
      setIsReport(false)
      setBusinessId(state.notification._id)
      setBusinessOwnerId(state.notification.business_owner)
       

    }

  }}}

  useEffect(() => {

    getNotifDetails()
 
  }, [notification]);







  const handleConfirmFix= async() => {
    await api.post(`report/confirm-fix`,{reportId,businessOwnerId})
    .then((res)=>{
      const data=res.data
      alert(data.message)
    })
    .catch((error)=>{
      if(error){
        console.log('this si the error in confirm fix: ',error.message)
      }
    })
  };


  const handleDeleteReport = async() => {
    await api.delete(`report/delete-report`,{reportId,userId})
    .then((res)=>{
      const data=res.data
      alert(data.message)
    })
    .catch((error)=>{
      if(error){
        console.log('this si the error in delete report: ',error.message)
      }
    })
  };

  const handleVerifyBusiness = async() => {
    await api.post(`business/verify-business`,{businessId,businessOwnerId})
    .then((res)=>{
      const data=res.data
      alert(data.message)
    })
    .catch((error)=>{
      if(error){
        console.log('this si the error in verify business: ',error.message)
      }
    })
  };

  const handleDeleteBusiness = async() => {
    await api.delete(`business/delete-business`,{businessId,businessOwnerId})
    .then((res)=>{
      const data=res.data
      alert(data.message)
    })
    .catch((error)=>{
      if(error){
        console.log('this si the error in delete business: ',error.message)
      }
    })
  };

  if (!notificationDetail) {
    return <div>Loading...</div>;
  }

  return (
    <div className="notification-detail-container flex flex-col h-screen">
      <NavBar/>
      <div className="dashboard-content flex flex-1">
      <Menu/>
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
          {!isReport && (
            <div className="notification-detail bg-white p-4 rounded-lg shadow">
              <h2 className="font-bold text-xl text-orange-500">
                {notificationDetail.notif_type}
              </h2>
              <p className="mt-2">{notificationDetail.description}</p>
              <p className="text-gray-500">{notificationDetail.date}</p>
              <div className="business-details mt-4 p-8">
                <h3 className="font-bold text-xl">Business Details</h3>
                <p className=" mt-3 p-2">
                  <FontAwesomeIcon icon={faBuilding} />{" "}
                  <strong className="ml-2">Name:</strong>{" "}
                  {notificationDetail.business_name}
                </p>
                <p className=" mt-3 p-2">
                  <FontAwesomeIcon icon={faBuilding} />{" "}
                  <strong className="ml-2">Address:</strong>{" "}
                  {notificationDetail.address}
                </p>
                <p className=" mt-3 p-2">
                  <FontAwesomeIcon icon={faEnvelope} />{" "}
                  <strong className="ml-2">Email:</strong>{" "}
                  {notificationDetail.email}
                </p>
                <p className=" mt-3 p-2">
                  <FontAwesomeIcon icon={faPhone} />{" "}
                  <strong className=" ml-2">Phone:</strong>{" "}
                  {notificationDetail.phone}
                </p>
                <p className=" mt-3 p-2">
                  <FontAwesomeIcon icon={faUser} />{" "}
                  <strong className="ml-2">Registered By:</strong>{" "}
                  {notificationDetail.user}
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
          )}

          {isReport && (
            <div className="notification-detail bg-white p-4 rounded-lg shadow">
              <h2 className="font-bold text-xl text-orange-500">
                {notificationDetail.notif_type}
              </h2>
              <p className="mt-2">{notificationDetail.description}</p>
              <p className="text-gray-500">{notificationDetail.date}</p>
              <div className="business-details mt-4 p-8">
                <h3 className="font-bold text-xl">Report Details</h3>
                <p className=" mt-3 p-2">
                  <FontAwesomeIcon icon={faPerson} />{" "}
                  <strong className="ml-2">Reported By:</strong>{" "}
                  {notificationDetail.name}
                </p>
                {/* <p className=" mt-3 p-2">
              <FontAwesomeIcon icon={faBuilding} />{" "}
              <strong className="ml-2">Email Address:</strong>{" "}
              {notificationDetail.email}
            </p> */}
                <p className=" mt-3 p-2">
                  <FontAwesomeIcon icon={faEnvelope} />{" "}
                  <strong className="ml-2">Email:</strong>{" "}
                  {notificationDetail.email}
                </p>
                <p className=" mt-3 p-2">
                  <FontAwesomeIcon icon={faPhone} />{" "}
                  <strong className=" ml-2">Status:</strong>{" "}
                  {notificationDetail.status}
                </p>
                <p className=" mt-3 p-2">
                  <FontAwesomeIcon icon={faUser} />{" "}
                  <strong className="ml-2">Registered By:</strong>{" "}
                  {notificationDetail.user}
                </p>
              </div>
              <div className="actions mt-4 flex">
                <button
                  className="btn-verify mr-2 p-2 bg-green-500 text-white rounded"
                  onClick={handleConfirmFix}
                >
                  <FontAwesomeIcon icon={faCheck} className="mr-1" /> Confirm
                  Fix
                </button>
                <button
                  className="btn-delete p-2 bg-red-500 text-white rounded"
                  onClick={handleDeleteReport}
                >
                  <FontAwesomeIcon icon={faTrash} className="mr-1" /> Delete
                  Report
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationDetail;
