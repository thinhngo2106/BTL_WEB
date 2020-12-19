import React, {useEffect, useState} from 'react';
import './css/productScreen.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { detailsProduct } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { addToCart } from '../actions/cartActions';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheckCircle, faShoppingCart} from '@fortawesome/free-solid-svg-icons'



export default function ProductScreen(props) {
    const dispatch = useDispatch();
    const productId = props.match.params.id;
    const productDetails = useSelector((state) => state.productDetails);
    const { loading, error, product } = productDetails;
    
    const [qty, setQty] = useState(1);
    const [size, setSize] = useState(1);
    const incNum = () => {
        if (qty < product.quantityInStock){
        setQty(qty+1);
        }
        else {
            setQty(product.quantityInStock);
        }

    };
    
    const decNum = () => {
        if (qty > 1) {
        setQty(qty-1);
        }
        else {
        setQty(1);
        }
    };


    useEffect(() => {
      dispatch(detailsProduct(productId));
    }, [dispatch, productId]);

    const addToCartHandler = () => {
        dispatch(addToCart(productId,qty,size));
        props.history.push(`/cart/${productId}?qty=${qty}?size=${size}`);
        
    };
    function numberWithCommas(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }



    // const imageMagnifier = (imgID) => {
    //     let img = document.getElementById(imgID)	
    //     let lens = document.getElementById('lens')

	//     lens.style.backgroundImage = `url( ${img.src} )`

	//     let ratio = 3

	//     lens.style.backgroundSize = (img.width * ratio) + 'px ' + (img.height * ratio) + 'px';
    // }

    return (
      <div>
        <p/>
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
        <div className="col-lg-9 col-md-12 col-sm-12 col-xs-12">
            <div className="row-product">
                {/* <div className="product-detail-left product-images col-xs-12 col-sm-6 col-md-5 col-lg-5"> */}
                <div className="product-detail-left product-images col-xs-12 col-sm-5 col-md-5 col-lg-5">
                    {/* <div className="lens"/> */}
                    <img className="medium" src={product.productdetails[0].image} alt={product.productName}/>
                    {/* <button
                        onMouseEnter={(imageMagnifier)}
                        // onMouseLeave={()}
                    ></button> */}
                </div>

                {/* <div className = "col-xs-12 col-sm-6 col-md-7 col-lg-7 details-pro"> */}
                <div className = "col-xs-12 col-sm-6 col-md-6 col-lg-6 details-pro">

                    <h1 className="titleName">
                        {product.productName}
                    </h1>

                    <div >
                        {product.quantityInStock > 0 ?(
                            <span className="productStatus"> Tình trạng: Còn hàng </span>    
                        ) : (
                        <span className="productStatus"> Tình trạng: Hết hàng </span>
                        )}
                        <p/>   
                    </div>

                    <div className="price-box">
                        <span className="productPrice">
                            {numberWithCommas(product.productPrice) } ₫
                        </span>
                        <p/>
                    </div>

                    <div className="product-des">
                        <span>
                            {product.productDescription}
                            <p/>                                
                        </span>
                    </div>
                    
                    <div className="product-policy">
                        <div className="product-policy-content">
                                <FontAwesomeIcon icon={faCheckCircle} className="d-inline-block icon"/>
                                <p className="d-inline-block"> &nbsp; Freeship cho đơn hàng từ 2.000.000đ</p> 
                        </div>
                        <div className="product-policy-content">
                                <FontAwesomeIcon icon={faCheckCircle} className="d-inline-block icon"/>
                                <p className="d-inline-block"> &nbsp; Bảo hành chính hãng 1 tháng với giày dép</p>
                        </div>
                        <div className="product-policy-content">
                                <FontAwesomeIcon icon={faCheckCircle} className="d-inline-block icon"/>
                                <p className="d-inline-block"> &nbsp; Freeship cho đơn hàng từ 600k ( tối đa 30k )</p> 
                        </div>
                    </div>
                    <div>
                        <p/>   
                        Kích thước: &nbsp;
                        <select className="item-sizes" 
                        value={size}
                        onChange={(e) => setSize(e.target.value)}
                            >
                                {product.productsizes.map((x)  => (
                                  <option key={x.idSize} value={x.idSize}>
                                      {x.productSize}
                                  </option>
                                )
                              )}
                                </select>
                        <p/>         
                    </div>

                    <div>
                        <div className="quantity-button"> Số lượng: &nbsp;
                            <button onClick={decNum} className="dec-Button">  <RemoveIcon/>  </button>
                            <input className="input" type="text" value={qty} onChange={e => setQty(e.target.value)} />
                            <button onClick={incNum} className="inc-Button" > <AddIcon/> </button>
                        </div>

                        <p/> 

                        {product.quantityInStock > 0 ?(
                            <button onClick={addToCartHandler} className="addtocart">
                                Thêm vào giỏ hàng
                            </button>
                            

                        ) : (
                            <button className="x-cart">
                            Không thể thêm vào giỏ hàng
                        </button>
                        )  
                        }
                        <p/>     
                    </div>
                    
                </div>

                <div>

                </div>

            </div>
        </div>
        )}
    </div>
    );
}