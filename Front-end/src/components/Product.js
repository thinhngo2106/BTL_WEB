import React from 'react';
import { Link } from 'react-router-dom';
import './css/product.css'

export default function Product(props) {
  const { product } = props;
  return (
    <div key={product._id} className="product">
      <Link to={`/product/${product._id}`}>
        <img className="image" src={product.image} alt={product.name} />
      </Link>
      <div className="product__info">
        <Link to={`/product/${product._id}`}>
          <p>{product.name}</p>
        </Link>
        <div className="product__price">$
        <strong>{product.price}</strong></div>
      </div>
      <button>Thêm vào giỏ hàng</button>
    </div>
  );
}