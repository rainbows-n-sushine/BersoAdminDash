import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Table from 'react-bootstrap/Table';
import { faHome, faChartBar, faCog, faSearch, faBell, faUser, faSignOutAlt, faEye, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import './UserManagement.css';
import api from '../util/Util';

const UserManagement = () => {
  // const [users, setUsers] = useState([
  //   { id: 1, name: 'John Doe', email: 'johndoe@example.com', role: 'Business Owner' },
  //   { id: 2, name: 'Jane Smith', email: 'janesmith@example.com', role: 'user' },
  //   { id: 3, name: 'Alice Johnson', email: 'alicejohnson@example.com', role: 'user' },
  //   { id: 4, name: 'John Doe', email: 'johndoe@example.com', role: 'Business Owner' },
  //   { id: 5, name: 'Jane Smith', email: 'janesmith@example.com', role: 'user' },
  //   { id: 6, name: 'John Doe', email: 'johndoe@example.com', role: 'Business Owner' },
  //   { id: 7, name: 'Jane Smith', email: 'janesmith@example.com', role: 'user' },
  // ]);
const [users,setUsers]=useState([])
// const [filteredUsers,setFilteredUsers]=useState([])

  useEffect(()=>{
  const fetchUsers= async ()=>{
   await api.get('user/fetch-all')
    .then((res)=>{
     console.log(res.data)
     const fetchedUsers=res.data.users
    setUsers(fetchedUsers)
    



    }).catch((err)=>{

      if(err){
        console.log('this is the error in fetch users: ',err)
      }
    })




  
  }

  fetchUsers();


  },[])




  const [searchQuery, setSearchQuery] = useState('');
  const handleUpdateUserRole = (userId, newRole) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId ? { ...user, role: newRole } : user
      )
    );
  };
  
  
  const filteredUsers = users.filter((user) =>{
     user.name && console.log('this is the user in filer ', user.name.toLowerCase().includes(searchQuery.toLowerCase()))
     if(user.name && user.name.toLowerCase().includes(searchQuery.toLowerCase()))
      return user;
     

  }
   
    );

      
  //   const handleView=async(e,id,employee)=>{
  
  //     console.log(employeeInfo)
  //     return await axios.get(`http://localhost:8081/${employee}/getOne/${id}`)
  //     .then((response)=>{
  
  //         const viewData=response.data
  //         console.log(viewData)
  
  //         setEmployeeInfo(viewData)
  //         setButtonPopup(true)
      
          
          
  //     })
  //     .catch((err)=>{
  //         if(err){console.log(err)}
  //     })
  
  
  // }
  // const handleUpdate=async(e,id,employee)=>{
  
      
  //     await axios.get(`http://localhost:8081/${employee}/getOne/${id}`)
  //     .then((response)=>{
  //         setEmployeeInfo(response.data)
  //         console.log(response.data)

  //         setUpdatePopup(true)
  //     })
  //     .catch((err)=>{
  //         if(err){
  //             console.log(err)
  //         }
  //     })
  
      
  
  // }
  // const handleDelete=async(e,id,employee)=>{
  //     console.log(id)

  //        e.preventDefault()
  // let user=""
  // await axios.get(`http://localhost:8081/${employee}/getOne/${id}`)
  // .then((res)=>{
  // user =res.data.id_tag
  // }).catch((err)=>{if(err){console.log(err)}})


  // await axios.delete(`http://localhost:8081/todo/deleteTodoEmployee/${user}`)
  // .then((res)=>{alert(res.data)})
  // .catch((err)=>{if(err){console.log(err)}})


  //  await axios.delete(`http://localhost:8081/${employee}/delete/${id}`)
  // .then((res)=>{console.log("deleted"+ res)})
  // .catch((err)=>{if(err){console.log(err)}})

  
  // }



  const handleDeleteUser = (userId) => {
    {

        setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
    }
  
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };


 

  return (
    <div>
      <div className="user-management">
        <div className="top-bar">
          <input type="text" placeholder="Search" onChange={handleSearch} />
          <FontAwesomeIcon icon={faSearch} className="icon" />
          <div className="top-bar2">
            <FontAwesomeIcon icon={faBell} className="icon" />
            <FontAwesomeIcon icon={faUser} className="icon" />
            <FontAwesomeIcon icon={faSignOutAlt} className="icon" />
          </div>
        </div>
      </div>
      <div className="user-management">
        <div className="side-menu">
          <h2>Menu</h2>
          <ul>
            <li>
              <Link to="/">
                <FontAwesomeIcon icon={faHome} className="menu-icon" /> Home
              </Link>
            </li>
            <li>
              <Link to="/UserManagement">
                <FontAwesomeIcon icon={faChartBar} className="menu-icon" /> User
              </Link>
            </li>
            <li>
              <Link to="/BusinessListing">
                <FontAwesomeIcon icon={faChartBar} className="menu-icon" /> Business Listings
              </Link>
            </li>
            <li>
              <Link to="/">
                <FontAwesomeIcon icon={faChartBar} className="menu-icon" /> Report
              </Link>
            </li>
            <li>
              <Link to="/settings">
                <FontAwesomeIcon icon={faCog} className="menu-icon" /> Settings
              </Link>
            </li>
          </ul>
        </div>
<div ><h2>List Of Users</h2></div>
        <Table>
          <thead>
            <tr>
              <th>User ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                {/* <td>{user.role}</td> */}
                <td>{user.username}</td>
                <td>
                  <div className="actions">
                    <button
                      className="btn make-admin"
                      onClick={() => handleUpdateUserRole(user._id, 'admin')}
                    >
                      <FontAwesomeIcon icon={faEdit} className="icon" /> 
                    </button>
                   
                    <button
                    className="btn delete-user"
                    onClick={() => handleDeleteUser(user._id)}
                  >
                    <FontAwesomeIcon icon={faTrash} className="icon" /> 
                  </button>
                  <Link className="btn view-profile" to={`/user/${user._id}`}>
                    <FontAwesomeIcon icon={faEye} className="icon" /> 
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  </div>
);

};

export default UserManagement;