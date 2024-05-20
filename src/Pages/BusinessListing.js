import React, { useEffect, useState } from 'react';
import './BusinessListing.css';
import './UserManagement.css'
import { library } from '@fortawesome/fontawesome-svg-core';
//import { fas } from '@fortawesome/free-solid-svg-icons';
import { debounce } from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { Link } from 'react-router-dom';
import { faSearch, faBell, faUser, faSignOutAlt, faBuilding, faStore, faHotel, faUtensils, faCog, faHome, faGift, faBriefcase, faCar, faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import api from '../util/Util';


const BusinessListing = () => {
  const[businesses,setBusinesses]=useState([])
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showAddCategoryForm, setShowAddCategoryForm] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryDescription, setNewCategoryDescription] = useState('');
  const [categoriesFetched,setCategoriesFetched]=useState([])
  const [searchTerm, setSearchTerm] = useState('');
  const [category,setCategory]=useState({
    name:"",
    description:"",
    icon:""
  })
  


  library.add(fas,far,fab);
const allIcons = Object.keys(fas,far,fab).filter(iconName => iconName !== 'prefix');


  useEffect(()=>{
async function getCategories(){
  await api.get('category/fetchAll')
  .then((res)=>{
    const categories_fetched=res.data.categories
    console.log(categories_fetched)
    setCategoriesFetched(categories_fetched)
  
   
  })
  .catch((err)=>{

    if(err){

      console.log('error in getCategories : ',err.messsage)
    }
  })
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

  const handleSearch = debounce((value) => {
  setSearchTerm(value);
}, 300);

const filteredIcons = allIcons.filter(iconName =>
  iconName.toLowerCase().includes(searchTerm.toLowerCase())
);

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

      <label htmlFor="newCategoryIcon">Category Icon:</label>
      <input
        type="text"
        placeholder="Search icons..."
        onChange={(e) => handleSearch(e.target.value)}
      />
      <div className="icon-list">
        {filteredIcons.map((iconName) => (
          <div
            key={iconName}
            className="icon-item"
            name="icon"
            value={iconName}
            onClick={(e) => {

              //  onSelect(iconName)
              handleChange(e.target)
            }           
            }
          >
            <span><FontAwesomeIcon icon={['fas',iconName]} /></span>
            <span><FontAwesomeIcon icon={['far', iconName ]} /></span>
            <span><FontAwesomeIcon icon={['fab', iconName ]} /></span>

            
            {/* <span>{iconName}</span> */}
          </div>
        ))}
      </div>
              
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