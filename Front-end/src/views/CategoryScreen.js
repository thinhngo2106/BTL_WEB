import React, {useEffect}  from 'react';
import "./css/home.css";
import {useDispatch, useSelector} from 'react-redux';
import Product from '../components/Product';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import {searchCategory} from '../actions/searchActions';


export default function CategoryScreen(props) {
    
    const param = new URLSearchParams(props.location.search);
    const name = param.get("name");
    const categorySearch  = useSelector((state) => state.categorySearch );
    const { loading, error, data, pages} = categorySearch;
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(searchCategory(name));
      console.log(data);
      
    }, [dispatch, name]);
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
            </div>
            )}
        </div>
    );
}
