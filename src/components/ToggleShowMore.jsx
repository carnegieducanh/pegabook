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
            className="text-ocean dark:text-azure mt-2 flex cursor-pointer items-center gap-1 font-semibold hover:underline"
            onClick={toggleShowFullText}
          >
            Thu gọn
            <IoIosArrowUp />
          </a>
        </div>
      ) : (
        <div>
          {text.length > 200 ? (
            <div>
              {text.slice(0, 200)}...
              <a
                className="text-ocean dark:text-azure mt-2 flex cursor-pointer items-center gap-1 font-semibold hover:underline"
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
        <div className="dark:to-obsidian absolute bottom-8 w-full bg-gradient-to-b from-transparent to-white pt-10"></div>
      )}
    </div>
  );
}

export default ToggleShowMore;
