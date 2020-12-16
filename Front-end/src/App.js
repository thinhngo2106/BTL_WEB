import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from "./components/header";
import HeaderAdmin from "./components/HeaderAdmin";
import HomeScreen from "./views/HomeScreen";
import ProductScreen from './views/ProductScreen';
import CartScreen from './views/CartScreen';
import SearchScreen from './views/SearchScreen';
import AdminRoute from './components/AdminRoute';
import './App.css'
import Footer from './components/footer';
import SignupScreen from './views/SignupScreen';
import SigninScreen from './views/SigninScreen';
import ShippingAddressScreen from './views/ShippingAddressScreen';
import PaymentScreen from './views/PaymentScreen';
import PlaceOrderScreen from './views/PlaceOrderScreen';
import OrderHistoryScreen from './views/OrderHistoryScreen';
import AdminScreen from './views/AdminScreen';
import { useSelector } from 'react-redux';
import CategoryScreen from './views/CategoryScreen';
import NavBar from './components/navbar';
import Home from './views/pages/Home';
import Reports from './views/pages/Reports';
import Products from './views/pages/Products';
import AdminNavbar from './components/Admin_Navbar';



function App(){
   const userSignin = useSelector((state) => state.userSignin);
   const { userInfo } = userSignin;
       return (
          <Router>
             <div>
              {userInfo && userInfo.isAdmin ? (
               <div>
                 <HeaderAdmin/>
                 <AdminNavbar></AdminNavbar>
               </div>
              ) : (
               <div>
             <Header />
             <NavBar></NavBar> 
             </div>
              )}
             <main>
             {userInfo && userInfo.isAdmin ? (
               <Switch>
               <AdminRoute path="/" component={AdminScreen} exact></AdminRoute>
               <AdminRoute path='/reports' component={Reports} ></AdminRoute>
               <AdminRoute path='/products' component={Products} ></AdminRoute>
               </Switch>
              ) : (
               <Switch>
               <Route path="/cart/:id?" component={CartScreen}></Route>
               <Route path="/" component ={HomeScreen} exact ></Route>
               <Route path="/product/:id" component={ProductScreen} exact></Route>
               <Route path="/search" component={SearchScreen}></Route>
               <Route path="/signin" component={SigninScreen}></Route>
               <Route path="/register" component={SignupScreen}></Route>
               <Route path="/shipping" component={ShippingAddressScreen}></Route>
               <Route path="/placeorder" component={PlaceOrderScreen}></Route>
               <Route path="/orderhistory" component={OrderHistoryScreen}></Route>
               <Route path="/category" component={CategoryScreen}></Route>
               </Switch>
              )}
            </main>
            
            <Footer />
            </div>
          </Router>
       );
 }
 export default App;