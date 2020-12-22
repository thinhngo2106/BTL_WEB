import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Axios from 'axios';
import { detailsProduct, updateProduct } from '../../actions/productActions';
import LoadingBox from '../../components/LoadingBox';
import MessageBox from '../../components/MessageBox';
import { PRODUCT_UPDATE_RESET } from '../../constants/productConstants';
import {listProductCategories, listProductBrands} from "../../actions/productActions";


export default function ProductEditScreen(props) {
  const productId = props.match.params.id;
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');
  const [quantityInStock, setQuantityInStock] = useState('');
  const [brand, setBrand] = useState('');
  const [description, setDescription] = useState('');
const listCategory = useSelector((state) => state.listCategory);
  const {loading: loadingCategory, error: errorCategory, categories} = listCategory;
  const listBrand = useSelector((state) => state.listBrand);
  const {loading: loadingBrand, error: errorBrand, brands} = listBrand;

  const [qty, setQty] = useState('');
  const [size, setSize] = useState(0);
  const productDetails = useSelector((state) => state.productDetails);

  const { loading, error, product } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;
  const dispatch = useDispatch();
  useEffect(() => {
    if (successUpdate) {
      props.history.push('/products/productsManage');
    }
    if (!product || successUpdate) {
        dispatch({ type: PRODUCT_UPDATE_RESET })
        dispatch(detailsProduct(productId));
        dispatch(listProductCategories());
        dispatch(listProductBrands());
    } else {
        setName(product.productName);
        setPrice(product.productPrice);
        setImage(product.productdetails[0].image);
        setCategory(product.idCategory);
        setBrand(product.idBrand);
        setQty(product.productsizes[size].quantityInStock);
        setDescription(product.productDescription);
    }

    
  }, [product, dispatch, size, productId, successUpdate, props.history]);
  const submitHandler = (e) => {
    e.preventDefault();
    // TODO: dispatch update product
    dispatch(
      updateProduct({
        id: productId,
        name,
        price,
        image,
        category,
        brand,
        qty,
        size,
        description,
      })
    );
  };
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [errorUpload, setErrorUpload] = useState('');
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
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
  };
  function subString(x){
    const index = x.indexOf("image");
    const pathImage = x.slice(index, x.length);
    return  "..//../" + pathImage;
  };
  



  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Edit Product {name}</h1>
        </div>

        {loadingUpdate && <LoadingBox></LoadingBox>}
        {errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (   
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
          {
              image ? (
                <img src={image} alt =""/>
              ) : (
                <div></div>
              )
            }
            <div>
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
              <label htmlFor="image">Image</label>
              <input
                id="image"
                type="text"
                placeholder="Enter image"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="imageFile">Image File</label>
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
              <label htmlFor="category">Category</label>
              <select className="categories-list" 
                      value={category}  
                      onChange={(e) => setCategory(e.target.value)}
              >
               <option value=""  disabled hidden>Choose here</option>
              { categories ? (
              categories.map((category) => (
                 <option className= "category-select" key ={category.idCategory} value={category.idCategory}>
                   {category.categoryName}
                 </option>
              ))) : (
                <option value=""></option>
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
              brands.map((x) => (
                 <option  className= "category-select" key ={x.idBrand} value={x.idBrand}>
                   {x.brandName}
                 </option>
              ))) : (
                <option value={brand}> {product.brand.brandName}</option>
              )
              }
              </select>
              {loadingBrand && <LoadingBox></LoadingBox>}
              {errorBrand && <MessageBox variant="danger">{errorBrand}</MessageBox>} 
          </div>
            <div>
                  <p/>   
                      Kích thước: &nbsp;
                      <select className="item-sizes" 
                        value={size}
                        onChange={(e) => setSize(e.target.value)}
                      >
                          {product.productsizes.map((x)  => (
                              <option key={x.idSize} value={x.idSize-1}>
                                  {x.productSize}
                                </option>
                                )
                              )}
                        </select>
                    <p/>         
              </div>
                    <div className="quantity-button"> Số lượng: &nbsp;
                            <input className="input" type="text" value={qty} onChange={e => setQty(e.target.value)} />
                    </div>
            <div>
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                rows="3"
                type="text"
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>               
            <div>
              <label></label>
              <button className="primary" type="submit">
                Update
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}