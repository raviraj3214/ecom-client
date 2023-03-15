// import React, { useState, useEffect } from "react";
// import Layout from "./../components/Layout/Layout";
// import { useCart } from "../context/cart";
// import { useAuth } from "../context/auth";
// import { useNavigate } from "react-router-dom";
// // import DropIn from "braintree-web-drop-in-react";
// //import { AiFillWarning } from "react-icons/ai";
// import axios from "axios";
// import toast from "react-hot-toast";
// import "../styles/CartStyles.css";

// const CartPage = () => {
//   const [orderId, setOrderId] = useState('');
//   const [auth, setAuth] = useAuth();
//   const [cart, setCart] = useCart();
//   const [clientToken, setClientToken] = useState("");
//   const [instance, setInstance] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
//   const [cartUpdateTrigger, setCartUpdateTrigger] = useState(0);
//   //total price
//   const totalPrice = () => {
//   //   try {
//   //     let total = 0;
//   //     cart?.map((item) => {
//   //       return total = total + item.price;
//   //     });
//   //     return total.toLocaleString("en-IN", {
//   //       style: "currency",
//   //       currency: "INR",
//   //     });
//   //   } catch (error) {
//   //     console.log(error);
//   //   }
//   // };
//   const totalPrice = () => {
//     try {
//       let total = 0;
//       cart?.map((item) => {
//         return total = total + item.price;
//       });
//       return total;
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   //detele item
//   const removeCartItem = (pid) => {
//     try {
//       let myCart = [...cart];
//       let index = myCart.findIndex((item) => item._id === pid);
//       myCart.splice(index, 1);
//       setCart(myCart);
//       localStorage.removeItem("cart");
//       localStorage.setItem("cart", JSON.stringify(myCart));
     
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   //get payment gateway token
//   // const getToken = async () => {
//   //   try {
//   //     const axiosInstance = axios.create({
//   //       baseURL: process.env.REACT_APP_URL, // Set a base URL for all requests from this instance
//   //     });
//   //     const { data } = await axiosInstance.get("/api/v1/product/braintree/token");
//   //     setClientToken(data?.clientToken);
//   //   } catch (error) {
//   //     console.log(error);
//   //   }
//   // };
//   // useEffect(() => {
//   //   getToken();
//   // }, [auth?.token]);
//   const createOrder = async () => {
//     try {
//       const axiosInstance = axios.create({
//              baseURL: process.env.REACT_APP_URL, // Set a base URL for all requests from this instance
//            });
//       const response = await axiosInstance.post(`api/v1/product/razorpay/payment`, {
//         products: cart,
//         user_id: auth.user._id,
//         amount: totalPrice(),
//         address:auth.user.address,
//       });
//       setOrderId(response.data.id);
//       initiatePayment(orderId);
//     } catch (error) {
//       console.error('Error creating order:', error.response.data);
//     }
//   };

//   const initiatePayment = (orderId) => {
//     const axiosInstance = axios.create({
//       baseURL: process.env.REACT_APP_URL, // Set a base URL for all requests from this instance
//     });
//     if (orderId) {
//       const options = {
//         key: 'rzp_test_VQw8TktAkO3St6', // Ensure this is a string
//         amount: getAmount(), // Amount should be in paise (1 INR = 100 paise)
//         currency: 'INR',
//         order_id: orderId,
//         name: 'Ravi Raj',
//         description: 'Test Payment',
//         prefill: {
//           contact: 'user@example.com',
//           email: 'user@example.com'
//         },
//         theme: { color: '#3399cc' },
//         handler: function(response) {
//           // Send payment success data to the server
//           axiosInstance.post(`api/v1/product/razorpay/payment-success`, {
//             razorpay_payment_id: response.razorpay_payment_id,
//             razorpay_order_id: response.razorpay_order_id,
//             razorpay_signature: response.razorpay_signature
//           })
//           .then(response => {
//             localStorage.removeItem("cart");
//             setCart([]);
//             navigation.navigate('Orders');  // Navigate to Orders page
//           })
//           .catch(error => {
//             console.error('Error in payment success:', error);
//             Alert.alert('Error', 'Failed to process payment.');
//           });
//         },
//         modal: {
//           ondismiss: function() {
//             Alert.alert('Payment Cancelled', 'You have cancelled the payment.');
//           }
//         }
//       };
  
//       const rzp = new window.Razorpay(options);
//       rzp.open();
//     } else {
//       Alert.alert('Error', 'Order ID not found. Please create order first.');
//     }
//   };
  

//   //handle payments
//   // const handlePayment = async () => {
//   //   try {
//   //     setLoading(true);
//   //     const axiosInstance = axios.create({
//   //       baseURL: process.env.REACT_APP_URL, // Set a base URL for all requests from this instance
//   //     });
//   //     console.log("instance",instance)
//   //     const { nonce } = await instance.requestPaymentMethod();
//   //     console.log("nonce",nonce)
//   //     window.alert(nonce)
//   //     const { data } = await axiosInstance.post("/api/v1/product/braintree/payment", {
//   //       nonce,
//   //       cart,
//   //     });
//   //     setLoading(false);
//   //     localStorage.removeItem("cart");
//   //     setCart([]);
//   //     navigate("/dashboard/user/orders");
//   //     toast.success("Payment Completed Successfully ");
//   //   } catch (error) {
//   //     console.log("error error",error.response.data);
//   //     setLoading(false);
//   //   }
//   // };
//   useEffect(() => {
//     // The effect doesn't need to do anything, it just needs to be here to trigger the re-render
//   }, [cart]);
//   return (
//     <Layout>
    
//       <div className="container-fluid">
//       <div className="row">
//           <div className="col-12 mt-5 pt-4">
//             <h4 className="text-center pt-4">
//               {!auth?.user
//                 ? "Hello Guest"
//                 : `Hello ${auth?.token && auth?.user?.name}`}
//             </h4>
//             <h6 className="text-center pb-2">
//               {cart?.length
//                 ? `You Have ${cart.length} items in your cart ${
//                     auth?.token ? "" : "please login to checkout !"
//                   }`
//                 : " Your Cart Is Empty"}
//             </h6>
//           </div>
//         </div>
//         <div className="row d-flex justify-content-center ">
//           <div className="col-12 col-md-5 ">
//             {cart?.map((p) => (
//               <div className="card mb-3 mt-2 shadow"  style = {{maxWidth:"24rem"}} key={p._id}>
//               <div className="row g-0">
//                 <div className="col-md-4">
//                   <img src={`${process.env.REACT_APP_URL}/api/v1/product/product-photo/${p._id}`} className="img-fluid rounded-start" alt={p.name}/>
//                 </div>
//                 <div className="col-md-8">
//                   <div className="card-body">
//                     <h5 className="card-title">{p.name.substring(0,15)}...</h5>
//                     <p className="card-text">{p.description.substring(0, 24)}...</p>
//                     <p className="card-text text-muted">Price: {p.price.toLocaleString("en-IN", {
//                       style: "currency",
//                       currency: "INR",})}</p>
//                      <button
//                                 className="btn btn-danger"
//                                 onClick={() => removeCartItem(p._id)}
//                               >
//                                 Remove
//                               </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             ))}
//           </div>
//           <div className="col-12 col-md-3 cart-summary">
//             <h2>Cart Summary</h2>
//             <p>Total | Checkout | Payment</p>
//             <hr />
//             <h4>Total: {totalPrice()}</h4>
//             {auth?.user?.address ? (
//               <>
//                 <div className="mb-3">
//                   <h4>Current Address</h4>
//                   <h5>{auth?.user?.address}</h5>
//                   <button
//                     className="btn btn-outline-warning"
//                     onClick={() => navigate("/dashboard/user/profile")}
//                   >
//                     Update Address
//                   </button>
//                 </div>
//               </>
//             ) : (
//               <div className="mb-3">
//                 {auth?.token ? (
//                   <button
//                     className="btn btn-outline-warning"
//                     onClick={() => navigate("/dashboard/user/profile")}
//                   >
//                     Update Address
//                   </button>
//                 ) : (
//                   <button
//                     className="btn btn-outline-warning"
//                     onClick={() =>
//                       navigate("/login", {
//                         state: "/cart",
//                       })
//                     }
//                   >
//                     Please Login to checkout
//                   </button>
//                 )}
//               </div>
//             )}
//             <div className="mt-2">
//               {!clientToken || !auth?.token || !cart?.length ? (
//                 ""
//               ) : (
//                 <>
//                   {/* <DropIn
//                     options={{
//                       authorization: clientToken,
//                       paypal: {
//                         flow: "vault",
//                       },
//                     }}
//                     onInstance={(instance) => setInstance(instance)}
//                   /> */}

//                   <button
//                     className="btn btn-primary mb-2"
//                     onClick={createOrder}
//                     disabled={loading || !instance || !auth?.user?.address}
//                   >
//                     {loading ? "Processing ...." : "Make Payment"}
//                   </button>
//                 </>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
      
//     </Layout>
//   );
// };

// export default CartPage;
// import React, { useState, useEffect } from "react";
// import Layout from "./../components/Layout/Layout";
// import { useCart } from "../context/cart";
// import { useAuth } from "../context/auth";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import toast from "react-hot-toast";
// import "../styles/CartStyles.css";

// const CartPage = () => {
//   const [orderId, setOrderId] = useState('');
//   const [auth, setAuth] = useAuth();
//   const [cart, setCart] = useCart();
//   const [clientToken, setClientToken] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const totalPrice = () => {
//     try {
//       let total = 0;
//       cart?.forEach((item) => {
//         total += item.price;
//       });
//       return total;
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const removeCartItem = (pid) => {
//     try {
//       let myCart = [...cart];
//       let index = myCart.findIndex((item) => item._id === pid);
//       myCart.splice(index, 1);
//       setCart(myCart);
//       localStorage.setItem("cart", JSON.stringify(myCart));
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const createOrder = async () => {
//     try {
//       const axiosInstance = axios.create({
//         baseURL: process.env.REACT_APP_URL,
//       });
//       const response = await axiosInstance.post(`api/v1/product/razorpay/payment`, {
//         products: cart,
//         user_id: auth.user._id,
//         amount: totalPrice(),
//         address: auth.user.address,
//       });
//       setOrderId(response.data.id);
//       // initiatePayment(response.data.id); // Use the returned orderId directly
//       // console.log(response.data.id);
//     } catch (error) {
//       console.error('Error creating order:', error.response.data);
//     }
//   };
//   useEffect(()=>{
//    createOrder();
//   },[])

//   const initiatePayment = () => {
//     const axiosInstance = axios.create({
//       baseURL: process.env.REACT_APP_URL,
//     });

//     if (orderId) {
//       const options = {
//         key: 'rzp_test_VQw8TktAkO3St6',
//         amount: totalPrice() * 100, // Convert to paise
//         currency: 'INR',
//         order_id: orderId,
//         name: 'Ravi Raj',
//         description: 'Test Payment',
//         prefill: {
//           contact: auth.user.contact || 'user@example.com',
//           email: auth.user.email || 'user@example.com',
//         },
//         theme: { color: '#3399cc' },
//         handler: function(response) {
//           axiosInstance.post(`api/v1/product/razorpay/payment-success`, response)
//           .then(response => {
//             localStorage.removeItem("cart");
//             setCart([]);
//             navigate('/dashboard/user/orders'); // Correct the navigate function call
//           })
//           .catch(error => {
//             console.error('Error in payment success:', error);
//             alert('Failed to process payment.');
//           });
//         },
//         modal: {
//           ondismiss: function() {
//             alert('You have cancelled the payment.');
//           }
//         }
//       };

//       const rzp = new window.Razorpay(options);
//       rzp.open();
//     } else {
//       alert('Order ID not found. Please create order first.');
//     }
//   };

//   useEffect(() => {
//     // Trigger re-render when cart changes
//   }, [cart]);

//   return (
//     <Layout>
//       <div className="container-fluid">
//         <div className="row">
//           <div className="col-12 mt-5 pt-4">
//             <h4 className="text-center pt-4">
//               {!auth?.user ? "Hello Guest" : `Hello ${auth?.token && auth?.user?.name}`}
//             </h4>
//             <h6 className="text-center pb-2">
//               {cart?.length
//                 ? `You Have ${cart.length} items in your cart ${
//                     auth?.token ? "" : "please login to checkout !"
//                   }`
//                 : "Your Cart Is Empty"}
//             </h6>
//           </div>
//         </div>
//         <div className="row d-flex justify-content-center">
//           <div className="col-12 col-md-5">
//             {cart?.map((p) => (
//               <div className="card mb-3 mt-2 shadow" style={{ maxWidth: "24rem" }} key={p._id}>
//                 <div className="row g-0">
//                   <div className="col-md-4">
//                     <img src={`${process.env.REACT_APP_URL}/api/v1/product/product-photo/${p._id}`} className="img-fluid rounded-start" alt={p.name}/>
//                   </div>
//                   <div className="col-md-8">
//                     <div className="card-body">
//                       <h5 className="card-title">{p.name.substring(0, 15)}...</h5>
//                       <p className="card-text">{p.description.substring(0, 24)}...</p>
//                       <p className="card-text text-muted">Price: {p.price.toLocaleString("en-IN", {
//                         style: "currency",
//                         currency: "INR",
//                       })}</p>
//                       <button
//                         className="btn btn-danger"
//                         onClick={() => removeCartItem(p._id)}
//                       >
//                         Remove
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//           <div className="col-12 col-md-3 cart-summary">
//             <h2>Cart Summary</h2>
//             <p>Total | Checkout | Payment</p>
//             <hr />
//             <h4>Total: {totalPrice().toLocaleString("en-IN", {
//               style: "currency",
//               currency: "INR",
//             })}</h4>
//             {auth?.user?.address ? (
//               <>
//                 <div className="mb-3">
//                   <h4>Current Address</h4>
//                   <h5>{auth?.user?.address}</h5>
//                   <button
//                     className="btn btn-outline-warning"
//                     onClick={() => navigate("/dashboard/user/profile")}
//                   >
//                     Update Address
//                   </button>
//                 </div>
//               </>
//             ) : (
//               <div className="mb-3">
//                 {auth?.token ? (
//                   <button
//                     className="btn btn-outline-warning"
//                     onClick={() => navigate("/dashboard/user/profile")}
//                   >
//                     Update Address
//                   </button>
//                 ) : (
//                   <button
//                     className="btn btn-outline-warning"
//                     onClick={() =>
//                       navigate("/login", {
//                         state: "/cart",
//                       })
//                     }
//                   >
//                     Please Login to checkout
//                   </button>
//                 )}
//               </div>
//             )}
//             <div className="mt-2">
//               {!auth?.token || !cart?.length ? (
//                 ""
//               ) : (
//                 <>
//                   {/* Add the DropIn component if needed */}
//                   {/* <DropIn
//                     options={{
//                       authorization: clientToken,
//                       paypal: {
//                         flow: "vault",
//                       },
//                     }}
//                     onInstance={(instance) => setInstance(instance)}
//                   /> */}

//                   <button
//                     className="btn btn-primary mb-2"
//                     onClick={initiatePayment}
                  
//                   >
//                     Make payment 
//                   </button>
//                 </>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default CartPage;
import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import "../styles/CartStyles.css";

const CartPage = () => {
  const [orderId, setOrderId] = useState('');
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [clientToken, setClientToken] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const totalPrice = () => {
    try {
      let total = 0;
      cart?.forEach((item) => {
        total += item.price;
      });
      return total;
    } catch (error) {
      console.log(error);
    }
  };

  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  const createOrder = async () => {
    try {
      const axiosInstance = axios.create({
        baseURL: process.env.REACT_APP_URL,
      });
      const response = await axiosInstance.post(`api/v1/product/razorpay/payment`, {
        products: cart,
        user_id: auth.user._id,
        amount: totalPrice()*100,
        address: auth.user.address,
      });
      setOrderId(response.data.id);
      initiatePayment(response.data.id); // Use the returned orderId directly
    } catch (error) {
      console.error('Error creating order:', error.response.data);
    }
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const initiatePayment = async (orderId) => {
    const scriptLoaded = await loadRazorpayScript();
    if (!scriptLoaded) {
      alert('Failed to load Razorpay SDK. Are you online?');
      return;
    }

    const axiosInstance = axios.create({
      baseURL: process.env.REACT_APP_URL,
    });

    if (orderId) {
      const options = {
        key: 'rzp_test_VQw8TktAkO3St6',
        amount: totalPrice() * 100, // Convert to paise
        currency: 'INR',
        order_id: orderId,
        name: 'Ravi Raj',
        description: 'Test Payment',
        prefill: {
          contact: auth.user.contact || 'user@example.com',
          email: auth.user.email || 'user@example.com',
        },
        theme: { color: '#3399cc' },
        handler: function(response) {
          axiosInstance.post(`api/v1/product/razorpay/payment-success`, {
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
          })
          .then(response => {
            localStorage.removeItem("cart");
            setCart([]);
            navigate('/dashboard/user/orders'); // Correct the navigate function call
          })
          .catch(error => {
            console.error('Error in payment success:', error);
            alert('Failed to process payment.');
          });
        },
        modal: {
          ondismiss: function() {
            alert('You have cancelled the payment.');
          }
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } else {
      alert('Order ID not found. Please create order first.');
    }
  };

  useEffect(() => {
    // Trigger re-render when cart changes
  }, [cart]);

  return (
    <Layout>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 mt-5 pt-4">
            <h4 className="text-center pt-4">
              {!auth?.user ? "Hello Guest" : `Hello ${auth?.token && auth?.user?.name}`}
            </h4>
            <h6 className="text-center pb-2">
              {cart?.length
                ? `You Have ${cart.length} items in your cart ${
                    auth?.token ? "" : "please login to checkout !"
                  }`
                : "Your Cart Is Empty"}
            </h6>
          </div>
        </div>
        <div className="row d-flex justify-content-center">
          <div className="col-12 col-md-5">
            {cart?.map((p) => (
              <div className="card mb-3 mt-2 shadow" style={{ maxWidth: "24rem" }} key={p._id}>
                <div className="row g-0">
                  <div className="col-md-4">
                    <img src={`${process.env.REACT_APP_URL}/api/v1/product/product-photo/${p._id}`} className="img-fluid rounded-start" alt={p.name}/>
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h5 className="card-title">{p.name.substring(0, 15)}...</h5>
                      <p className="card-text">{p.description.substring(0, 24)}...</p>
                      <p className="card-text text-muted">Price: {p.price.toLocaleString("en-IN", {
                        style: "currency",
                        currency: "INR",
                      })}</p>
                      <button
                        className="btn btn-danger"
                        onClick={() => removeCartItem(p._id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="col-12 col-md-3 cart-summary">
            <h2>Cart Summary</h2>
            <p>Total | Checkout | Payment</p>
            <hr />
            <h4>Total: {totalPrice().toLocaleString("en-IN", {
              style: "currency",
              currency: "INR",
            })}</h4>
            {auth?.user?.address ? (
              <>
                <div className="mb-3">
                  <h4>Current Address</h4>
                  <h5>{auth?.user?.address}</h5>
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Update Address
                  </button>
                </div>
              </>
            ) : (
              <div className="mb-3">
                {auth?.token ? (
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Update Address
                  </button>
                ) : (
                  <button
                    className="btn btn-outline-warning"
                    onClick={() =>
                      navigate("/login", {
                        state: "/cart",
                      })
                    }
                  >
                    Please Login to checkout
                  </button>
                )}
              </div>
            )}
            <div className="mt-2">
              {!auth?.token || !cart?.length ? (
                ""
              ) : (
                <>
                  {/* Add the DropIn component if needed */}
                  {/* <DropIn
                    options={{
                      authorization: clientToken,
                      paypal: {
                        flow: "vault",
                      },
                    }}
                    onInstance={(instance) => setInstance(instance)}
                  /> */}

                  <button
                    className="btn btn-primary mb-2"
                    onClick={createOrder}
                    disabled={loading || !auth?.user?.address}
                  >
                    {loading ? "Processing ...." : "Make Payment"}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
