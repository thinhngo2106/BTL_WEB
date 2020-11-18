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



export default function ProductScreen(props) {
    const dispatch = useDispatch();
    const productId = props.match.params.id;
    const productDetails = useSelector((state) => state.productDetails);
    const { loading, error, product } = productDetails;
    
    const [qty, setQty] = useState(1);
    const incNum = () => {
        if (qty < product.countInStock){
        setQty(qty+1);
        }
        else {
            setQty(product.countInStock);
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
        props.history.push(`/cart/${productId}?qty=${qty}`);
    };


    return (
      <div>
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
        <div className="col-lg-9 col-md-12 col-sm-12 col-xs-12">
            <div className="row">
                <div className="product-detail-left product-images col-xs-12 col-sm-6 col-md-5 col-lg-5">
                    <img className="medium" src={product.productdetail.image} alt={product.productName}/>
                </div>
                <div className = "col-xs-12 col-sm-6 col-md-7 col-lg-7 details-pro">
                            <h1 className="titleName">
                                {product.productName}
                            </h1>

                            <div >
                                {product.countInStock > 0 ?(
                                    <span className="productStatus">    Tình trạng: Còn hàng </span>    
                                ) : (
                                    <span className="productStatus"> Tình trạng: Hết hàng </span>
                                )}
                            </div>
                            <div className="product-des">
                                <span>
                                    {product.productdetail.productDescription}                                
                                </span>
                            </div>
                        <div className="price-box">
                            <span className="productPrice">
                                {product.productPrice}
                            </span>
                        </div>
                    <div>
                        <div>
                            <button onClick={decNum} className="dec-Button">  <RemoveIcon/>  </button>
                            <input className="input" type="text" value={qty} onChange={e => setQty(e.target.value)} />
                            <button onClick={incNum} className="inc-Button" > <AddIcon/> </button>
                        </div>


                        <button onClick={addToCartHandler} className="primary block">
                            Thêm vào giỏ hàng
                        </button>
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