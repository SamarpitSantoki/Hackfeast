import { ShoppingCartIcon, MenuIcon, UserIcon } from "@heroicons/react/outline";
import productContext from "../../contexts/Products/productContext";
import { useContext, useEffect } from "react";
import axios from "axios";
import userContext from "../../contexts/User/userContext";
import Link from "next/link";
import Router from "next/router";
import Image from "next/image";

const Nav = () => {
  // function for toggling dropdown menu
  const { searchValue, setSearchValue, setFilteredProducts, products } =
    useContext(productContext);
  const { user, cart, setCart, setIsAdmin, setIsAuthenticated, setUser } =
    useContext(userContext);

  useEffect(() => {
    if (Router.query.search) {
      setSearchValue(Router.query.search);
    }
    return setSearchValue("");
  }, []);

  // function to search products
  async function handleSearchSubmit(event) {
    event.preventDefault();
    let search = searchValue.toString().replace(/\s+/g, "-").toLowerCase();
    if (Router.pathname !== "/") {
      Router.push("/?search=" + search);
    }
    const res = await axios.get(`/api/products/search?search=${search}`);
    await Router.replace(`/?search=${search}`);
    await setFilteredProducts(res.data);
  }

  async function handleSearch(event) {
    let search = event.target.value;

    let search_slug = event.target.value
      .toString()
      .replace(/\s+/g, "-")
      .toLowerCase();
    if (search_slug) {
      const prods = products.filter((prod) => {
        if (prod.slug.includes(search_slug)) {
          return prod;
        }
      });
      setSearchValue(search);
      setFilteredProducts(prods);
    } else {
      setSearchValue(search);
      setFilteredProducts(products);
    }
  }

  //function to handle Logout
  async function handleLogout() {
    setCart([]);
    setIsAdmin(false);
    setIsAuthenticated(false);
    setUser(null);
    sessionStorage.clear();
  }

  function dropdownClick() {
    let state = document.getElementById("dropdown").className;
    let btn = document.getElementById("toggler");

    if (state == "hidden sm:hidden") {
      document.getElementById("dropdown").className = "flex sm:hidden";
      btn.className = "bg-[#34A19C] rounded-md sm:hidden";
    } else {
      document.getElementById("dropdown").className = "hidden sm:hidden";
      btn.className =
        "bg-[#00a59c] rounded-md shadow-sm shadow-gray-500 sm:hidden";
    }
  }

  function handleClearCart() {
    setCart([]);
    localStorage.removeItem("cart");
  }
  return (
    <div className="flex flex-col m-0 w-full sticky top-0 z-50">
      <div className="bg-medi-100 z-50 w-full px-6 h-20 flex justify-between items-center">
        <div className="w-3/4 space-x-4 inline-flex justify-start items-center">
          <Link href="/">
            <a>
              <Image
                height="48px"
                width="150px"
                className="h-12"
                src="/images/logo.jpg"
                alt=""
              />
            </a>
          </Link>
          <form
            className="sm:flex sm:w-full hidden"
            onSubmit={(e) => {
              e.preventDefault();
              handleSearchSubmit(e);
            }}
          >
            <input
              className="w-5/6 rounded-sm focus:outline focus:outline-2 focus:outline-offset-0 py-1 px-2 focus:outline-blue-500 placeholder:italic "
              type="search"
              name="search"
              id="prod_search"
              placeholder="Search"
              value={searchValue}
              onChange={handleSearch}
            />
            <button
              type="submit"
              className="flex items-center uppercase font-light text-sm h-8 text-green-300 justify-center mx-2 px-5 py-2 outline outline-2 rounded outline-green-500"
            >
              Search
            </button>
          </form>
        </div>
        <div className="flex space-x-3 text-white text-[1.05rem] items-center">
          <div className="flex-col items-center group space-x-2 relative">
            <Link href="/cart">
              <a className="inline-flex relative items-center text-center pt-2">
                <ShoppingCartIcon className="w-6" />
                Cart
                <span className="ml-1">{cart.length}</span>
              </a>
            </Link>
            {cart.length > 0 && (
              <ul className="absolute p-3 right-0 w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white group-hover:block hidden">
                <li
                  onClick={handleClearCart}
                  className="w-full px-4 py-2  border-gray-200 rounded-lg hover:bg-gray-200 dark:border-gray-600 cursor-pointer"
                >
                  Clear Cart
                </li>
              </ul>
            )}
          </div>

          <div className={user == null ? "inline-flex" : "inline-flex "}>
            <UserIcon className="w-6 " />
            {user == null ? (
              <>
                <Link href="/auth/login">
                  <a>Login</a>
                </Link>
                /
                <Link href="/auth/register">
                  <a>SignUp</a>
                </Link>
              </>
            ) : (
              <span className="duration-1000 transition-all ease-in relative group">
                {" "}
                <Link href="/user">
                  <a>{user.fname}</a>
                </Link>
                <ul className="absolute p-3 right-0 w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white group-hover:block hidden">
                  <Link href="/user">
                    <a>
                      <li className="w-full px-4 py-2 border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                        Profile
                      </li>
                    </a>
                  </Link>

                  <li
                    onClick={handleLogout}
                    className="w-full px-4 py-2 border-b border-gray-200 dark:border-gray-600 hover:bg-red-500 rounded-md"
                  >
                    Logout
                  </li>
                </ul>
              </span>
            )}
          </div>
          <button
            onClick={dropdownClick}
            id="toggler"
            className="bg-[#00a59c] rounded-md shadow-sm shadow-gray-500 sm:hidden"
          >
            <MenuIcon className="w-10" color="white" />
          </button>
        </div>
      </div>
      <div id="dropdown" className="hidden sm:hidden">
        <form
          className="flex bg-medi-100 w-full p-3 mx-auto"
          onSubmit={(e) => {
            e.preventDefault();
            handleSearchSubmit(e);
          }}
        >
          <input
            className="w-5/6 rounded-sm focus:outline focus:outline-2 focus:outline-offset-0 py-1 px-2 focus:outline-blue-500 placeholder:italic "
            type="search"
            name="search"
            id="prod_search"
            placeholder="Search"
            onChange={handleSearch}
          />
          <button
            type="submit"
            className="flex items-center uppercase font-light text-sm h-8 text-green-300 justify-center mx-2 px-5 py-2 outline outline-2 rounded outline-green-500"
          >
            Search
          </button>
        </form>
      </div>
    </div>
  );
};

export default Nav;
