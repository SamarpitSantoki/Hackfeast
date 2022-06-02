import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../features/auth/authSlice";
const MyOrders = () => {
  const user = useSelector(getUser);
  const [orders, setOrders] = useState(null);
  useEffect(() => {
    fetchOrders();
  }, []);

  async function fetchOrders() {
    const { data } = await axios.get(`api/user/getorders?email=${user.email}`);
    setOrders(data);
  }
  return (
    <div className="mt-10 sm:mt-0">
      <div className="md:grid md:grid-cols-3 md:gap-6">
        <div className="md:col-span-1">
          <div className="px-4 sm:px-0">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              My Orders
            </h3>
            <p className="mt-1 text-sm text-gray-600">
              Use a permanent address where you can receive mail.
            </p>
          </div>
        </div>
        <div className="mt-5 md:mt-0 md:col-span-3">
          <div className="shadow overflow-hidden sm:rounded-md bg-gray-50">
            <div className="px-4 py-5 sm:p-6">
              <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-center">
                  <thead className="text-gray-500 font-light ">
                    <tr>
                      <th>Order ID</th>
                      <th>Amount</th>
                      <th>Date</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders?.map((order) => {
                      return (
                        <tr key={order._id}>
                          <td>
                            <Link
                              to={`/order?id=${order._id}&email=${order.email}`}
                            >
                              {order._id}
                            </Link>
                          </td>
                          <td>₹{order.amount}</td>
                          <td>{order.date}</td>
                          <td>{order.status}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="px-4 py-3 text-right sm:px-6">
              <button
                type="submit"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyOrders;
