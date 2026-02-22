import React, { useState } from "react";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { useLanguage } from "../contexts/LanguageProvider";

function ToggleShowMore({ text }) {
  const { t } = useLanguage();
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
            className="mt-2 flex cursor-pointer items-center gap-1 font-semibold text-ocean hover:underline dark:text-azure"
            onClick={toggleShowFullText}
          >
            {t("seeMoreBtn.collapse")}
            <IoIosArrowUp />
          </a>
        </div>
      ) : (
        <div>
          {text.length > 200 ? (
            <div>
              {text.slice(0, 200)}...
              <a
                className="mt-2 flex cursor-pointer items-center gap-1 font-semibold text-ocean hover:underline dark:text-azure"
                onClick={toggleShowFullText}
              >
                {t("seeMoreBtn.seeMore")}
                <IoIosArrowDown />
              </a>
            </div>
          ) : (
            <div>{text}</div>
          )}
        </div>
      )}
      {!showFullText && (
        <div className="absolute bottom-8 w-full bg-gradient-to-b from-transparent to-white pt-10 dark:to-obsidian"></div>
      )}
    </div>
  );
}

export default ToggleShowMore;
