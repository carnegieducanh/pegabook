import pegaBanner from "../assets/pega-banner.jpg";

const ImageBanner = () => {
  return (
    <div>
      <img
        className="mt-[105px] block h-64 w-full shrink-0 object-cover lg:mt-[105px] lg:h-96"
        src={pegaBanner}
        alt=""
      />
    </div>
  );
};

export default ImageBanner;
