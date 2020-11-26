import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import Header from "./components/header";
import HomeScreen from "./views/HomeScreen";
import ProductScreen from './views/ProductScreen';
import CartScreen from './views/CartScreen';
import SearchScreen from './views/SearchScreen';
import './App.css'
import Footer from './components/footer';
import SignupScreen from './views/SignupScreen';
import SigninScreen from './views/SigninScreen';
import ShippingAddressScreen from './views/ShippingAddressScreen';
import PaymentScreen from './views/PaymentScreen';
import PlaceOrderScreen from './views/PlaceOrderScreen';
import OrderHistoryScreen from './views/OrderHistoryScreen';
function App(){
       return (
          <Router>
             <div>
             <Header />
             <main>
               <Route path="/cart/:id?" component={CartScreen}></Route>
               <Route path="/" component ={HomeScreen} exact ></Route>
               <Route path="/product/:id" component={ProductScreen} exact></Route>
               <Route path="/search" component={SearchScreen}></Route>
               <Route path="/signin" component={SigninScreen}></Route>
               <Route path="/register" component={SignupScreen}></Route>
               <Route path="/shipping" component={ShippingAddressScreen}></Route>
               <Route path="/payment" component={PaymentScreen}></Route>
               <Route path="/placeorder" component={PlaceOrderScreen}></Route>
               <Route path="/orderhistory" component={OrderHistoryScreen}></Route>
            </main>
            <Footer />
            </div>
          </Router>
       );
 }
 export default App;