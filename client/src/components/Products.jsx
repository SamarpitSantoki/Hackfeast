import { getFilteredProducts } from "../features/product/productSlice";
import { addToCart } from "../features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../features/redux-hooks";

const Products = ({}) => {
  const dispatch = useAppDispatch();
  const prods = useAppSelector(getFilteredProducts);
  return (
    <>
      {prods.map((prod) => {
        return (
          <div
            key={prod._id}
            className="w-44 sm:w-full p-5 sm:py-12 text-left transform duration-500 hover:-translate-y-2 hover:shadow-2xl cursor-pointer bg-gray-200 rounded-xl hover:ring-medi hover:ring-2"
          >
            <span className="flex justify-center  overflow-hidden z-10 p-5">
              <img
                className="rounded-lg"
                src={prod.image}
                alt={prod.slug}
                width={60}
                height={60}
                layout="responsive"
              />
            </span>
            <h1
              className="text-base h-16 mt-4 
            text-ellipsis
            overflow-hidden"
            >
              {prod.title}
            </h1>
            <h2 className="font-semibold mb-4 mt-3">₹{prod.price}</h2>
            <button
              onClick={() => {
                dispatch(addToCart(prod));
                console.log(prod);
              }}
              id={prod.slug}
              className="p-2 px-6 bg-blue-500 text-white rounded-md hover:bg-red-600"
            >
              Add To Cart
            </button>
          </div>
        );
      })}
      {!prods.length && (
        <div className="text-gray-400 text-2xl">No Products</div>
      )}
    </>
  );
};

export default Products;
