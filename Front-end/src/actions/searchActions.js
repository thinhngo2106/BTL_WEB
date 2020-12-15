import {
    SEARCH_KEYWORD_REQUEST,
    SEARCH_KEYWORD_SUCCESS,
    SEARCH_KEYWORD_FAIL,
    SEARCH_CATEGORY_REQUEST,
    SEARCH_CATEGORY_SUCCESS,
    SEARCH_CATEGORY_FAIL,

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

export const searchCategory = (nameCategory) => async (dispatch) => {
  
  dispatch({
    type: SEARCH_CATEGORY_REQUEST, payload: nameCategory,
  });
  try {      
    const { data } = await Axios.get('/api/search/categories/', {params:{
      name: nameCategory,
    }});
    
    dispatch({ type: SEARCH_CATEGORY_SUCCESS, payload: data});
  } catch (error) {
    dispatch({type: SEARCH_CATEGORY_FAIL, payload: error.message });
  }
};



