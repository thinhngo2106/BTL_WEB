import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import MessageBox from '../components/MessageBox';
import { addToCart, removeFromCart } from '../actions/cartActions';
import './css/cartScreen.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table'

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
        <div className="row cart col-md-10">
            <div className="col-md-12" >
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
                        // <div className="cart-check">
                        //     <div className="cart-items col-sm-12 col-md-11">
                        //         {cartItems.map((item) => (
                        //             <div className="row cart-item col-sm-12 col-md-11" key={item.id}>
                        //                 <div className="col col-sm-2 col-md-2">
                        //                 <Link to={`/product/${item.product}`}>
                        //                     <img src={item.image}
                        //                         alt={item.name} className="small"></img>
                        //                         </Link>
                        //                 </div> 
                        //                 <div className="col col-sm-4 col-md-4">
                        //                     <Link to={`/product/${item.product}`}  style={{textDecoration: 'none'}}>
                        //                         <span className="item-attribute-name">{item.name}</span></Link>
                        //                 </div>
                        //                 <div className="col col-md-2">
                        //                     <span className="item-attribute-name"  style={{textAlign: 'center'}}>{item.size}</span>    
                        //                 </div>
                        //                 <div className="col col-sm-1 col-md-1">
                        //                     <select className="item-quantity"
                        //                         value={item.qty}
                        //                         onChange={(e) =>
                        //                             dispatch(
                        //                             addToCart(item.product, Number(e.target.value))
                        //                             )
                        //                         }
                        //                     >
                        //                     {[...Array(item.countInStock).keys()].map((x) => (
                        //                         <option key={x + 1} value={x + 1}>
                        //                         {x + 1}
                        //                         </option>
                        //                     ))}
                        //                     </select>
                        //                 </div>
                        //                 <div className="col col-sm-1 col-md-2">
                        //                     <span className="item-attribute" style={{textAlign: 'center'}}>${item.price}  </span></div>
                        //                 <div className="col col-sm-2 col-md-1">
                        //                     <button
                        //                     className="remove-item"
                        //                     type="button"
                        //                     onClick={() => removeFromCartHandler(item.product)}
                        //                     >
                        //                     Xóa
                        //                     </button>
                        //                 </div>
                        //             </div>
                        
                        
                            //     ))}

                            // </div>  
                    // </div>
                        
                    <div>
                        {cartItems.map((item) => (

                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                <th>#</th>
                                <th>Ảnh</th>
                                <th>Tên sản phẩm</th>
                                <th>Kích cỡ</th>
                                <th>Số lượng</th>
                                <th>Giá tiền</th>
                                <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                <td></td>
                                <td>
                                    <Link to={`/product/${item.product}`}>
                                        <img src={item.image} alt={item.name} className="small"></img>
                                    </Link>
                                </td>
                                <td>
                                    <Link to={`/product/${item.product}`}  style={{textDecoration: 'none'}}>
                                        <span className="item-attribute-name">{item.name}</span>
                                    </Link>
                                </td>
                                <td>
                                    <span className="item-attribute-name"  style={{textAlign: 'center'}}>{item.size}</span>
                                </td>
                                <td>
                                    <select className="item-quantity"
                                        value={item.qty}
                                        onChange={(e) =>
                                            dispatch(
                                            addToCart(item.product, Number(e.target.value), idsize)
                                            )
                                        }
                                    >
                                    {[...Array(item.countInStock).keys()].map((x) => (
                                        <option key={x + 1} value={x + 1}>
                                        {x + 1}
                                        </option>
                                    ))}
                                    </select>
                                </td>
                                <td>
                                    <span className="item-attribute" style={{textAlign: 'center'}}>${item.price}  </span>

                                </td>
                                <td>
                                    <button
                                        className="remove-item"
                                        type="button"
                                        onClick={() => removeFromCartHandler(item.product)}
                                        >
                                        Xóa
                                    </button> 
                                </td>
                                </tr>
                            </tbody>
                        </Table>
                        ))}
                    </div>

                    )
                    }


        </div>
        <div className="checkout col-md-5">
                <span className="total-price"> 
                            Tổng tiền sản phẩm({cartItems.reduce((a, c) => a + c.qty, 0)} Sản phẩm) : $
                            {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
                </span>
                        <button
                            type="button"
                            id="button-checkout"
                            onClick={checkoutHandler}
                            className="primary block"
                            disabled={cartItems.length === 0}
                        >
                        Mua hàng
                        </button>       
                </div> 

        </div>
    );



}