import React,{useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import './css/product.css';
import { addToCart} from '../actions/cartActions';
import { useDispatch, useSelector } from 'react-redux';


export default function Product(props) {
  const dispatch = useDispatch();
  const { product } = props;
  const addToCartHandler = () => {
    dispatch(addToCart(product.idProduct, 1));
  };

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
      <button onClick={addToCartHandler} className="primary block">Thêm vào giỏ hàng</button>
    </div>
  );
}