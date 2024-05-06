import React, { useState } from "react";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

function ToggleShowMore({ text }) {
    const [showFullText, setShowFullText] = useState(false);

    const toggleShowFullText = () => {
        setShowFullText(!showFullText);
    };
    return (
        <div>
            {showFullText ? (
                <div>
                    {text}
                    <a
                        className="flex items-center gap-1 hover:underline cursor-pointer font-semibold"
                        onClick={toggleShowFullText}
                    >
                        Show less
                        <IoIosArrowUp />
                    </a>
                </div>
            ) : (
                <div>
                    {text.length > 300 ? (
                        <div>
                            {text.slice(0, 300)}...
                            <a
                                className="flex items-center gap-1 hover:underline cursor-pointer font-semibold"
                                onClick={toggleShowFullText}
                            >
                                Show more
                                <IoIosArrowDown />
                            </a>
                        </div>
                    ) : (
                        <div>{text}</div>
                    )}
                </div>
            )}
        </div>
    );
}

export default ToggleShowMore;
