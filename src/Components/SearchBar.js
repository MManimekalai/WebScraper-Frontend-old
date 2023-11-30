import React, { useState } from 'react';
import { Navbar, Container, FormControl, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate()

  const handleSearch = () => {
    if (searchTerm.length >= 3) {
      onSearch(searchTerm);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch();
  };

  const handleNavigate = () => {
    navigate('/dashboard')
  }

  return (
    <>
    <Navbar bg="light" expand="lg" fixed='top'>
      <Container>
        <div onClick={handleNavigate} style={{ cursor: 'pointer' }}><Navbar.Brand >Web Scraper</Navbar.Brand></div>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-center"> {/* Add justify-content-center class here */}
          <form onSubmit={handleSubmit} className="d-flex"> {/* Add d-flex class to make it a flex container */}
            <FormControl
              type="text"
              placeholder="Search for products..."
              className="mr-sm-2"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: '600px', marginRight: '8px' }} 
            />
            
            <Button variant="outline-success" type="submit" onClick={handleSearch}>
              Search
            </Button>
          </form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
  );
};

export default SearchBar;