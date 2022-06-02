const carouselImage = [
  "../images/carousel/fast.jpg",
  "../images/carousel/covid_essential.jpg",
  "../images/carousel/healthcare.jpg",
  "../images/carousel/sale2.jpg",
  "../images/carousel/salr.jpg",
];

const Carousel = () => {
  return (
    <>
      <div
        className="w-full h-24 md:h-36 lg:h-48 xl:h-60 2xl:h-[400px] overflow-hidden space-x-0"
        id="slideset2"
      >
        {carouselImage.map((image) => {
          return <img key={image} className="m-0 p-0 " src={image} alt="" />;
        })}
      </div>
    </>
  );
};

export default Carousel;
