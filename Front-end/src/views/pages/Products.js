import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import {
  createProduct,
  deleteProduct,
  listProducts,
} from '../../actions/productActions';
import LoadingBox from '../../components/LoadingBox';
import MessageBox from '../../components/MessageBox';
import {
  PRODUCT_CREATE_RESET,
  PRODUCT_DELETE_RESET,
} from '../../constants/productConstants';








export const Products = () => {
  return (
    <div className='products'>
      <h1>Products</h1>
    </div>
  );
};

export const ProductsManage = (props) => {

  const productList = useSelector((state) => state.productList);
  const {loading, error, products} = productList;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;

  useEffect(() => {
    if (successDelete) {
      dispatch({ type: PRODUCT_DELETE_RESET });
    }
    dispatch(
      listProducts()
    );
    
  }, [
    dispatch,
    props.history,
    successDelete,
    userInfo._id,
  ]);
  const deleteHandler = (product) => {
    if (window.confirm('Are you sure to delete?')) {
      dispatch(deleteProduct(product._id));
    }
  };
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  return (
    <div className='admin-listproducts'>
      {loadingDelete && <LoadingBox></LoadingBox>}
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}

      { loading ? (
          <LoadingBox></LoadingBox>
        ): error ? (
          <MessageBox variant="danger"> {error}</MessageBox>
        ) : (           
      <>
        <h1> Products Manage</h1>
        <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.idProduct}>
                  <td>{product.idProduct}</td>
                  <td>{product.productName}</td>
                  <td>{numberWithCommas(product.productPrice)}</td>
                  <td>{product.category.categoryName}</td>
                  <td>{product.brand.brandName}</td>
                  <td>
                    <button
                      type="button"
                      className="small"
                      onClick={() =>
                        props.history.push(`/product/${product.idProduct}/edit`)
                      }
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="small"
                      onClick={() => deleteHandler(product)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
      </>
      )}
    </div>
  );
};

export const AddProducts = () => {
  return (
    <div className='admin-products'>
      <h1>Add Products</h1>
    </div>
  );
};
