import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import MessageBox from '../components/MessageBox';
import { addToCart, removeFromCart } from '../actions/cartActions';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import './css/cartScreen.css';
import 'bootstrap/dist/css/bootstrap.min.css';


export default function CartScreen(props) {
    const productId = props.match.params.id;
    const qty = props.location.search
    ? Number(props.location.search.split('?')[1].split('=')[1])
    : 1;
    const idsize =  props.location.search
    ? Number(props.location.search.split('?')[2].split('=')[1])
    : 1;
    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;
    const dispatch = useDispatch();
    useEffect(() => {
      if (productId) {
        dispatch(addToCart(productId, qty,idsize));
      }
    }, [dispatch, productId, qty,idsize]); 
    const removeFromCartHandler = (id) => {
        // delete action
        dispatch(removeFromCart(id));
    };
    const checkoutHandler = () => {
        props.history.push('/signin?redirect=shipping');
      };
  

    return (
        <div className="cart">
            <div  >
                <br/>
                <h2>Giỏ hàng</h2>
                    {cartItems.length ===0 ?( 
                    <div className="cart-empty">
                    <MessageBox className="messagebox"> <div className="message-empty">Giỏ hàng đang trống</div>
                    <div className="message-empty">  
                        <Link to ="/">Quay về trang chủ</Link>
                    </div>
                    </MessageBox>
                    </div>)
                    : (
                        <div class="contain">
                            <div class="container-table">
                                <div class="wrap-table">
                                    <br/>

                                    <table className="cart-table">
                                        <thead className="cart-head">
                                            <tr>
                                            <th className="column1"><input type="checkbox"/></th>
                                            <th className="column2">Ảnh</th>
                                            <th className="column3">Tên sản phẩm</th>
                                            <th className="column4">Kích cỡ</th>
                                            <th className="column5">Giá tiền</th>
                                            <th className="column6">Số lượng</th>
                                            <th className="column7">Thành tiền</th>
                                            <th className="column8"></th>
                                            <th></th>
                                            </tr>
                                        </thead>

                                        <tbody className="cart-items">
                                            {cartItems.map((item) => (
                                            <tr>
                                            <td className="column1">
                                                <input type="checkbox"/>
                                            </td>

                                            <td className="column2">
                                                <Link to={`/product/${item.product}`}>
                                                    <img src={item.image} alt={item.name} className="small"></img>
                                                </Link>
                                            </td>

                                            <td className="column3">
                                                <Link to={`/product/${item.product}`}  style={{color: 'black'}}>
                                                    <span className="item-attribute-name">{item.name}</span>
                                                </Link>
                                            </td>

                                            <td className="column4">
                                                <span className="item-attribute-name">{item.size}</span>
                                            </td>

                                            <td className="column5">
                                                <span className="item-attribute">{item.price}  ₫ </span>
                                            </td>

                                            <td className="column6">
                                                <select className="item-quantity"
                                                    value={item.qty}
                                                    onChange={(e) =>
                                                        dispatch(
                                                        addToCart(item.product, Number(e.target.value), idsize)
                                                        )
                                                    }
                                                >
                                                {
                                                [...Array(item.countInStock).keys()].map((x) => (
                                                    <option key={x + 1} value={x + 1}>
                                                    {x + 1}
                                                    </option>
                                                ))
                                                }
                                                </select>
                                            </td>

                                            <td className="column7">
                                                {cartItems.reduce((a, c) => c.price * c.qty, 0)}
                                            </td>

                                            <td className="column8">
                                                <button
                                                    className="remove-item"
                                                    type="button"
                                                    onClick={() => removeFromCartHandler(item.product)}
                                                    >
                                                    X
                                                </button> 
                                            </td>
                                            </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                        
                                </div>
                            </div>
                        </div>

                    )
                    }


        </div>
        <div className="checkout ">
            <span className="total-price"> 
                        Tổng tiền sản phẩm ({cartItems.reduce((a, c) => a + c.qty, 0)} Sản phẩm) : &nbsp;
                        <span className="money">
                            {cartItems.reduce((a, c) => a + c.price * c.qty, 0)} ₫
                        </span>
                        
                        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
            </span>

            <button
                type="button"
                id="button-checkout"
                onClick={checkoutHandler}
                className="chot-don"
                disabled={cartItems.length === 0}
            >
            Mua hàng
            </button>       
                </div> 

        </div>
    );



}