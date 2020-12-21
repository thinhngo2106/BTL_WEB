import React, {useEffect}  from 'react';
import "./css/home.css";
import './css/HomeScreen.css';
import {useDispatch, useSelector} from 'react-redux';
import Product from '../components/Product';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import {listProducts} from '../actions/productActions';
import {recommendProducts} from '../actions/searchActions';

export default function HomeScreen() {
    const dispatch = useDispatch();
    const productList = useSelector((state) => state.productList);
    const { loading, error, products } = productList;
    const productsRecommend  = useSelector((state) => state.productsRecommend);
    const {
        loading: loadingProduct,
        error: errorProduct,
        data}  = productsRecommend;
  
    useEffect(() => {
        dispatch(listProducts());
        dispatch(recommendProducts(4));
    }, [dispatch]);
    return (
        <div>
            { loading ? (
                <LoadingBox></LoadingBox>
            ): error ? (
                <MessageBox variant="danger"> {error}</MessageBox>
            ) : ( 
            <div className="home">    
                <div className="home__container">
                    <img className="home__image" 
                    src = "..//../image/background2.jpg" alt ="" />
                    <div className="home__row">
                        {products.map((product) => (
                            <Product key={product.idProduct} product={product}> </Product>
                        ))}
                    </div>
                    <div>
 
                    {loadingProduct ? (<LoadingBox></LoadingBox>) : 
                    errorProduct ? ( <MessageBox variant="danger">{errorProduct}</MessageBox>) : (
                    <div>

                        <div>
                            {data.map((data) => ( 
                            <div  key={data.idCategory}>  
                            <div key={data.idCategory}> 
                                <span>{data.categoryName}</span>
                            </div>
                            <div className="home__row" >
                                {data.products.map((product) => (
                                 <Product key={product.idProduct} product={product}> </Product>
                            ))}
                            </div>
                            </div>))}
                        </div>
                    </div>
                        )}
                    </div>
                </div>
            </div>
            )}
        </div>
    );
}

 