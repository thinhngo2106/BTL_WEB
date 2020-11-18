import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import Header from "./components/header";
import HomeScreen from "./views/HomeScreen";
import ProductScreen from './views/ProductScreen';
import CartScreen from './views/CartScreen';
import SearchScreen from './views/SearchScreen';
import Footer from './components/footer';
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
            </main>
            <Footer />
            </div>
          </Router>
       );
 }
 export default App;