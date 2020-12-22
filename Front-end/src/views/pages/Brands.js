import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import LoadingBox from '../../components/LoadingBox';
import MessageBox from '../../components/MessageBox';
import {listProductCategories, listProductBrands} from "../../actions/productActions";

function Brands() {
  
  const listBrand = useSelector((state) => state.listBrand);
  const {loading: loadingBrand, error: errorBrand, brands} = listBrand;
  const dispatch = useDispatch();
  useEffect(() => {
  dispatch(listProductBrands());
  },dispatch)


  return (
    <div className='Admin_Brands'>
        { loadingBrand ? (
          <LoadingBox></LoadingBox>
        ): errorBrand ? (
          <MessageBox variant="danger"> {errorBrand}</MessageBox>
        ) : (
          <>
              <table className="table">
                <thead>
                <tr>
                  <th>ID </th>
                  <th>Nhãn hàng</th>
                  <th>Tùy chỉnh</th>
                </tr>
              </thead>
              <tbody>
                {
                  brands.map((brand) => (
                    <tr >
                      <td>{brand.idBrand}</td>
                      <td>{brand.brandName}</td>
                    </tr>
                  ))
                }
              </tbody>
              </table>

          </>)} 
    </div>
  );
}

export default Brands;