import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import LoadingBox from '../../components/LoadingBox';
import MessageBox from '../../components/MessageBox';
import {listProductCategories, listProductBrands} from "../../actions/productActions";


function ProductsType(props) {

  const listCategory = useSelector((state) => state.listCategory);
  const {loading: loadingCategory, error: errorCategory, categories} = listCategory;
  const dispatch = useDispatch();
  useEffect(() => {
  dispatch(listProductCategories());
  },dispatch)


  return (
    <div className='ProductsType'>
        { loadingCategory ? (
          <LoadingBox></LoadingBox>
        ): errorCategory ? (
          <MessageBox variant="danger"> {errorCategory}</MessageBox>
        ) : (
          <>
              <table className="table">
                <thead>
                <tr>
                  <th>ID</th>
                  <th>Loại hàng</th>
                  <th>Tùy chỉnh</th>
                </tr>
              </thead>
              <tbody>
                {
                  categories.map((category) => (
                    <tr >
                      <td>{category.idCategory}</td>
                      <td>{category.categoryName}</td>
                    </tr>
                  ))
                }
              </tbody>
              </table>

          </>)} 
    </div>
  );
}

export default ProductsType;