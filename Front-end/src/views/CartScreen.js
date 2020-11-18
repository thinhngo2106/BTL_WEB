import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import MessageBox from '../components/MessageBox';
import { addToCart, removeFromCart } from '../actions/cartActions';
import './css/cartScreen.css'
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
        <div className="row top">
            <div className="col-2">
                <h2>Giỏ hàng</h2>
                {cartItems.length ===0 ? <MessageBox> Giỏ hàng đang trống
                    <Link to ="/">Quay về trang chủ</Link>
                </MessageBox>
                : (
                    <div>
                        {cartItems.map((item) => (
                            <div className="row">
                                <div>
                                    <img src={item.image}
                                        alt={item.name} className="small"></img>
                                </div> 
                                <div>
                                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                                </div>
                                <div>
                                    <select
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
                                <div>${item.price}</div>
                                <div>
                                    <button
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