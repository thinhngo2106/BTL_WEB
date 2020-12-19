import React, {useEffect}  from 'react';
import "./css/home.css";
import './css/CategoryScreen.css';
import {useDispatch, useSelector} from 'react-redux';
import Product from '../components/Product';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import {searchCategory} from '../actions/searchActions';
import {Link} from "react-router-dom";

export default function CategoryScreen(props) {
    
    const param = new URLSearchParams(props.location.search);
    const name = param.get("name");
    const page = param.get("page");
    const categorySearch  = useSelector((state) => state.categorySearch);
    const { loading, error, data, pages} = categorySearch;
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(searchCategory(name,page));
    }, [dispatch, name, page]);
    const getFilterUrl = (filter) => {
        const filterPage = filter.page || page;
        return `/category?name=${name}&page=${filterPage-1}`;
    }

    return (
        <div>
            { loading ? (
                <LoadingBox></LoadingBox>
            ): error ? (
                <MessageBox variant="danger"> {error}</MessageBox>
            ) : ( 
            <div className="home">    
                <div className="home__container">
                    <div className="home__row">
                        {
                            data.length > 0 ? (
                                data[0].products.map((product) => (
                                    <Product key={product.idProduct} product={product}> </Product>
                                ))
                            ) : (
                                <MessageBox variant="danger"> "Không có sản phẩm theo yêu cầu"</MessageBox>
                            )}
                    </div>
                </div>
                <div className="row center pagination pagination-sm">
                {[...Array(pages).keys()].map((x) => (
                  <Link
                    className={x === page ? 'active' : ''}
                    key={x}
                    to={getFilterUrl({page: x+1})}
                  >
                    <li className='page-item'>
                        <a>
                            {x+1}
                        </a>
                    </li>
                    
                  </Link>
                ))}
                </div>
            </div>
            
            )}
        </div>
    );
}
