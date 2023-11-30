import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from './Components/SearchBar';
import ProductList from './Components/ProductList';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import API_BASE_URL from './config';

const Dashboard = () => {

  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');


  const handleSearch = async (searchTerm) => {
    //console.log("searchTerm", searchTerm)
    try {
      const response = await axios.get(`${API_BASE_URL}/api/search?term=${searchTerm}`);
      setSearchResults(response.data);
      //console.log("searchResults", searchResults)
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

 
  return (
    <div className="Dashboard">
      <SearchBar onSearch={handleSearch} />
      <ProductList searchResults={searchResults} />
    </div>
  );
};

export default Dashboard;
