import {createStore, compose, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import {
    productListReducer,
    productDetailsReducer,
    productCategoryListReducer,
} from './reducers/productReducers';
import { cartReducer } from './reducers/cartReducers';
import {searchCategoryReducer, searchKeywordReducer} from './reducers/searchReducers'
import {
    userSigninReducer,
    userRegisterReducer, 
} from './reducers/userReducers';

import {
    orderCreateReducer,
    orderMineListReducer,
  } from './reducers/orderReducers';




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
    orderCreate: orderCreateReducer,
    orderMineList: orderMineListReducer,
    categorySearch: searchCategoryReducer,
    listCategory: productCategoryListReducer,
});


const store = createStore(
    reducer, 
    initialState, 
    composeEnhancer(applyMiddleware(thunk))
);

export default store;