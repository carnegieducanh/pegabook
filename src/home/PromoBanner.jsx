import { Link } from "react-router-dom";
import promoBannerPic from "../assets/Promo Banner Pic.jpg";
import { useLanguage } from "../contects/LanguageProvider";

const PromoBanner = () => {
  const { t } = useLanguage();

  return (
    <div className="mt-16 bg-gray-100 px-4 py-12 dark:bg-void lg:px-24">
      <div className="flex flex-col items-center justify-between gap-12 md:flex-row">
        <div className="md:w-1/2">
          <h2 className="mb-6 font-title text-4xl font-bold leading-snug">
            {t("promo.title")}
          </h2>
          <p className="mb-10 text-lg md:w-5/6">{t("promo.description")}</p>
          <Link to="/all-books">
            <button className="block rounded bg-brand px-5 py-2 text-lg text-white transition-all duration-300 hover:bg-black">
              {t("promo.exploreBtn")}
            </button>
          </Link>
        </div>

        <div className="md:w-1/2">
          <img src={promoBannerPic} alt="" className="rounded-md" />
        </div>
      </div>
    </div>
  );
};

export default PromoBanner;
