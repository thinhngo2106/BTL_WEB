import React, {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/header.css';
import { Link } from 'react-router-dom';
import SearchIcon from "@material-ui/icons/Search";
import {useDispatch, useSelector} from 'react-redux';
import { signout } from '../actions/userActions';

function Header(props) {

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const [query, setQuery] = useState('');
  const userSignin = useSelector((state) => state.userSignin)
  const {userInfo} = userSignin;
  const dispatch = useDispatch();
  
  const signoutHandler = () => {
    dispatch(signout());
  };
  const submitAction = (e) =>{
    e.preventDefault();
    setQuery(query);

  }
  
        return(
            <nav className="header">
              <Link to="/">
              <img className="header__logo" src= {process.env.PUBLIC_URL+ "/image/logo.png"} alt="background-img" width={144} height={81} />
              </Link>
            <div className="header__search"> 
              <input className="header__searchInput" placeholder="Search.." name="term" type="text" value={query} onChange={(e) => setQuery(e.target.value)}/>
              <Link to ={`/search?query=${query}`}>
              <button className="search-button" type="submit" onSubmit={submitAction}>
              <SearchIcon className="header__searchIcon" />
              </button>
              </Link>
            </div>
            <div className="header__nav">
                <Link to = "/orderhistory">
                <div className="header__option">
                  <span className="header__optionLineOne">Kiểm tra</span>
                  <span className="header__optionLineTwo">Đơn hàng</span>
                </div>
                </Link>
                <div className="header__option">
                {
                  userInfo ? (
                    <div className ="dropdown">
                    <Link to="#">
                    <div className="header__option">
                    <span className="header__optionLineOne">Xin chào</span>
                    <span className="header__optionLineTwo">{userInfo.Fname} {userInfo.Lname}</span>     
                    </div>                 
                    </Link>
                    <ul className="dropdown-content">
                      <Link to="/" onClick={signoutHandler}>
                        <span className="dropdown-signout"> Đăng xuất </span>
                        </Link>
                    </ul>
                    </div>
                  ) : (
               
                  <Link to ="/signin">
                    <div className="header__option">
                    <span className="header__optionLineOne">Hello Thinh</span>
                    <span className="header__optionLineTwo">Đăng nhập</span>     
                    </div>                 
                  </Link>
                
                  )
                }
                </div>
            </div>
          </nav>
        );
}

export default Header;