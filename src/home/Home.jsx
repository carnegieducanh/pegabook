import FavoriteBook from "./FavoriteBook";
import PromoBanner from "./PromoBanner";
import Review from "./Review";
import Hero from "./Hero";
import BestBooks from "../components/BestBooks";
import Banner from "./Banner";
import OtherBooks from "../components/OtherBooks";

const Home = () => {
  return (
    <div>
      <Banner />
      <Hero />
      <BestBooks />
      <FavoriteBook />
      <PromoBanner />
      <OtherBooks />
      <Review />
    </div>
  );
};

export default Home;
