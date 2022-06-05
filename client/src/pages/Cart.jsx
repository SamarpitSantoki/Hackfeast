import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Nav from "../components/Nav/Nav";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { getCart, clearCart, getUser } from "../features/auth/authSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(getUser);
  const cart = useSelector(getCart);
  const [address, setAddress] = useState({
    name: "",
    address: "",
    city: "",
    pincode: "",
    default: false,
  });
  const [addressModal, setAddressModal] = useState(false);
  const [total, setTotal] = useState(0);
  const [orders, setOrders] = useState(null);
  async function fetchOrders() {
    const { data } = await axios.get(`api/user/getorders?email=${user?.email}`);
    setOrders(data.length);
  }
  function initializeRazorpay() {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";

      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  }

  async function makePayment() {
    const res = await initializeRazorpay();

    if (!res) {
      alert("Razorpay SDK Failed to load");
      return;
    }

    // Make API call to the serverless API

    const data = await fetch("/api/payment/razorpay", {
      method: "POST",
      body: JSON.stringify({ amount: total }),
    }).then((t) => t.json());

    let options = {
      key: process.env.RAZORPAY_KEY, // Enter the Key ID generated from the Dashboard
      name: "MediCare",
      currency: data.currency,
      amount: total,
      order_id: data.id,
      description: "Thankyou for your test donation",
      image: "./images/logo_medi.png",
      handler: async function (response) {
        //call order saving from here and pass the extra data as well of items in the cart
        const { data } = await axios.post("/api/payment/confirm", {
          cart: cart,
          amount: total,
          response: response,
          email: user.email,
          name: user.fname,
          id: user.id,
          address: address,
        });
        if (data.success) {
          toast.success(data.message, {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          dispatch(clearCart([]));

          setTimeout(() => {
            navigate("/");
          }, 100);
        } else {
          toast.error(data.message, {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
        console.log(data);
      },
      prefill: {
        name: user.fname + " " + user.lname,
        email: user.email,
        contact: user?.phone || 9512084467,
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  useEffect(() => {
    let total = 0;
    cart.map((item) => {
      total += item.quntity * item.price;
    });
    fetchOrders();
    setTotal(total);
  }, []);

  function handleAddressChange(e) {
    e.preventDefault();
    setAddress({
      ...address,
      [e.target[0].name]: e.target[0].value,
      [e.target[1].name]: e.target[1].value,
      [e.target[2].name]: e.target[2].value,
      [e.target[3].name]: e.target[3].value,
      [e.target[4].name]: e.target[4].value,
    });
    setAddressModal(false);
  }

  if (user === null) {
    return (
      <>
        <div className="grid place-content-center space-y-2 h-screen text-6xl text-medi-200 bg-medi-700">
          <Link to="/auth/login">You have to Login First.</Link>
          <Link
            to="/auth/register"
            className="text-xl text-medi-100 border-t ml-3 w-fit border-slate-300"
          >
            Don&apos;t Have Account Click Here.
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Nav />
      <div className="py-10 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
        <div className="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
          <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
            <div className="flex flex-col justify-start items-start dark:bg-medi-200 bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
              <p className="text-lg md:text-xl dark:text-white font-semibold leading-6 xl:leading-5 text-medi-200">
                {user?.fname}&apos;s Cart
              </p>
              {cart.map((item) => {
                return (
                  <div
                    key={item.slug}
                    className="mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full"
                  >
                    <div className="flex justify-center sm:block pb-4 md:pb-8 w-full md:w-40 ">
                      <img
                        className="md:w-60 md:h-32 md:block"
                        src={item.image}
                        alt="med"
                      />
                    </div>
                    <div className="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full pb-8 space-y-4 md:space-y-0">
                      <div className="w-full flex flex-col justify-start items-start space-y-8">
                        <h3 className="text-xl dark:text-white xl:text-2xl font-semibold leading-6 text-gray-800">
                          {item.title}
                        </h3>
                        <div className="flex justify-start items-start flex-col space-y-2">
                          <p className="text-sm dark:text-white leading-none text-gray-800">
                            <span className="dark:text-white text-gray-300">
                              Expires on:{" "}
                            </span>
                            29/11/2024
                          </p>
                          <p className="text-sm dark:text-white leading-none text-gray-800">
                            <span className="dark:text-white text-gray-300">
                              Country of Origin:{" "}
                            </span>{" "}
                            India
                          </p>
                        </div>
                      </div>
                      <div className="flex justify-between space-x-8 items-start w-full">
                        <p className="text-base dark:text-white xl:text-lg leading-6">
                          ₹{item.price}
                          <span className="text-red-300 line-through">
                            {" "}
                            ₹{item.price + item.price * 0.1}
                          </span>
                        </p>
                        <p className="text-base dark:text-white xl:text-lg leading-6 text-gray-800">
                          {item.quntity}
                        </p>
                        <p className="text-base dark:text-white xl:text-lg font-semibold leading-6 text-gray-800">
                          ₹{item.quntity * item.price}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {cart.length > 0 && (
              <div className="flex justify-center  md:flex-row flex-col items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
                <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-medi-200 space-y-6">
                  <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">
                    Summary
                  </h3>
                  <div className="flex justify-center items-center w-full space-y-2 flex-col border-gray-200 border-b pb-4">
                    <div className="flex justify-between w-full">
                      <p className="text-base dark:text-white leading-4 text-gray-800">
                        Subtotal
                      </p>
                      <p className="text-base dark:text-gray-300 leading-4 text-gray-600">
                        ₹{total.toFixed(2)}
                      </p>
                    </div>
                    <div className="flex justify-between items-center w-full"></div>
                    <div className="flex justify-between items-center w-full">
                      <p className="text-base dark:text-white leading-4 text-gray-800">
                        Shipping
                      </p>
                      <p className="text-base dark:text-gray-300 leading-4 text-gray-600">
                        ₹50.00
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center w-full">
                    <p className="text-base dark:text-white font-semibold leading-4 text-gray-800">
                      Total
                    </p>
                    <p className="text-base dark:text-gray-300 font-semibold leading-4 text-gray-600">
                      ₹{(total + 50).toFixed(2)}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col justify-center px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-medi-200 space-y-6">
                  <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">
                    Shipping
                  </h3>
                  <div className="flex justify-between items-start w-full">
                    <div className="flex justify-center items-center space-x-4">
                      <div className="w-8 h-8">
                        <img
                          layout="responsive"
                          width={50}
                          height={50}
                          className="w-full h-full"
                          alt="logo"
                          src="/images/logo_medi.png"
                        />
                      </div>
                      <div className="flex flex-col justify-start items-center">
                        <p className="text-lg leading-6 dark:text-white font-semibold text-gray-800">
                          DPD Delivery
                          <br />
                          <span className="font-normal">
                            Delivery with 24 Hours
                          </span>
                        </p>
                      </div>
                    </div>
                    <p className="text-lg font-semibold leading-6 dark:text-white text-gray-800">
                      ₹50.00
                    </p>
                  </div>
                  <div className="w-full flex justify-center items-center">
                    <button
                      onClick={() => {
                        if (address.pincode === "") {
                          toast.error("Please Add Address");
                        } else {
                          makePayment();
                        }
                      }}
                      className="hover:bg-black dark:bg-white dark:text-gray-800 dark:hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 py-5 w-96 md:w-full bg-gray-800 text-base font-medium leading-4 text-white"
                    >
                      Place Order
                    </button>
                  </div>
                </div>
              </div>
            )}
            {cart.length <= 0 && (
              <div className="flex justify-center w-full">
                <p className="text-lg md:text-xl dark:text-white font-semibold leading-6 xl:leading-5 text-medi-200">
                  Cart is Empty
                </p>
              </div>
            )}
          </div>
          <div className="bg-gray-50 dark:bg-medi-200 w-full xl:w-96 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col">
            <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">
              Customer
            </h3>
            <div className="flex flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0">
              <div className="flex flex-col justify-start items-start flex-shrink-0">
                <div className="flex justify-center w-full md:justify-start items-center space-x-4 py-8 border-b border-gray-200">
                  <img
                    className="w-14 h-14"
                    src="/images/me.jpg"
                    alt="avatar"
                  />
                  <div className="flex justify-start items-start flex-col space-y-2">
                    <p className="text-base dark:text-white font-semibold leading-4 text-left text-gray-800">
                      {user?.fname} {user?.lname}
                    </p>
                    <p className="text-sm dark:text-gray-300 leading-5 text-gray-600">
                      {orders} Previous Orders
                    </p>
                  </div>
                </div>

                <div className="flex justify-center text-gray-800 dark:text-white md:justify-start items-center space-x-4 py-4 border-b border-gray-200 w-full">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5Z"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M3 7L12 13L21 7"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <p className="cursor-pointer text-sm leading-5 ">
                    {user?.email}
                  </p>
                </div>
              </div>
              <div className="flex justify-between xl:h-full items-stretch w-full flex-col mt-6 md:mt-0">
                <div className="flex justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 xl:space-y-12 md:space-y-0 md:flex-row items-center md:items-start">
                  {address.pincode && (
                    <div className="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4 xl:mt-8">
                      <p className="text-base dark:text-white font-semibold leading-4 text-center md:text-left text-gray-800">
                        Shipping Address
                      </p>
                      <p className="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
                        {address.address}, {address.city} - {address.pincode}
                      </p>
                    </div>
                  )}
                </div>
                <div className="flex w-full mt-3 bg-slate-300 justify-center items-center md:justify-start md:items-start">
                  <button
                    onClick={() => setAddressModal(true)}
                    className="w-full pt-6 md:mt-0 dark:border-white dark:hover:bg-gray-900 dark:bg-transparent dark:text-white py-5 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 border border-gray-800  2xl:w-full text-base font-medium leading-4 text-gray-800"
                  >
                    {address.pincode ? "Change Address" : "Add Address"}
                  </button>
                </div>
                {addressModal && (
                  <form
                    onSubmit={(event) => {
                      handleAddressChange(event);
                    }}
                    class="mt-5 bg-white rounded-lg shadow"
                  >
                    <div class="px-5 pb-5">
                      <input
                        name="name"
                        placeholder="name"
                        class=" text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
                      />
                      <input
                        name="address"
                        placeholder="address"
                        class=" text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
                      />
                      <div class="flex">
                        <div class="flex-grow w-1/4 pr-2">
                          <input
                            name="pincode"
                            placeholder="pincode"
                            class=" text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
                          />
                        </div>
                        <div class="flex-grow">
                          <input
                            name="city"
                            placeholder="city"
                            class=" text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
                          />
                        </div>
                      </div>
                      <div class="flex items-center pt-3">
                        <input
                          name="defualt"
                          type="checkbox"
                          class="w-4 h-4 text-black bg-gray-300 border-none rounded-md focus:ring-transparent"
                        />
                        <label
                          for="safeAdress"
                          class="block ml-2 text-sm text-gray-900"
                        >
                          Save as default address
                        </label>
                      </div>
                    </div>

                    <div class="px-5 "></div>
                    <hr class="mt-4" />
                    <div class="flex flex-row-reverse p-3">
                      <div class="flex-initial pl-3">
                        <button
                          type="submit"
                          class="flex items-center px-5 py-2.5 font-medium tracking-wide text-white capitalize   bg-black rounded-md hover:bg-gray-800  focus:outline-none focus:bg-gray-900  transition duration-300 transform active:scale-95 ease-in-out"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="24px"
                            viewBox="0 0 24 24"
                            width="24px"
                            fill="#FFFFFF"
                          >
                            <path d="M0 0h24v24H0V0z" fill="none"></path>
                            <path
                              d="M5 5v14h14V7.83L16.17 5H5zm7 13c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-8H6V6h9v4z"
                              opacity=".3"
                            ></path>
                            <path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm2 16H5V5h11.17L19 7.83V19zm-7-7c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zM6 6h9v4H6z"></path>
                          </svg>
                          <span class="pl-2 mx-1">Save</span>
                        </button>
                      </div>
                      <div class="flex-initial">
                        <button
                          type="button"
                          onClick={() => {
                            setAddressModal(false);
                          }}
                          class="flex items-center px-5 py-2.5 font-medium tracking-wide text-black capitalize rounded-md  hover:bg-red-200 hover:fill-current hover:text-red-600  focus:outline-none  transition duration-300 transform active:scale-95 ease-in-out"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="24px"
                            viewBox="0 0 24 24"
                            width="24px"
                          >
                            <path d="M0 0h24v24H0V0z" fill="none"></path>
                            <path d="M8 9h8v10H8z" opacity=".3"></path>
                            <path d="M15.5 4l-1-1h-5l-1 1H5v2h14V4zM6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9z"></path>
                          </svg>
                          <span class="pl-2 mx-1">Cancel</span>
                        </button>
                      </div>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
