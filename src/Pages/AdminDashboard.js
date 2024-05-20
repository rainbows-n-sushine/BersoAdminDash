import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faChartBar, faCog, faSearch, faBell, faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import './UserManagement';
import './AdminDashboard.css'
import CanvasJSReact from '@canvasjs/react-charts';

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
		text: "Monthly Users - 2024"
	  },
	  axisX: {
		valueFormatString: "MMM"
	  },
	  axisY: {
		title: "Number of users",
		prefix: ""
	  },
	  data: [{
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
		  { x: new Date(2017, 11), y: 38400 }
		]
	  }]
	};
  
    return (
      <div>
      <div className='user-management'>
      <div className="top-bar">
      <input type="text" placeholder="Search" />
      <FontAwesomeIcon icon={faSearch} className="icon" />
      <div className="top-bar2">
        
        <FontAwesomeIcon icon={faBell} className="icon" />
        <FontAwesomeIcon icon={faUser} className="icon" />
        <FontAwesomeIcon icon={faSignOutAlt } className="icon" />
      </div>
    </div>
    </div>
      <div className='user-management'>
        
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
			<li>
              <Link to="/">
                <FontAwesomeIcon icon={faChartBar} className="menu-icon" /> Report
              </Link>
            </li>
              <Link to="/settings">
                <FontAwesomeIcon icon={faCog} className="menu-icon" /> Settings
              </Link>
            </li>
          </ul>
        </div>

		<div className="overview">
  <h2>Overview</h2>
  <div className="overview-item">
    <span className="overview-label">Active listing </span>
    <div className="progress-bar active-listing">
      <div className="progress-bar-fill" ></div>
    </div>
    <span className="overview-percentage active-listing">95%</span>
  </div>
  <div className="overview-item">
    <span className="overview-label">Claimed listing </span>
    <div className="progress-bar claimed-listing">
      <div className="progress-bar-fill" ></div>
    </div>
    <span className="overview-percentage claimed-listing">75%</span>
  </div>
  <div className="overview-item">
    <span className="overview-label">Reported listing </span>
    <div className="progress-bar reported-listing">
      <div className="progress-bar-fill" ></div>
    </div>
    <span className="overview-percentage reported-listing">55%</span>
  </div>
  <div className="overview-item">
    <span className="overview-label">Pending listing </span>
    <div className="progress-bar pending-listing">
      <div className="progress-bar-fill" ></div>
    </div>
    <span className="overview-percentage pending-listing">25%</span>
  </div>
</div>

<div className="graph-container">
<CanvasJSChart options={options} onRef={(ref) => (chartRef.current = ref)} />
</div>
       
        <div className="side-component">
          <Link>
      <div className="count-item">
    <div className="count">50+</div>
    <div className="label">Total Categories</div>
  </div>
  </Link>
  <Link>
  <div className="count-item">
    <div className="count">100+</div>
    <div className="label">Total Listings</div>
  </div>
  </Link>
  <Link>
  <div className="count-item">
    <div className="count">20+</div>
    <div className="label">Claimed Listings</div>
  </div>
  </Link>
  <Link>
  <div className="count-item">
    <div className="count">10+</div>
    <div className="label">Reported Listings</div>
  </div>
  </Link>
</div>
<p></p>
<br/>




        </div>
        </div> 
    );
  }


export default AdminDashboard;    