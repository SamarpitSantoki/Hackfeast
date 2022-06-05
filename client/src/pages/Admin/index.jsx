import { useEffect, useState, useContext } from "react";
import axios from "axios";
import {
  ProductList,
  OrderList,
  CategoryList,
  UserList,
} from "../../components/Admin";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getIsAdmin } from "../../features/auth/authSlice";
import {
  getProducts,
  getCategories,
  getOrders,
  getUsers,
  selectCategories,
  selectOrders,
  selectProducts,
  selectUsers,
} from "../../features/admin/adminSlice";
const Index = () => {
  const user = useSelector(getIsAdmin);
  const dispatch = useDispatch();
  const prods = useSelector(selectProducts);
  const cats = useSelector(selectCategories);
  const users = useSelector(selectUsers);
  const orders = useSelector(selectOrders);

  const { isAdmin } = user;
  const [field, setField] = useState();
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    async function getcollections() {
      const { data } = await axios.get("api/admin/getcollections");
      setCollections(data);
    }
    dispatch(getCategories());
    dispatch(getOrders());
    dispatch(getProducts());
    dispatch(getUsers());
    getcollections();
  }, []);

  //render components acording to the selected field
  const renderSwitch = (field) => {
    switch (field) {
      case "users":
        return <UserList users={users} />;
      case "orders":
        return <OrderList orders={orders} />;
      case "categories":
        return <CategoryList cats={cats} />;
      default:
        return <ProductList />;
    }
  };

  //handle the field change
  const handleFieldChange = async (event) => {
    setField(event.target.value);
    let current = document.getElementsByClassName(
      " active scale-y-100 translate-x-0"
    );

    while (current.length > 0) {
      current[0].className = current[0].className.replace(
        " active scale-y-100 translate-x-0",
        " scale-y-0 -translate-x-full"
      );
    }
    event.target.firstChild.className =
      event.target.firstChild.className.replace(
        " scale-y-0 -translate-x-full",
        " active scale-y-100 translate-x-0"
      );
  };
  console.log(isAdmin);

  if (isAdmin) {
    return (
      <div className="grid place-content-center bg-medi-700 h-screen">
        <div className="text-medi-300 text-6xl">
          <Link to="/">You are not authorized to view this page.</Link>
        </div>
      </div>
    );
  } else {
    return (
      <>
        <div>
          <div className="w-fit lg:w-full min-h-screen font-sans text-gray-900 bg-gray-50 flex">
            {/* SideBar */}
            <aside className="py-6 px-10 w-64 border-r border-gray-200">
              {/* <Image
              src="/images/logo.jpg"
              width="150px"
              height={48}
              alt="Logo"
              className="w-28"
            /> */}

              <Link
                to="/"
                className="text-4xl font-semibold px-4 py-2 ring-2 ring-medi-200 w-fit text-medi-200"
              >
                MediCare
              </Link>
              <ul id="myDIV" className="flex flex-col gap-y-6 pt-20">
                {collections?.map((collection) => {
                  return (
                    <button
                      key={collection}
                      onClick={handleFieldChange}
                      value={collection}
                      className="btn flex gap-x-4 active items-center py-2 text-gray-500 hover:text-indigo-600 group"
                    >
                      <span className="absolute w-1.5 h-8 bg-indigo-600 rounded-r-full left-0 group-hover:scale-y-100 group-hover:translate-x-0 transition-transform ease-in-out scale-y-0 -translate-x-full" />

                      {collection}
                    </button>
                  );
                })}
              </ul>
            </aside>
            {renderSwitch(field)}
          </div>
        </div>
      </>
    );
  }
};

export default Index;
