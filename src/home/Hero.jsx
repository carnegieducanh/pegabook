import React from "react";
import Book1 from "../assets/books/book1.jpg";
import Book2 from "../assets/books/book2.jpg";
import Book3 from "../assets/books/book3.jpg";
import { Link } from "react-router-dom";
import { useLanguage } from "../contects/LanguageProvider";

const ImageList = [
  {
    id: 1,
    img: Book1,
    title: "Young Mungo",
    author: "Douglas Stuart",
    description:
      "Growing up in a housing estate in Glasgow, Mungo and James are born under different stars--Mungo a Protestant and James a Catholic--and they should be sworn enemies if they're to be seen as men at all. Yet against all odds, they become best friends as they find a sanctuary in the pigeon dovecote that James has built for his prize racing birds.",
  },
  {
    id: 2,
    img: Book2,
    title: "An Immense World",
    author: "Ed Yong",
    description:
      "The Earth teems with sights and textures, sounds and vibrations, smells and tastes, electric and magnetic fields. But every animal is enclosed within its own unique sensory bubble, perceiving but a tiny sliver of an immense world. This book welcomes us into a previously unfathomable dimension--the world as it is truly perceived by other animals.",
  },
  {
    id: 3,
    img: Book3,
    title: "Why We Sleep",
    author: "Matthew Walker",
    description:
      "\u201cWhy We Sleep is an important and fascinating book\u2026Walker taught me a lot about this basic activity that every person on Earth needs. I suspect his book will do the same for you.\u201d \u2014Bill Gates",
  },
];

const Hero = ({}) => {
  const { t } = useLanguage();

  const [imageId, setImageId] = React.useState(Book1);
  const [title, setTitle] = React.useState("Young Mungo");
  const [author, setAuthor] = React.useState("Douglas Stuart");
  const [description, setDescription] = React.useState(
    "Growing up in a housing estate in Glasgow, Mungo and James are born under different stars--Mungo a Protestant and James a Catholic--and they should be sworn enemies if they're to be seen as men at all. Yet against all odds, they become best friends as they find a sanctuary in the pigeon dovecote that James has built for his prize racing birds.",
  );

  const bgImage = {
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    width: "100%",
  };

  return (
    <>
      <div
        className="flex min-h-[550px] items-center justify-center bg-gray-100 px-4 py-4 duration-200 dark:bg-[#1e2022] dark:text-white sm:min-h-[650px] lg:px-24"
        style={bgImage}
      >
        <div className="container pb-8 sm:pb-0">
          <div className="grid grid-cols-1 sm:grid-cols-2">
            {/* text content section */}
            <div
              data-aos-once="true"
              className="order-2 flex flex-col justify-center gap-4 pr-4 pt-12 text-left sm:order-1 sm:pt-0"
            >
              <h1
                data-aos="zoom-out"
                data-aos-duration="500"
                data-aos-once="true"
                className="font-title text-5xl font-bold sm:text-6xl"
              >
                {title}
                <div>
                  <p className="my-4 text-right text-sm text-[#a69060]">
                    {t("hero.by")} {author}
                  </p>
                </div>
              </h1>
              <p
                data-aos="slide-up"
                data-aos-duration="500"
                data-aos-delay="100"
                className="text-md"
              >
                {description}
              </p>
              <div>
                <Link to="/all-books" className="block">
                  <button className="mt-12 block rounded bg-[#a69060] px-5 py-2 text-lg text-white transition-all duration-300 hover:bg-black sm:mx-0">
                    {t("hero.exploreBtn")}
                  </button>
                </Link>
              </div>
            </div>
            {/* Image section */}
            <div className="relative order-1 flex min-h-[450px] items-center justify-center sm:order-2 sm:min-h-[450px]">
              <div className="flex h-[300px] items-center justify-center overflow-hidden sm:h-[450px]">
                <img
                  data-aos="zoom-in"
                  data-aos-once="true"
                  src={imageId}
                  alt=""
                  className="mx-auto h-[300px] w-[300px] object-contain sm:h-[450px] sm:w-[450px] sm:scale-125 lg:h-96"
                />
              </div>
              <div className="absolute -bottom-[40px] flex justify-center gap-4 lg:-right-1 lg:top-1/2 lg:-translate-y-1/2 lg:flex-col lg:py-2">
                {ImageList.map((item) => (
                  <img
                    key={item.id}
                    data-aos="zoom-in"
                    data-aos-once="true"
                    src={item.img}
                    onClick={() => {
                      setImageId(
                        item.id === 1 ? Book1 : item.id === 2 ? Book2 : Book3,
                      );
                      setTitle(item.title);
                      setAuthor(item.author);
                      setDescription(item.description);
                    }}
                    alt=""
                    className="inline-block h-[100px] max-w-[100px] rounded-sm rounded-br-lg rounded-tr-lg object-contain shadow-xl duration-200 hover:scale-110"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
