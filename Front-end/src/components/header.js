import React  from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/header.css';
import { Link } from 'react-router-dom';
import SearchIcon from "@material-ui/icons/Search";
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import {useDispatch, useSelector} from 'react-redux';


function Header() {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
 
        return(
            <nav className="header">
              <Link to="/">
              <img className="header__logo" src= {process.env.PUBLIC_URL+ "/image/logo.png"} alt="background-img" width={144} height={81} />
              </Link>
            <div className="header__search"> 
              <input className="header__searchInput" type="text" />
              <SearchIcon className="header__searchIcon" />
            </div>
            <div className="header__nav">
                <div className="header__option">
                  <span className="header__optionLineOne">Kiểm tra</span>
                  <span className="header__optionLineTwo">Đơn hàng</span>
                </div>
                <div className="header__option">
                  <span className="header__optionLineOne">Hello Thinh</span>
                  <span className="header__optionLineTwo">Đăng nhập</span>
                </div>
                <Link to="/cart">
                <div className="header__optionBasket">
                <AddShoppingCartIcon/>
                <span className="header__optionLineTwo header__basketCount">{cartItems.length}</span>
                </div>
                </Link>
            </div>
          </nav>
        );
}

export default Header;