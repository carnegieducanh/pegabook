import React, { useState } from "react";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

function ToggleShowMore({ text }) {
    const [showFullText, setShowFullText] = useState(false);

    const toggleShowFullText = () => {
        setShowFullText(!showFullText);
    };

    return (
        <div className="relative whitespace-pre-line">
            {showFullText ? (
                <div>
                    {text}
                    <a
                        className="flex items-center gap-1 cursor-pointer font-semibold text-[#02598b] hover:underline mt-2"
                        onClick={toggleShowFullText}
                    >
                        Thu gọn
                        <IoIosArrowUp />
                    </a>
                </div>
            ) : (
                <div>
                    {text.length > 300 ? (
                        <div>
                            {text.slice(0, 300)}...
                            <a
                                className="flex items-center gap-1 cursor-pointer font-semibold text-[#02598b] hover:underline mt-2"
                                onClick={toggleShowFullText}
                            >
                                Xem thêm
                                <IoIosArrowDown />
                            </a>
                        </div>
                    ) : (
                        <div>{text}</div>
                    )}
                </div>
            )}
            {!showFullText && (
                <div className="bg-gradient-to-b from-transparent to-white pt-10 w-full absolute bottom-8"></div>
            )}
        </div>
    );
}

export default ToggleShowMore;
