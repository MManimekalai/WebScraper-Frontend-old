// ProductList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import './card.css';

const ProductList = ({ searchResults }) => {
  const [products, setProducts] = useState({ });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/fetch');
        const { amazonProducts, flipkartProducts, snapdealProducts } = response.data;
        const FinalProducts = [...amazonProducts, ...flipkartProducts, ...snapdealProducts];
        setProducts(FinalProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchProducts();
  }, []);

  const formatRating = (rating) => {
    const percentageMatch = rating.match(/(\d+(\.\d+)?)%/);
    if (percentageMatch) {
      const stars = (parseFloat(percentageMatch[1]) / 20).toFixed(1);
      return renderStars(stars);
    }
  
    const starsMatch = rating.match(/(\d+(\.\d+)?) out of 5 stars/);
    if (starsMatch) {
      const stars = parseFloat(starsMatch[1]).toFixed(1);
      return renderStars(stars);
    }
  
    return "Not Available";
  };

  const renderStars = (rating) => {
    const starArray = [];
    for (let i = 0; i < rating; i++) {
      starArray.push(<FontAwesomeIcon key={i} icon={faStar} style={{ color: '#f1c40f' }} />);
    }
    return starArray;
  };

  const productsToDisplay = searchResults.length > 0 ? searchResults : products;

  return (
    <div>
      <h1 style={{ textAlign: 'center', color: '#3498db', marginBottom: '20px' }}>Discover Amazing Products</h1>
      {productsToDisplay.length > 0 && (
        <div className="card-container">
          {productsToDisplay.map((product) => (
            <Card key={product._id} className="card">
              <Card.Img variant="top" src={product.image} alt={product.title} className="img-fluid" />
              <Card.Body className='card-body'>
                <Card.Text className='card-title'>{product.title}</Card.Text>
                <Card.Text>
                  <strong>Price:</strong> {product.price}
                  <br />
                  <strong>Final Price with Offer:</strong> {product.finalPrice}
                  <br />
                  <strong>Rating:</strong> {formatRating(product.rating)}
                </Card.Text>
              </Card.Body>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
