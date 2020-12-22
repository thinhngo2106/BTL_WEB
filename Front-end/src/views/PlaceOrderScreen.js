import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { createOrder } from "../actions/orderActions";
import { ORDER_CREATE_RESET } from "../constants/orderConstants";
import "bootstrap/dist/css/bootstrap.min.css";
export default function PlaceOrderScreen(props) {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const cart = useSelector((state) => state.cart);
  if (!cart.paymentMethod) {
    props.history.push("/payment");
  }
  if (!userInfo) {
    props.history.push("/signin");
  }
  const orderCreate = useSelector((state) => state.orderCreate);
  const { loading, success, error, order } = orderCreate;

  const toPrice = (num) => Number(num.toFixed(2)); // 5.123 => "5.12" => 5.12
  cart.itemsPrice = toPrice(
    cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0)
  );
  cart.shippingPrice = cart.itemsPrice > 100 ? 200000 : toPrice(0);
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice;
  const today = new Date();
  cart.orderDate =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  today.setDate(today.getDate() + 5);
  cart.shippedDate =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  cart.status = "Đang xử lý";
  cart.shipAddress =
    cart.shippingAddress.address +
    " " +
    cart.shippingAddress.ward +
    " " +
    cart.shippingAddress.district +
    " " +
    cart.shippingAddress.city;
  cart.customerName = cart.shippingAddress.fullName;
  cart.phoneNumber = cart.shippingAddress.phoneNumber;
  const dispatch = useDispatch();
  const placeOrderHandler = () => {
    dispatch(createOrder({ ...cart, orderItems: cart.cartItems }));
    props.history.push("/")
  };
  useEffect(() => {
    if (success) {
      dispatch({ type: ORDER_CREATE_RESET });
    }
  }, [dispatch, order, success]);
  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
      <div className="order-detail row top">
        <div className=" col-md-6 ">
          {/* <ul>
            <li> */}
          <div className="card card-body">
            <h2>Shipping</h2>
            <p>
              <strong>Name:</strong> {cart.shippingAddress.fullName} <br />
              <strong>Số điện thoại: </strong>{" "}
              {cart.shippingAddress.phoneNumber} <br />
              <strong>Address: </strong> {cart.shippingAddress.address},{" "}
              {cart.shippingAddress.ward},{cart.shippingAddress.district},{" "}
              {cart.shippingAddress.city}
            </p>
          </div>
          {/* </li>
            <li> */}
          <div className="card card-body">
            <h2>Payment</h2>
            <p>
              <strong>Method:</strong> {cart.paymentMethod}
            </p>
          </div>
          {/* </li>
            <li> */}
          <div className="card card-body">
            <h2>Order Items</h2>
            {/* <ul> */}
            {cart.cartItems.map((item) => (
              <>
                <div className="card card-body">
                  {/* <li key={item.product}> */}
                  <div className={`row orderItem ${item.product}`}>
                    <div className="col-md-6">
                      <div>
                        <img
                          src={item.image}
                          alt={item.name}
                          className="small1"
                        ></img>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="min-30">
                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                      </div>

                      <div>
                        {item.qty} x ${item.price} = ${item.qty * item.price}
                      </div>
                    </div>
                  </div>
                  {/* </li> */}
                  {/* <hr /> */}
                </div>
              </>
            ))}
            {/* </ul> */}
          </div>
          {/* </li> */}
          {/* </ul> */}
        </div>
        <div className="col-md-4">
          <div className="card card-body">
            <div className="row">
              {/* <ul>
              <li> */}
              <h2>Order Summary</h2>
              {/* </li>
              <li> */}
              <div className="col-md-8">
                <div className="row">
                  <div>Items</div>
                  <div>${cart.itemsPrice}</div>
                </div>
                {/* </li>
              <li> */}
                <div className="row">
                  <div>Shipping</div>
                  <div> {cart.shippingPrice}</div>
                </div>
                {/* </li>

              <li> */}
                <div className="row">
                  <div>
                    <strong> Order Total</strong>
                  </div>
                  <div>
                    <strong>${cart.totalPrice}</strong>
                  </div>
                  {/* </li>
              <li> */}
                </div>
              </div>
              <div className="col-md-4">
                <button
                  type="button"
                  className="btn btn-warning "
                  disabled={cart.cartItems.length === 0}
                  onClick={placeOrderHandler}
                >
                  Place Order
                </button>
              </div>

              {/* </li> */}
              {loading && <LoadingBox></LoadingBox>}
              {error && <MessageBox variant="danger">{error}</MessageBox>}
              {/* </ul> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
