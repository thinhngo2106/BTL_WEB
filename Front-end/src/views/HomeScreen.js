import React, {useEffect}  from 'react';
import "./css/home.css";
import {useDispatch, useSelector} from 'react-redux';
import Product from '../components/Product';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import {listProducts} from '../actions/productActions';


export default function HomeScreen() {
    const dispatch = useDispatch();
    const productList = useSelector((state) => state.productList);
    const { loading, error, products } = productList;
  
    useEffect(() => {
      dispatch(listProducts());
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
                </div>
            </div>
            )}
        </div>
    );
}

 