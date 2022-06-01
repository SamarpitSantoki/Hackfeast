import { useEffect } from "react";

function Home() {
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
        <Image
          alt="carousel"
          src="/images/a_carousel.png"
          className="w-auto sticky top-0"
          layout="responsive"
          width={500}
          height={60}
        />
        {/* display prods Here  */}
        <div className="container mx-auto py-5 md:py-20 max-w-8xl min-w-[484px]">
          <div className="p-5 xl:p-0 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 items-start transition-all duration-500">
            <Products prods={filteredProducts} addToCart={addToCart} />
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}
export default Home;
