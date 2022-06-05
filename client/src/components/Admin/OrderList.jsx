import { TrashIcon, StatusOnlineIcon } from "@heroicons/react/outline";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import ReactPaginate from "react-paginate";
import { useSelector } from "react-redux";
import { selectOrders } from "../../features/admin/adminSlice";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Link } from "react-router-dom";

const OrderList = () => {
  const list = useSelector(selectOrders);
  const [orderList, setOrderList] = useState(list);
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  async function getOrders() {
    const { data } = await axios.get("/api/admin/orders");
    setOrderList(data);
  }
  useEffect(() => {
    setOrderList(list);
  }, list);

  useEffect(() => {
    // Fetch items from another resources.
    const endOffset = itemOffset + 10;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    setCurrentItems(orderList?.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(orderList?.length / 10));
  }, [itemOffset, orderList]);

  //handle Pagination Click
  const handlePageClick = (event) => {
    const newOffset = (event.selected * 10) % orderList.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  const handleStatusUpdate = async (id, status) => {
    const { data } = await axios.post(`/api/admin/orders`, {
      status,
      id,
    });
    console.log(data);

    if (data.success) {
      toast.success(data.message);
      getOrders();
    } else {
      toast.error(data.message);
    }
  };

  return (
    <main className="relative w-full pb-8">
      {/* <!--modal content--> */}
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

      <div className="flex items-center justify-between py-7 px-10">
        <div>
          <h1 className="text-2xl font-semibold leading-relaxed text-gray-800">
            Orders
          </h1>
          <p className="text-sm font-medium text-gray-500">
            Let&apos;s grow to your business! Manage Your Orders
          </p>
        </div>
        <button
          onClick={getOrders}
          className="bg-medi-200 text-white rounded-md px-8 py-2 text-base font-medium hover:bg-medi-100 focus:outline-none focus:ring-2 focus:ring-green-300"
        >
          Update
        </button>
        <div
          className="fixed hidden inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
          id="my-modal"
        ></div>
      </div>
      {/* display categories here */}

      <table className="w-full border-b border-t border-gray-200">
        <thead>
          <tr className="text-sm font-medium text-gray-700 border-b border-gray-200">
            <td className="pl-10">
              <span> {"  "}</span>
              <div className="flex items-center gap-x-4">
                <span>Order ID</span>
              </div>
            </td>
            <td className="py-4 px-4 text-center">User Email</td>
            <td className="py-4 px-4 text-center">Amount</td>
            <td className="py-4 px-4 text-center">Status</td>
            <td className="py-4 px-4 text-center">Items</td>
          </tr>
        </thead>
        <tbody className="w-fit">
          {currentItems?.map((order) => {
            let status = order.status;
            return (
              <tr
                key={order._id}
                //loop for diff orders
                className="hover:bg-gray-100 transition-colors group"
              >
                <td className="flex gap-x-4 items-center py-4 pl-10">
                  <Link
                    to={`/order/${order._id}`}
                    state={{
                      order,
                      user: { email: order.email, fname: order.name },
                    }}
                  >
                    {order._id}
                  </Link>
                </td>

                <td className="font-medium text-center"> {order.email} </td>
                <td className="font-medium text-center"> {order.amount} </td>
                <td className="font-medium text-center">
                  <select
                    value={order.status}
                    name="status"
                    id={"status_" + order._id}
                    onChange={(event) => {
                      status = event.target.value;
                      console.log(status);
                    }}
                  >
                    <option value="pending">Pending</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                    <option value="processing">Processing</option>
                    <option value="on-way">On Way</option>
                  </select>
                </td>
                <td className="font-medium text-center">
                  {" "}
                  <span className="inline-block w-20 group-hover:hidden">
                    {order.orderArray.length}
                  </span>
                  <div className="hidden group-hover:flex group-hover:justify-center  group-hover:items-center group-hover:text-gray-500 group-hover:gap-x-2">
                    <button
                      className="p-2 hover:rounded-md hover:bg-gray-200 z-1"
                      onClick={() => {
                        toast.success("Order Deleted!", {
                          position: "bottom-center",
                          autoClose: 5000,
                          hideProgressBar: false,
                          closeOnClick: true,
                          pauseOnHover: true,
                          draggable: true,
                          progress: undefined,
                        });
                      }}
                    >
                      <TrashIcon
                        name={order._id}
                        className="w-6 h-6 fill-current z-0"
                      />
                    </button>
                    <button
                      className="p-2 hover:rounded-md hover:bg-gray-200 z-1"
                      onClick={() => {
                        handleStatusUpdate(order._id, status);
                      }}
                    >
                      <StatusOnlineIcon
                        name={order._id}
                        className="w-6 h-6 fill-current z-0"
                      />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="flex gap-x-2 justify-center pt-8 ">
        <ReactPaginate
          breakLabel="..."
          containerClassName="flex justify-between list-none pointer items-center h-10 space-x-3"
          activeLinkClassName="text-medi-300 text-white"
          pageLinkClassName="p-2 border-2 rounded-sm  text-medi-100 border-medi-200 hover:bg-medi-200 hover:text-white"
          pageRangeDisplayed={5}
          renderOnZeroPageCount={null}
          previousLabel={"← Previous"}
          nextLabel={"Next →"}
          pageCount={pageCount}
          onPageChange={handlePageClick}
          previousLinkClassName={"font-bold"}
          nextLinkClassName={"font-bold"}
          disabledClassName={"text-gray-500 cursor-not-allowed "}
          activeClassName={"text-white "}
        />
      </div>
    </main>
  );
};

export default OrderList;
