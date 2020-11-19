import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import MessageBox from '../components/MessageBox';
import { addToCart, removeFromCart } from '../actions/cartActions';
import './css/cartScreen.css';
import 'bootstrap/dist/css/bootstrap.min.css';
export default function CartScreen(props) {
    const productId = props.match.params.id;
    const qty = props.location.search
    ? Number(props.location.search.split('=')[1])
    : 1;

    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;
    const dispatch = useDispatch();
    useEffect(() => {
      if (productId) {
        console.log(productId);
        dispatch(addToCart(productId, qty));
      }
    }, [dispatch, productId, qty]); 
    const removeFromCartHandler = (id) => {
        // delete action
        dispatch(removeFromCart(id));
    };
    

    return (
        <div className="row cart col-md-11">
            <div className="col-md-12">
                <h2>Giỏ hàng</h2>
                {cartItems.length ===0 ? <MessageBox> Giỏ hàng đang trống
                    <Link to ="/">Quay về trang chủ</Link>
                </MessageBox>
                : (
                    <div className="cart-items col-sm-12">
                        {cartItems.map((item) => (
                            <div className="row cart-item col-sm-12 col-md-9" key={item.id}>
                                <div className="col col-sm-2 col-md-2">
                                    <img src={item.image}
                                        alt={item.name} className="small"></img>
                                </div> 
                                <div className="col col-sm-4 col-md-4">
                                    <Link to={`/product/${item.product}`}>
                                        <span className="item-attribute-name">{item.name} </span></Link>
                                </div>
                                <div className="col col-sm-1 col-md-2">
                                    <select className="item-quantity"
                                        value={item.qty}
                                        onChange={(e) =>
                                            dispatch(
                                            addToCart(item.product, Number(e.target.value))
                                            )
                                        }
                                    >
                                    {[...Array(item.countInStock).keys()].map((x) => (
                                        <option key={x + 1} value={x + 1}>
                                        {x + 1}
                                        </option>
                                    ))}
                                    </select>
                                </div>
                                <div className="col col-sm-1 col-md-2">
                                    <span className="item-attribute">${item.price} </span></div>
                                <div className="col col-sm-2 col-md-2">
                                    <button
                                    className="remove-item"
                                    type="button"
                                    onClick={() => removeFromCartHandler(item.product)}
                                    >
                                    Delete
                                    </button>
                                </div>
                            </div>
                        ))}

                    </div>
                )
                }
            </div>

        </div>
    );



}