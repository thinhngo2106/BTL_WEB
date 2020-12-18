const {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_CATEGORY_LIST_REQUEST,
    PRODUCT_CATEGORY_LIST_SUCCESS,
    PRODUCT_CATEGORY_LIST_FAIL,
    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_FAIL,
    PRODUCT_DELETE_RESET,

  } = require('../constants/productConstants');

export const productListReducer =  (
    state = { loading: true, products: [] },
    action
  ) => {
    switch (action.type) {
        case PRODUCT_LIST_REQUEST:
            return {loading: true};
        case PRODUCT_LIST_SUCCESS: 
            return {loading: false, products: action.payload};
        case PRODUCT_LIST_FAIL:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
};

export const productDetailsReducer = (state = { loading: true }, action) => {
    switch (action.type) {
      case PRODUCT_DETAILS_REQUEST:
        return { loading: true };
      case PRODUCT_DETAILS_SUCCESS:
        return { loading: false, product: action.payload };
      case PRODUCT_DETAILS_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };

  export const productCategoryListReducer = (
    state = { loading: true, categories: [] },
    action
  ) => {
    switch (action.type) {
      case PRODUCT_CATEGORY_LIST_REQUEST:
        return { loading: true };
      case PRODUCT_CATEGORY_LIST_SUCCESS:
        return { loading: false, categories: action.payload };
      case PRODUCT_CATEGORY_LIST_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export const productDeleteReducer = (state = {}, action) => {
    switch (action.type) {
      case PRODUCT_DELETE_REQUEST:
        return { loading: true };
      case PRODUCT_DELETE_SUCCESS:
        return { loading: false, success: true };
      case PRODUCT_DELETE_FAIL:
        return { loading: false, error: action.payload };
      case PRODUCT_DELETE_RESET:
        return {};
      default:
        return state;
    }
  };
