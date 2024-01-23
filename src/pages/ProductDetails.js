import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import axios from "axios";
import { useCart } from "../context/cart";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Spinner2 from "../components/Spinner/Spin";
import { ScrollMenu,VisibilityContext } from 'react-horizontal-scrolling-menu';
import 'react-horizontal-scrolling-menu/dist/styles.css';
import "../styles/ProductDetailsStyles.css";

const ProductDetails = () => {
  const params = useParams();
  const [cart, setCart] = useCart();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Added loading state
  const navigate = useNavigate();

  //initalp details
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);
  //getProduct
  const getProduct = async () => {
    try {
      setLoading(true); // Set loading to true while fetching data
      const instance = axios.create({
        baseURL: process.env.REACT_APP_URL, // Set a base URL for all requests from this instance
      });
      const { data } = await instance.get(
        `/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };
  //get similar product
  const getSimilarProduct = async (pid, cid) => {
    try {
      const instance = axios.create({
        baseURL: process.env.REACT_APP_URL, // Set a base URL for all requests from this instance
      });
      const { data } = await instance.get(
        `/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
      setLoading(false); 
    } catch (error) {
      console.log(error);
    }
  };
  if (loading) {
    return (
      <>       <Spinner2 />
      </>
        
    );
  }

  else{
  
  return (
    <Layout>
      <div className="row container product-details col-12 col-md-8 mx-auto ">
        <div className="card m-md-2 m-0 img-w" style={{ borderColor:"#fff" }} >
          <img
            src={`${process.env.REACT_APP_URL}/api/v1/product/product-photo/${product._id}`}
            className="card-img px-auto px-md-3 pt-md-4 w-100"
            alt={product.name}
          />
        </div>
        <div className="col-md-8 product-details-info">
          <h1 className="text-center">PRODUCT DETAILS</h1>
          <hr />
          <h6>Name : {product.name}</h6>
          <h6>Description : {product.description}</h6>
          <h6>
            Price :
            {product?.price?.toLocaleString("en-IN", {
              style: "currency",
              currency: "INR",
            })}
          </h6>
          <h6>Category : {product?.category?.name}</h6>
          <button class="btn btn-dark ms-1 mb-2"  onClick={() => {
                        setCart([...cart, product]);
                        localStorage.setItem(
                          "cart",
                          JSON.stringify([...cart, product])
                        );
                        toast.success("Item Added to cart");
                      }}>ADD TO CART</button>
        </div>
      </div>
      <hr />
      <div className="row container-fluid similar-products">
        <h4 style={{textAlign:"center",}}>Similar Products</h4>
        {relatedProducts.length < 1 && (
          <p className="text-center">No Similar Products found</p>
        )}
        <ScrollMenu
        
      >
          {relatedProducts?.map((p) => (
            <div className="card m-3  card-mob" key={p._id}>
              <img
                src={`${process.env.REACT_APP_URL}/api/v1/product/product-photo/${p._id}`}
                className="card-img-top"
                alt={p.name}
                onClick={() => navigate(`/product/${p.slug}`)}
              />
              <div className="card-body">
                <div className="card-name-price">
                  <h5 className="card-title title">{p.name}</h5>
                  <h5 className="card-title card-price">
                    {p.price.toLocaleString("en-IN", {
                      style: "currency",
                      currency: "INR",
                    })}
                  </h5>
                </div>
                <p className="card-text title">
                  {p.description}
                </p>
                <div className="card-name-price">
                <button class="btn btn-primary ms-1 txt" onClick={() => navigate(`/product/${p.slug}`)}>MORE DETAILS</button>

                <button class="btn btn-dark ms-1 txt"  onClick={() => {
                        setCart([...cart, p]);
                        localStorage.setItem(
                          "cart",
                          JSON.stringify([...cart, p])
                        );
                        toast.success("Item Added to cart");
                      }}>ADD TO CART</button>

                </div>
              </div>
            </div>
          ))}
          </ScrollMenu>

      </div>
    </Layout>
  );}

};

export default ProductDetails;
