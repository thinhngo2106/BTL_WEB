import React, { Component }  from "react";
import './navbar.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import HorizontalSplitIcon from '@material-ui/icons/HorizontalSplit';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import {Link} from "react-router-dom";
class Navbar extends Component {

    render(){
        return(
            <nav className= "navbarItems">
                <ul className="item-big">
                    <li className="nav-item home">
                    <HorizontalSplitIcon className="bar-icon"/>
                    <span>Danh mục sản phẩm</span>
                    </li>
                    <li className="nav-item">
                    <Link to="/" className="nav-link">
                    <span>Converse</span>
                    </Link>
                    </li>
                    
                    <li className="nav-item">
                    <Link to="/" className="nav-link">   
                    <span>Vans</span>
                    </Link>
                    </li>
    
                    <li className="nav-item">
                    <Link to="/" className="nav-link">
                    <span>Phụ kiện Converse</span>
                    </Link>
                    </li>
                    <li className="nav-item">
                    <Link to="/" className="nav-link">
                    <span>Phụ kiện Vans</span>
                    </Link>
                    </li>
                </ul>
            </nav>
        );
    }   
}

export default Navbar