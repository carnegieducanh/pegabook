import React from "react";
import ImageBanner from "../components/ImageBanner";

const Gratitude = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <ImageBanner />

            <div className="py-10 px-4 lg:px-36 bg-[#fffffff2]">
                <h2 className="text-3xl "> "Lời cảm ơn" </h2>
            </div>
        </div>
    );
};

export default Gratitude;
