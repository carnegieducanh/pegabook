import React from "react";
import pegaBanner from "../assets/pega-banner.jpg";

const ImageBanner = () => {
    return (
        <div>
            <img
                className="block mt-[105px] lg:mt-[105px] h-64 lg:h-96 w-full object-cover shrink-0 "
                src={pegaBanner}
                alt=""
            />
        </div>
    );
};

export default ImageBanner;
