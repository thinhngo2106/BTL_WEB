import React, { useEffect, useState } from 'react';
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
import {listProductCategories, listProductBrands} from "../../actions/productActions";
import Axios from 'axios';




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
      dispatch(deleteProduct(product.idProduct));
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
                <th>Image</th>
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
                  <td> <img id="image-product-manage" src ={product.productdetails[0].image} alt={product.productName}/></td>
                  <td>{product.productName}</td>
                  <td>{numberWithCommas(product.productPrice)}</td>
                  <td>{product.category.categoryName}</td>
                  <td>{product.brand.brandName}</td>
                  <td>
                    <button
                      type="button"
                      className="small"
                      onClick={() =>
                        props.history.push(`/${product.idProduct}/edit`)
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

export const AddProducts = (props) => {

  const [image, setImage] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [quantityInStock, setQuantityInStock] = useState('');
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [category, setCategory] = useState('');
  const [brand, setBrand] = useState('');
  const [errorUpload, setErrorUpload] = useState('');
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const listCategory = useSelector((state) => state.listCategory);
  const {loading: loadingCategory, error: errorCategory, categories} = listCategory;
  const listBrand = useSelector((state) => state.listBrand);
  const {loading: loadingBrand, error: errorBrand, brands} = listBrand;
  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate;
  const dispatch = useDispatch();
  useEffect(() => {
    if (successCreate) {
      dispatch({ type: PRODUCT_CREATE_RESET });
      props.history.push('/products/productsManage');
    }
    dispatch(listProductCategories());
    
    dispatch(listProductBrands())
  }, [dispatch, successCreate, props.history]);
  const submitHandler = (e) => {
  
    e.preventDefault();
    
    // TODO: dispatch update product
    dispatch(
      createProduct({
        name,
        price,
        quantityInStock,
        image,
        category,
        brand,
      })
    );
  };  
  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append('image', file);
    setLoadingUpload(true);
    try {
      const { data } = await Axios.post('/api/uploads', bodyFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      setImage(subString(replaceStr(data)));
      setLoadingUpload(false);
    } catch (error) {
      setErrorUpload(error.message);
      setLoadingUpload(false);
    }
  };
  function replaceStr(x) {
    return x.replace(/\\/g, "/");
  }
  function subString(x){
    const index = x.indexOf("image");
    const pathImage = x.slice(index, x.length);
    return  "..//../" + pathImage;
  }

  return (
    <div className='admin-products'>
    
 

      <form className="form" onSubmit={submitHandler}> 
        <div>
        <h1>ADD Product</h1>
            <label htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></input>
        </div>      
        <div>
              <label htmlFor="price">Price</label>
              <input
                id="price"
                type="text"
                placeholder="Enter price"
                value={price}
                onChange={(e) => setPrice(parseInt(e.target.value))}
              ></input>
        </div>
        <div>
            <label htmlFor="quantityInStock">Count In Stock</label>
              <input
                id="quantityInStock"
                type="text"
                placeholder="Enter quantityInStock"
                value={quantityInStock}
                onChange={(e) => setQuantityInStock(parseInt(e.target.value))}
              ></input>  
        </div>    
        <div>
              <label htmlFor="category">Category</label>
              <select className="categories-list" 
                      value={category}  
                      onChange={(e) => setCategory(e.target.value)}
              >
              <option value="" disabled hidden>Choose here</option>
              { categories ? (
              categories.map((category) => (
                 <option className= "category-select" key ={category.idCategory} value={category.idCategory}>
                   {category.categoryName}
                 </option>
              ))) : (
                <div></div>
              )
              }
              </select>
              {loadingCategory && <LoadingBox></LoadingBox>}
              {errorCategory && <MessageBox variant="danger">{errorCategory}</MessageBox>} 
            </div>
          <div>
              <label htmlFor="brand">Brand</label>
              <select className="categories-list" 
                      value={brand}  
                      onChange={(e) => setBrand(e.target.value)}
              >
              <option value=""  disabled hidden>Choose here</option>
              { brands ? (
              brands.map((brand) => (
                 <option  className= "category-select" key ={brand.idBrand} value={brand.idBrand}>
                   {brand.brandName}
                 </option>
              ))) : (
                <option value=""></option>
              )
              }
              </select>
              {loadingBrand && <LoadingBox></LoadingBox>}
              {errorBrand && <MessageBox variant="danger">{errorBrand}</MessageBox>} 
          </div>
      <div>
          <label htmlFor="imageFile">Image</label>
          {
              image ? (
                <img src={subString(replaceStr(image))} alt =""/>
              ) : (
                <div></div>
              )
            }
              <input
                type="file"
                id="imageFile"
                label="Choose Image"
                onChange={uploadFileHandler}
              ></input>
              {loadingUpload && <LoadingBox></LoadingBox>}
              {errorUpload && (
                <MessageBox variant="danger">{errorUpload}</MessageBox>
              )}
        </div>
      <div>
        <label></label>
        <button className="primary" type="submit">
        Add
        </button>
      </div>
    </form>
    </div>
  );
};



