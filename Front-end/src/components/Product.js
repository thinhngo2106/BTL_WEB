import React,{useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import './css/product.css';
import { addToCart} from '../actions/cartActions';
import { useDispatch, useSelector } from 'react-redux';


export default function Product(props) {
  const dispatch = useDispatch();
  const { product } = props;
  function numberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  // let products = this.state.products.slice(0, 5).map(item => {
  //   return <Product item={item} key={item.productName}/>
  // })

  return (
    // <div className='col-xs-12 col-sm-6 col-md-6 col-lg-3'>
      
        <div key={product.idProduct} className="product">
          <div>
            <Link to={`/product/${product.idProduct}`}>
              <img className="image" src={product.productdetails[0].image} alt={product.productName} />
            </Link>
          </div>
          
          <div className="product__info">
            <Link to={`/product/${product.idProduct}`} style={{textDecoration: 'none'}}>
              <p style={{color: 'black'}}>{product.productName}</p>
            </Link>   

            <div className="product__price">$
              <strong> {numberWithCommas(product.productPrice)} ₫</strong>
            </div>
            
            </div>
              <Link to={`/product/${product.idProduct}`} className="link">
                <button className="details" >Chi tiết</button>
              </Link>
            </div>
    // </div>
    
    
  );
}