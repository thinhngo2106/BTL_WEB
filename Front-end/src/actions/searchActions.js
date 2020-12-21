import {
  SEARCH_KEYWORD_REQUEST,
  SEARCH_KEYWORD_SUCCESS,
  SEARCH_KEYWORD_FAIL,
  SEARCH_CATEGORY_REQUEST,
  SEARCH_CATEGORY_SUCCESS,
  SEARCH_CATEGORY_FAIL,
  PRODUCTS_RECOMMEND_REQUEST,
  PRODUCTS_RECOMMEND_SUCCESS,
  PRODUCTS_RECOMMEND_FAIL,
} from "../constants/searchConstants";
import Axios from "axios";

export const searchKeyword = (queryKey) => async (dispatch) => {

  dispatch({
    type: SEARCH_KEYWORD_REQUEST, payload: queryKey,
  });
  try {      
    const { data } = await Axios.get('/api/search/', {params:{
      query: queryKey
    }});
    dispatch({ type: SEARCH_KEYWORD_SUCCESS, payload: data });
  } catch (error) {
    dispatch({type: SEARCH_KEYWORD_FAIL, payload: error.message });
  }
};

export const searchCategory = (nameCategory, pageNumber, limitProducts) => async (dispatch) => {

dispatch({
  type: SEARCH_CATEGORY_REQUEST, payload: nameCategory,
});
try {      
  const { data } = await Axios.get('/api/search/categories/', {params:{
    name: nameCategory,
    page: pageNumber ? pageNumber : 0,
    limit: limitProducts
  }});
  
  dispatch({ type: SEARCH_CATEGORY_SUCCESS, payload: data});
} catch (error) {
  dispatch({type: SEARCH_CATEGORY_FAIL, payload: error.message });
}
};


export const recommendProducts = (limitProducts) => async (dispatch) => {

  dispatch({
    type: PRODUCTS_RECOMMEND_REQUEST, payload: limitProducts,
  });
  try {      
    const { data } = await Axios.get('/api/search/category/', {params:{
      limit: limitProducts ? limitProducts : 2,
    }});
    dispatch({ type: PRODUCTS_RECOMMEND_SUCCESS, payload: data});
  } catch (error) {
    dispatch({type: PRODUCTS_RECOMMEND_FAIL, payload: error.message });
  }
};

