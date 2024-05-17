import React, { useEffect, useState } from 'react';
import './BusinessListing.css';
import './UserManagement.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { faSearch, faBell, faUser, faSignOutAlt, faBuilding, faStore, faHotel, faUtensils, faCog, faHome, faGift, faBriefcase, faCar, faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import api from '../util/Util';
// Sample data for businesses and categories
// const businesses = [
//   { id: 1, name: 'Business A', category: 'Category 1', icon: faBuilding },
//   { id: 2, name: 'Business B', category: 'Category 2', icon: faStore },
//   { id: 3, name: 'Business C', category: 'Category 1', icon: faHotel },
//   { id: 4, name: 'Business D', category: 'Category 2', icon: faUtensils },
//   { id: 5, name: 'Business E', category: 'Category 3', icon: faCog },
//   { id: 6, name: 'Business F', category: 'Category 2', icon: faHome },
//   { id: 7, name: 'Business G', category: 'Category 3', icon: faGift },
//   { id: 8, name: 'Business H', category: 'Category 1', icon: faBriefcase },
//   { id: 9, name: 'Business I', category: 'Category 2', icon: faCar },
//   { id: 10, name: 'Business J', category: 'Category 3', icon: faShoppingBag },
// ];





// business_name
// email
// phone
// category
// website
// location
// address
// business_days
// opening_hours
// average_price
// description


const BusinessListing = () => {
  const[businesses,setBusinesses]=useState([])
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showAddCategoryForm, setShowAddCategoryForm] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryDescription, setNewCategoryDescription] = useState('');
  const [categoriesFetched,setCategoriesFetched]=useState([])
  const [category,setCategory]=useState({
    name:"",
    description:""
  })

  useEffect(()=>{
async function getCategories(){
  await api.get('category/fetchAll')
  .then((res)=>{
    const categories_fetched=res.data.category
    console.log(categories_fetched)
    setCategoriesFetched(categories_fetched)
    
  },[])
}

async function fetchBusinesses(){

  await api.get('business/fetch-all')
  .then((res)=>{
console.log(res.data)
const data=res.data.businesses
setBusinesses(data)

  }).catch((err)=>{
    if(err){
      console.log('error in fetch businesses :',err)
    }

  })
}
 fetchBusinesses();


getCategories();
  },[])
          


  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleAddCategoryClick = () => {
    setShowAddCategoryForm(true);
  };

  // const handleAddCategoryFormSubmit = (e) => {
  //   e.preventDefault();
  //   // Add logic to handle form submission (e.g., sending the category name to the server)
  //   console.log('New Category Name:', newCategoryName);
  //   // Reset the form
  //   setNewCategoryName('');
  //   // Hide the form
  //   setShowAddCategoryForm(false);
  // };

  // const handleAddCategoryFormClose = () => {
  //   setShowAddCategoryForm(false);
  // };
  const handleSubmit = async(e) => {
    e.preventDefault();
    // Add logic to handle form submission (e.g., sending the category name to the server)
    console.log('New Category Name:', category.name, "\nDescription: ",category.description);
    await api.post('category/register',{category})
    .then((res)=>{
      console.log(res.data)
      window.location.reload()
    }).catch((err)=>{
      if(err){console.log(err)}
    })

    // Resets the form
    setNewCategoryName('');
    // Hides the form
    setShowAddCategoryForm(false);
  };

  const handleAddCategoryFormClose = () => {
    setShowAddCategoryForm(false);
  };

  // const handleNewCategoryNameChange = (e) => {
  //   setNewCategoryName(e.target.value);
  // };

  const handleChange = (e) => {
    console.log(e.value)
    const {name,value}=e
    setCategory({...category,[name]:value})
  };

  const filteredBusinesses = selectedCategory
    ? businesses.filter((business) =>{
// let filterCategory=[]
for(var i=0;i<business.category.length;i++){
  console.log('this is the selected Category',selectedCategory)
console.log("this is the business category: ",business.category[i])
        if(business.category[i] === selectedCategory){
// filterCategory.push(business.category[i])
return true

        }

      }
      return false

    } 
      
     ) 
    : businesses;

  const categories = [...new Set(businesses.map((business) => business.category))];

  return (
    <div>
      <div className='user-management'>
        <div className="top-bar">
          <input type="text" placeholder="Search" />
          <FontAwesomeIcon icon={faSearch} className="icon" />
          <div className="top-bar2">
            <FontAwesomeIcon icon={faBell} className="icon" />
            <FontAwesomeIcon icon={faUser} className="icon" />
            <FontAwesomeIcon icon={faSignOutAlt} className="icon" />
          </div>
        </div>
      </div>
      <div className="business-listings">
        <div className="categories">
          <div className='user-management'>
            <h2>Categories</h2>
           
          </div>
          <ul>
            <li
              className={selectedCategory === null ? 'active' : ''}
              onClick={() => handleCategoryClick(null)}
            >
              All
            </li>
            {categoriesFetched.map((fetchedCategory) => (
              <li
                key={fetchedCategory._id}
                className={selectedCategory === fetchedCategory._id ? 'active' : ''}
                onClick={() => handleCategoryClick(fetchedCategory._id)}
              >
                {fetchedCategory.name}
              </li>
            ))}
          </ul>
        </div>
        <div className="businesses">
        <button className="add-category-button" onClick={handleAddCategoryClick}>
              Add Categories
            </button>
          <h2>Businesses</h2>
          {filteredBusinesses.length > 0 ? (
            <div className="business-grid">
              {filteredBusinesses.map((business) => (
                <div key={business._id} className="business-card">
                  <FontAwesomeIcon icon={business.icon} className="icon" style={{ size: "lg" }} />
                  <span className="business-name">{business.business_name}</span>
                </div>
              ))}
            </div>
            
          ) : (
            <p>No businesses found.</p>
          )}
        </div>
        {showAddCategoryForm && (
        <div className="add-category-form-overlay">
          <div className="add-category-form-container">
            <h2>Add Category</h2>
            <form className="add-category-form" onSubmit={handleSubmit}>
              <label htmlFor="newCategoryName">Category Name:</label>
              <input
                type="text"
                id="newCategoryName"
                name="name"
                preValue={category.name}
                onChange={(e)=>handleChange(e.target)}
                required
              />
              <label htmlFor="newCategoryDescription">Category Description:</label>
              <input
                type="text"
                name="description"
                id="newCategoryDescription"
                preValue={category.description}
                onChange={(e)=>handleChange(e.target)}
              />
              <div className="add-category-form-buttons">
                <button type="submit">Add</button>
                <button type="button" onClick={handleAddCategoryFormClose}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default BusinessListing;