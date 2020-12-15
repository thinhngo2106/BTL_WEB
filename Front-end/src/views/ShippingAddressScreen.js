import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';
import { savePaymentMethod } from '../actions/cartActions';

export default function ShippingAddressScreen(props) {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  if (!userInfo) {
    props.history.push('/signin');
  }
  const [fullName, setFullName] = useState(shippingAddress.fullName);
  const [address, setAddress] = useState(shippingAddress.address);
  const [district, setDistrict] = useState(shippingAddress.district);
  const [ward, setWard] = useState(shippingAddress.ward);
  const [city, setCity] = useState(shippingAddress.city);
  const [paymentMethod, setPaymentMethod] = useState('PayPal');

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveShippingAddress({ fullName, address, city, district, ward}, 
      savePaymentMethod(paymentMethod))
    );
    props.history.push('/placeorder');
  };
  return (
    <div>
      <CheckoutSteps step1 step2></CheckoutSteps>
      <form className="form" onSubmit={submitHandler}>
        <div className="shipping-address">
          <div>
            <h1>Shipping Address</h1>
          </div> 
          <div>
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              id="fullName"
              placeholder="Enter full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            ></input>
          </div>
          <div>
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              placeholder="Enter address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            ></input>
          </div>
          <div>
            <label htmlFor="city">City</label>
            <input
              type="text"
              id="city"
              placeholder="Enter city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            ></input>
          </div>
          <div>
            <label htmlFor="district">Quận/ Huyện</label>
            <input
              type="text"
              id="district"
              placeholder="Enter district"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              required
            ></input>
          </div>
          <div>
            <label htmlFor="country">Phường/ Xã </label>
            <input
              type="text"
              id="ward"
              placeholder="Enter ward"
              value={ward}
              onChange={(e) => setWard(e.target.value)}
              required
            ></input>
          </div>
        </div>
        <div className="payment-method">
          <div>
          <h1>Phương thức thanh toán</h1>
          </div>
          <div>
            <div>
              <input
                type="radio"
                id="paypal"
                value="PayPal"
                name="paymentMethod"
                required
                checked
                onChange={(e) => setPaymentMethod(e.target.value)}
              ></input>
              <label htmlFor="paypal">PayPal</label>
            </div>
          </div>
          <div>
            <div>
              <input
                type="radio"
                id="stripe"
                value="Stripe"
                name="paymentMethod"
                required
                onChange={(e) => setPaymentMethod(e.target.value)}
              ></input>
              <label htmlFor="stripe">TIền mặt</label>
            </div>
          </div>
        </div>
        <div>
          <label />
          <button className="primary" type="submit">
            Tiếp tục
          </button>
        </div>
      </form>
    </div>
  );
}