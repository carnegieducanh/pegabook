import React from "react";
import FavoriteBook from "./FavoriteBook";
import PromoBanner from "./PromoBanner";
import OtherBooks from "./OtherBooks";
import Review from "./Review";
import Hero from "./Hero";
import BestBooks from "../components/BestBooks";
import Banner from "./Banner";

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
