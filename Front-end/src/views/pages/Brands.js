import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import LoadingBox from '../../components/LoadingBox';
import MessageBox from '../../components/MessageBox';
import {listProductCategories, listProductBrands} from "../../actions/productActions";

export const Brands = () => {
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

export const BrandsManage = () => {
  return (
    <div className='brandsManage'>
      <h1>Brands Manage</h1>
    </div>
  );
}

export const AddBrands = () => {
  return (
    <div className='addBrands'>
      <h1>Add Brands</h1>
    </div>
  );
}
