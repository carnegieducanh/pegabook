import { useEffect, useState } from "react";
import FavoriteBookImg from "../assets/favoritebook.jpg";
import { Link } from "react-router-dom";
import { Avatar } from "flowbite-react";
import SpinnerLoading from "../components/SpinnerLoading";
import { useLanguage } from "../contects/LanguageProvider";
import API_BASE_URL from "../config/api";

const FavoriteBook = () => {
  const { t } = useLanguage();

  const [latestMembers, setLatestMembers] = useState([]);
  const [totalMembers, setTotalMembers] = useState(0);
  const [totalBooks, setTotalBooks] = useState(0);
  const [totalViews, setTotalViews] = useState(0);

  useEffect(() => {
    fetch(`${API_BASE_URL}/all-members`)
      .then((res) => res.json())
      .then((members) => {
        setTotalMembers(members.length);
        const lastFiveMembers = members.slice(-7).reverse();
        setLatestMembers(lastFiveMembers);

        fetch(`${API_BASE_URL}/all-books`)
          .then((res) => res.json())
          .then((books) => {
            setTotalBooks(books.length);

            const totalBookViews = books.reduce((sum, book) => {
              const views = parseInt(book.views, 10);
              return sum + (isNaN(views) ? 0 : views);
            }, 0);

            setTotalViews(totalBookViews);
          });
      });
  }, []);

  return (
    <div className="my-20 flex flex-col-reverse items-center justify-between gap-12 px-4 lg:flex-row lg:px-24">
      <div className="flex-1">
        <img src={FavoriteBookImg} alt="" className="rounded" />
      </div>

      <div className="flex-2 space-y-6 lg:w-1/2">
        <h2 className="my-5 font-title text-5xl font-bold leading-snug md:w-3/4">
          {t("favorite.title")}
        </h2>
        <p className="mb-10 text-lg md:w-5/6">
          {t("favorite.description")}
        </p>
        {/* stats */}
        <div className="my-14 flex flex-row justify-between gap-6 md:w-3/4">
          <div>
            <h3 className="text-3xl font-bold">{totalMembers}+</h3>
            <p className="text-base">{t("favorite.members")}</p>
          </div>

          <div>
            <h3 className="text-3xl font-bold">{totalBooks}+</h3>
            <p className="text-base">{t("favorite.books")}</p>
          </div>

          <div>
            <h3 className="text-3xl font-bold">{totalViews}+</h3>
            <p className="text-base">{t("favorite.views")}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {latestMembers.length > 0 ? (
            <Avatar.Group>
              {latestMembers &&
                latestMembers.map((member, index) => (
                  <div key={index}>
                    <Avatar img={member.memberAvatar} rounded stacked />
                  </div>
                ))}

              <Avatar.Counter total={9} href="/Members" />
            </Avatar.Group>
          ) : (
            <SpinnerLoading />
          )}
        </div>

        <Link to="/Members">
          <button className="mt-12 block rounded bg-brand px-5 py-2 text-lg text-white transition-all duration-300 hover:bg-black">
            {t("favorite.exploreBtn")}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default FavoriteBook;
