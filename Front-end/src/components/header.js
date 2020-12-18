import React, {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/header.css';
import { Link } from 'react-router-dom';
import SearchIcon from "@material-ui/icons/Search";
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import {useDispatch, useSelector} from 'react-redux';
import { searchKeyword } from '../actions/searchActions';
import { signout } from '../actions/userActions';
import { Dropdown } from 'react-bootstrap';
import SplitButton from 'react-bootstrap/SplitButton';
import DropdownButton from 'react-bootstrap/DropdownButton'


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
            <nav className="navbar navbar-expand-md header">
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
                <Link to = "/orderhistory" style={{textDecoration: 'none'}}>
                <div className="header__option">
                  <span className="header__optionLineOne">Kiểm tra</span>
                  <span className="header__optionLineTwo">Đơn hàng</span>
                </div>
                </Link>
                <div className="header__option">
                {
                  userInfo ? (
                    // <div className ="dropdown">
                    // <Link to="#" style={{textDecoration: 'none'}}>
                    // <div className="header__option">
                    // <span className="header__optionLineOne">Xin chào</span>
                    // <span className="header__optionLineTwo">{userInfo.Fname} {userInfo.Lname}</span>     
                    // </div>                 
                    // </Link>
                    // <ul className="dropdown-content">
                    //   <Link to="#signout" onClick={signoutHandler} style={{textDecoration: 'none'}}>
                    //     <span className="dropdown-signout"> Đăng xuất </span>
                    //     </Link>
                    // </ul>
                    // </div>
                  <div>
                    <Dropdown className="dropdown">
                      
                      <Dropdown.Toggle className="dropdown-basic" >
                      
                        <div className="header__option">
                          <span className="header__optionLineOne">Xin chào</span>

                          <span className="header__optionLineTwo">{userInfo.Fname} {userInfo.Lname}</span>     
                        </div> 
                      </Dropdown.Toggle>

                      <Dropdown.Menu  className="dropdown-signout"> 
                        <Dropdown.Item > 
                          <Link to="#signout" onClick={signoutHandler} style={{textDecoration: 'none'}}>
                            <span className='dropdown-content'> Đăng xuất </span>
                            </Link>
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                    </div>
                  ) : (
               
                  <Link to ="/signin" style={{textDecoration: 'none'}}>
                    <div className="header__option">
                    <span className="header__optionLineOne">Hello Thinh</span>
                    <span className="header__optionLineTwo">Đăng nhập</span>     
                    </div>                 
                  </Link>
                
                  )
                }
                </div>
                <Link to="/cart" style={{textDecoration: 'none'}}>
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