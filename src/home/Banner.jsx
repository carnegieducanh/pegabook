import BannerCard from "./BannerCard";
import SearchBooks from "../components/SearchBooks";
import { useLanguage } from "../contects/LanguageProvider";

const Banner = () => {
  const { t } = useLanguage();

  return (
    <div className="bg-gray-200 px-4 shadow-md dark:bg-obsidian lg:px-24">
      <div className="flex flex-col justify-center gap-12 py-28 md:flex-row md:justify-between md:py-40">
        {/* left side */}
        <div className="h-full space-y-8 md:w-1/2">
          <h2 className="font-title text-4xl font-bold leading-snug text-black dark:text-white">
            {t("banner.title")}{" "}
            <span className="text-brand">Pegabook Japan</span>
          </h2>
          <p className="text-lg md:w-4/5">{t("banner.description")}</p>
          <div className="md:w-2/3">
            <SearchBooks />
          </div>
        </div>

        {/* Right side */}
        <div>
          <BannerCard></BannerCard>
        </div>
      </div>
    </div>
  );
};

export default Banner;
