import { useState } from "react";
import { MyDetails, MyAddressBook, MyOrders } from "../components/User";
import Nav from "../components/Nav/Nav";
const User = () => {
  const [field, setField] = useState();

  //render components acording to the selected field
  const renderSwitch = (field) => {
    switch (field) {
      case "My Details":
        return <MyDetails />;
      case "My Address Book":
        return <MyAddressBook />;
      case "My Orders":
        return <MyOrders />;
      default:
        return <MyDetails />;
    }
  };

  //handle the field change
  const handleChange = (event) => {
    setField(event.target.value);
    console.log("clicked");
  };

  return (
    <>
      <div className="w-screen lg:w-full inline-flex flex-col">
        <Nav />

        <div className="flex justify-center h-4/5 w-4/5 mx-auto md:my-10">
          <div className="flex md:w-full">
            <section className="flex navigation flex-col py-3 px-5 space-y-5 group-hover:cursor-pointer bg-gray-100 relative">
              <label
                htmlFor="section"
                className="text-3xl font-semibold absolute -top-24 right-3 w-full"
              >
                My Account
              </label>
              <button
                className="group hover:bg-medi-700 hover:text-medi-100 w-36 px-2 py-1 rounded-md"
                value={"My Details"}
                onClick={handleChange}
              >
                My Details
              </button>
              <button
                className="group hover:bg-medi-700 hover:text-medi-100 w-36 px-2 py-1 rounded-md"
                value={"My Address Book"}
                onClick={handleChange}
              >
                My address book
              </button>
              <button
                className="group hover:bg-medi-700 hover:text-medi-100 w-36 px-2 py-1 rounded-md"
                value={"My Orders"}
                onClick={handleChange}
              >
                My Orders
              </button>
            </section>
            <section className="bg-white sm:p-5 rounded-lg ">
              {renderSwitch(field)}
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default User;
