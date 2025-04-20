import React, { useState,useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
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
} from "@fortawesome/free-solid-svg-icons";
import api from "../util/Util";

import img from "../images/logo-removebg.png";
import NavBar from "../components/NavBar";
import Menu from "../components/Menu";

const Notifications = () => {
  const [businesses,setBusinesses]=useState([])
  const [reports,setReports]=useState([])
  const [notificationList, setNotificationList] = useState([]);
  useEffect(()=>{
    getNotifications();
    setNotificationList([...businesses,...reports])
    
 

  },[reports,businesses])
  

 
  const getNotifications=async()=>{
    await fetchNewBusinesses();
    await fetchNewReports();
    

  }
  

 
  // useEffect(()=>{
  //   mapNotifications();
  // },[reports])






  const fetchNewBusinesses=async()=>{
    await api.get('business/fetch-new-businesses')
    .then((res)=>{
      console.log(res.data.message)
      if(res.data.success){
        console.log('these r the new businesses fetched: ',res.data.businesses)
        setBusinesses(res.data.businesses)
     
        
      }
    })
    .catch((error)=>{
      if(error){
        console.log('error in fetch new businesses: ',error.message)
      }
    })

  }

  const fetchNewReports=async()=>{
    await api.get('report/fetch-new-reports')
    .then((res)=>{
      console.log(res.data.message)
      if(res.data.success){
        console.log('these r the new reports fetched: ',res.data.reports)
        setReports(res.data.reports)
        console.log('im in fetchnew reports and ths r businesess  ',businesses)

        
      }
    })
    .catch((error)=>{
      if(error){
        console.log('error in fetch new reports: ',error.message)
      }
    })

  }



  // const mapNotifications=()=>{
    

  //   console.log('im in map notifications')
  //   console.log(reports,businesses)
  //   let fetchedNotifications=[]
  //   console.log('these are notifications', notifications)
  //   notifications.map((notifs)=>{
  //     console.log("this is noti")
  //     notifs.map((notif)=>{
  //       fetchedNotifications.push(notif)        
  //     })      
  //   })
  //   console.log("these r fetched notifications ",fetchedNotifications)
  //   // setNotifications(fetchedNotifications)
  //   setNotificationList(fetchedNotifications)
  // }
  



  // const notifications = [
  //   {
  //     id: 1,
  //     title: "New Business Registered",
  //     description: "Business XYZ has registered on the platform.",
  //     date: "2024-06-01",
  //     status: "unread",
  //   },
  //   {
  //     id: 2,
  //     title: "New Report",
  //     description: "A new report has been submitted.",
  //     date: "2024-06-02",
  //     status: "unread",
  //   },

  // ];

 

  const handleMarkAsRead = async(notification) => {
    const updatedNotifications = notificationList.map((notif) =>
      notif._id === notification._id
        ? { ...notif, status: "read" }
        : notif
    );

 

    if(notification.notif_type==="New Report"){
      const reportId=notification._id
      const status= notification.status
      await api.put('report/update-report-status',{reportId,status})
      .then((res)=>{
        console.log(res.data.message)
        if(res.data.success){
          setNotificationList(updatedNotifications);
          window.location.reload();

        }
      })
      .catch((error)=>{
        if(error){
          console.log(error.message)
        }
      })
      
    }
    else if (notification.notif_type==="New Business"){
      const businessId=notification._id
      const status= notification.status

      await api.put('business/update-business-status',{businessId,status})
      .then((res)=>{
        console.log(res.data.message)
        if(res.data.success){
          setNotificationList(updatedNotifications);
          window.location.reload();
        }
      })
      .catch((error)=>{
        if(error){
          console.log(error.message)
        }
      })
    }

    
    
  };

  const handleDelete = async(notif) => {
    const updatedNotifications = notificationList.filter(
      (notification) => notification._id !== notif._id
    );
    setNotificationList(updatedNotifications);

    if(notif.notif_type==="New Report"){
      const reportId=notif._id
      await api.delete('report/delete',{reportId})
      .then((res)=>{
        console.log(res.data.message)
        if(res.data.success){
          setNotificationList(updatedNotifications);
          window.location.reload();

        }
      })
      .catch((error)=>{
        if(error){
          console.log(error.message)
        }
      })
      
    }
    else if (notif.notif_type==="New Business"){
      const businessId=notif._id

      await api.delete('business/delete',{businessId})
      .then((res)=>{
        console.log(res.data.message)
        if(res.data.success){
          setNotificationList(updatedNotifications);
          window.location.reload();
        }
      })
      .catch((error)=>{
        if(error){
          console.log(error.message)
        }
      })
    }
  };

  return (
    <div className="notification-container flex flex-col h-screen">
     <NavBar/>
      <div className="dashboard-content flex flex-1">
        <Menu/>
        <div className="dashboard-content-right flex flex-col flex-1 p-4 bg-orange-50">
          <div className="flex m-4 ml-5 items-center">
            <FontAwesomeIcon icon={faBell} className="text-xl mr-3" />
            <h1 className="font-bold text-2xl">Notifications</h1>
          </div>
          <div className="notifications-list mt-4">
            {notificationList.map((notification) => (
           
                <div
                  key={notification._id & notification.notif_type}
                  className="notification-item p-4 border-b bg-white rounded-lg shadow mb-4 flex justify-between"
                >
                     <Link
                to={{
                  pathname: `/notifications/${notification._id}`,
                  state: { notification },
                }}

                // className="btn-view-detail p-2 bg-blue-500 text-white rounded"
              >
                  <div className="flex-col">
                    <h2 className="font-bold text-xl text-orange-500">
                      {notification.notif_type}
                    </h2>
                    <p>{notification.description}</p>
                    <p className="text-gray-500">{notification.date}</p>
                    <p
                      className={`status text-${
                        notification.status === "read" ? "green" : "red"
                      }-500 font-bold`}
                    >
                      {notification.status === "read" ? "Read" : "Unread"}
                    </p>
                  </div>
                  </Link>
                 
                    
                    {notification.status === "unread" || "pending" && (
                        <div className="actions mt-2 flex">
                        <button
                          className="btn-mark-read mr-2 p-2 bg-green-500 text-white rounded"
                          onClick={() => handleMarkAsRead(notification)}
                        >
                          <FontAwesomeIcon icon={faCheck} className="mr-1" />{" "}
                          Mark as Read
                        </button>
                         <button
                         className="btn-delete p-2 bg-red-500 text-white rounded"
                         onClick={() => handleDelete(notification)}
                       >
                         <FontAwesomeIcon icon={faTrash} className="mr-1" /> Delete
                       </button>
                     </div>
                  
                      )}
                       </div>                  
             
            ))}
            {notificationList.length === 0 && (
              <p className="text-center mt-4">No notifications found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
