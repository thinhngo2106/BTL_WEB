import React from 'react';
import { Link } from 'react-router-dom';
import './css/product.css'

export default function Product(props) {
  const { product } = props;
  return (
    <div key={product.idProduct} className="product">
      <Link to={`/product/${product.idProduct}`}>
        <img className="image" src={product.productdetail.image} alt={product.productName} />
      </Link>
      <div className="product__info">
        <Link to={`/product/${product.idProduct}`}>
          <p style={{color: 'black'}}>{product.productName}</p>
        </Link>
        <div className="product__price">$
        <strong>{product.productPrice}</strong></div>
      </div>
      <button>Thêm vào giỏ hàng</button>
    </div>
  );
}