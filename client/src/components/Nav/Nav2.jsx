import Arrow from "@heroicons/react/outline/ArrowNarrowUpIcon";
import { useSelector, useDispatch } from "react-redux";
import {
  setFilteredProducts,
  setProducts,
} from "../../features/product/productSlice";

const Nav2 = ({ cats }) => {
  const dispatch = useDispatch();

  async function getProds(event) {
    const cat = event.target.id;
    const response = await fetch("/api/prodbycat?cat=" + cat);
    const data = await response.json();
    dispatch(setProducts(data));
    dispatch(setFilteredProducts(data));
  }

  return (
    <>
      <div className="bg-medi-100 sm:sticky bottom-0 right-0 left-0  md:px-6 h-15 flex  items-center text-lg text-white text-center z-10">
        {cats?.map((cat) => {
          return (
            <h3
              key={cat._id}
              id={cat.slug}
              onClick={getProds}
              className="cursor-pointer px-4 py-2 w-1/5 relative hover:text-white link_line "
            >
              {cat.title}
            </h3>
          );
        })}
      </div>
      <div className="fixed w-10 right-10 bottom-20 ring-2 ring-medi-100 rounded-full z-10">
        <a href="#">
          <Arrow className="text-medi-100" />
        </a>
      </div>
    </>
  );
};

export default Nav2;
