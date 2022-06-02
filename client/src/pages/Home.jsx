import { Suspense, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../features/product/productSlice";
import Nav from "../components/Nav/Nav";
import Carousel from "../components/Carousel";
import Products from "../components/Products";
import Nav2 from "../components/Nav/Nav2";
import Footer from "../components/Footer/Footer";
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
// function Home() {
//   const dispatch = useDispatch();
//   dispatch(fetchProducts());

//   return (
//     <>
//       <Nav />

//       <div className="bg-red-300">Hellow</div>
//     </>
//   );
// }

function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProducts());
    console.log("runnig");
  }, []);
  return (
    <>
      <div className="w-fit lg:w-full inline-flex flex-col">
        <Nav />
        <div className="m-0 w-full">
          <Nav2 cats={cats} />
        </div>
        <div>
          <Carousel />
        </div>
        <img
          alt="carousel"
          src="/images/a_carousel.png"
          className="w-auto top-0"
          layout="responsive"
          width={500}
          height={60}
        />
        {/* display prods Here  */}
        <Suspense fallback={<div>Loading...</div>}>
          <div className="container mx-auto py-5 md:py-20 max-w-8xl min-w-[484px]">
            <div className="p-5 xl:p-0 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 items-start transition-all duration-500">
              <Products />
            </div>
          </div>
        </Suspense>
        <Footer />
      </div>
    </>
  );
}
export default Home;
