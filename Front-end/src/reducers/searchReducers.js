const {
    SEARCH_KEYWORD_REQUEST,
    SEARCH_KEYWORD_SUCCESS,
    SEARCH_KEYWORD_FAIL,
    SEARCH_CATEGORY_REQUEST,
    SEARCH_CATEGORY_SUCCESS,
    SEARCH_CATEGORY_FAIL,
  } = require('../constants/searchConstants');

export const searchKeywordReducer =  (
    state = { loading: true, products: [] },
    action
  ) => {
    switch (action.type) {
        case SEARCH_KEYWORD_REQUEST:
            return {loading: true};
        case SEARCH_KEYWORD_SUCCESS: 
            return {loading: false, products: action.payload};
        case SEARCH_KEYWORD_FAIL:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
};

export const searchCategoryReducer =  (
    state = { loading: true, data: [] },
    action
  ) => {
    switch (action.type) {
        case SEARCH_CATEGORY_REQUEST:
            return {loading: true};
        case SEARCH_CATEGORY_SUCCESS: 
        console.log(action.payload.data);
            return {loading: false,
            data: action.payload.data,
            pages: action.payload.totalPages,
            };
        case SEARCH_CATEGORY_FAIL:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
};