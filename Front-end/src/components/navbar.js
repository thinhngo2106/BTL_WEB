
import React, { useEffect, useState}  from "react";

import 'bootstrap/dist/css/bootstrap.min.css';
import HorizontalSplitIcon from '@material-ui/icons/HorizontalSplit';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { useDispatch, useSelector } from 'react-redux';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import {Link} from "react-router-dom";
import {listProductCategories} from "../actions/productActions";



export default function NavBar(pros) {    
    const listCategory = useSelector((state) => state.listCategory);
    const {loading, error, categories} = listCategory;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(listProductCategories());
      }, [dispatch]);
        return(
            <div>
            {loading ? (
                <LoadingBox></LoadingBox>
              ) : error ? (
                <MessageBox variant="danger">{error}</MessageBox>
              ) : (

            <div className= "navbarItems">
                <div className="item-big">
                    {categories.map((category) => (
                        <Link to={`/category?name=${category.categoryName}`}>
    
                           <a> <span> {category.categoryName} </span> </a>
            
                        </Link>
                    ))
                    }
                </div>
            </div>
            )}
         </div>
    );
}

