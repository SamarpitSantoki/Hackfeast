import { useEffect } from "react";
import { fetchProducts } from "../features/product/productSlice";
import Nav from "../components/Nav/Nav";
import Carousel from "../components/Carousel";
import Products from "../components/Products";
import Nav2 from "../components/Nav/Nav2";
import Footer from "../components/Footer/Footer";
import { useAppDispatch } from "../features/redux-hooks";
const cats = [
  { _id: 1, slug: "healthcare", title: "Health Care" },
  {
    _id: 2,
    slug: "covid-care",
    title: "Covid Care",
  },
  {
    _id: 3,
    slug: "devices",
    title: "Devices",
  },
  {
    _id: 4,
    slug: "baby-care",
    title: "Baby Care",
  },
  {
    _id: 5,
    slug: "medicine",
    title: "Medicine",
  },
];

function Home() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchProducts());
  }, []);
  return (
    <>
      <div className="w-screen lg:w-full inline-flex flex-col">
        <Nav />
        <div className="m-0 w-full">
          <Nav2 cats={cats} />
        </div>
        <div>
          <Carousel />
        </div>
        <img
          className="w-auto top-0"
          alt="carousel"
          src="/images/a_carousel.png"
          width={500}
          height={60}
        />
        <div className="container mx-auto py-5 md:py-20 max-w-8xl sm:min-w-[484px]">
          <div className="p-5 xl:p-0 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 items-start transition-all duration-500">
            <Products />
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}
export default Home;
