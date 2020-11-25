import {createStore, compose, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import {
    productListReducer,
    productDetailsReducer,
} from './reducers/productReducers';
import { cartReducer } from './reducers/cartReducers';
import {searchKeywordReducer} from './reducers/searchReducers'
import {
    userSigninReducer,
    userRegisterReducer, 
} from './reducers/userReducers';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const initialState = {
    cart: {
        cartItems: localStorage.getItem('cartItems')
        ? JSON.parse(localStorage.getItem('cartItems'))
        : [], 
        shippingAddress: localStorage.getItem('shippingAddress')
        ? JSON.parse(localStorage.getItem('shippingAddress'))
        : {},
        paymentMethod: 'PayPal',
    },
    userSignin: {
        userInfo: localStorage.getItem('userInfo')
          ? JSON.parse(localStorage.getItem('userInfo'))
          : null,
          
      },
};
const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    keywordSearch: searchKeywordReducer,
    userSignin: userSigninReducer,
    userRegister: userRegisterReducer,
});


const store = createStore(
    reducer, 
    initialState, 
    composeEnhancer(applyMiddleware(thunk))
);

export default store;