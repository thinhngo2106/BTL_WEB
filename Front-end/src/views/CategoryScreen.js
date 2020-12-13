import React, {useEffect}  from 'react';
import "./css/home.css";
import {useDispatch, useSelector} from 'react-redux';
import Product from '../components/Product';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import {searchKeyword} from '../actions/searchActions';


export default function CategoryScreen(props) {
    const dispatch = useDispatch();
    const param = new URLSearchParams(props.location.search);
    const query = param.get("query")
    const keywordSearch  = useSelector((state) => state.keywordSearch );
    const { loading, error, products } = keywordSearch;

  
    useEffect(() => {
      dispatch(searchKeyword(query));
    }, [dispatch, query]);
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
                        {products.map((product) => (
                            <Product key={product.idProduct} product={product}> </Product>
                        ))}
                    </div>
                </div>
            </div>
            )}
        </div>
    );
}
