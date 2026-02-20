import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaLocationArrow,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useLanguage } from "../contects/LanguageProvider";

const Footer = () => {
  const { t } = useLanguage();

  const FooterLinks = [
    { link: t("footer.members"), path: "/Members" },
    { link: t("footer.sharers"), path: "/Sharers" },
    { link: t("footer.gratitude"), path: "/gratitude" },
  ];

  return (
    <div className="bg-[#F4F1EA] px-4 dark:bg-[#383323] dark:text-[#e8eaed] lg:px-24">
      <section className="container">
        <div className="flex flex-col justify-between py-5 md:flex-row">
          {/* company Details */}
          <div className="py-6">
            <h1 className="mb-5 text-4xl font-medium text-[#a69060]">
              PEGABOOK
            </h1>
            <p>{t("footer.tagline")}</p>
          </div>

          {/* Links */}
          <div className="col-span-3 hidden md:grid md:grid-cols-3 md:px-10 lg:grid-cols-4">
            <div className="">
              <div className="px-4 py-8">
                <h1 className="mb-3 text-justify sm:text-left sm:text-xl">
                  {t("footer.home")}
                </h1>
              </div>
            </div>
            <div className="">
              <div className="px-4 py-8">
                <h1 className="mb-3 text-justify sm:text-left sm:text-xl">
                  {t("footer.library")}
                </h1>
              </div>
            </div>
            <div className="">
              <div className="px-4 py-8">
                <h1 className="mb-3 text-justify sm:text-left sm:text-xl">
                  {t("footer.community")}
                </h1>
                <ul className="flex flex-col gap-3">
                  {FooterLinks.map(({ link, path }) => (
                    <Link
                      key={path}
                      to={path}
                      className="hover:text-primary cursor-pointer space-x-1 duration-300 hover:translate-x-1"
                    >
                      <span>&#11162;</span>
                      <span>{link}</span>
                    </Link>
                  ))}
                </ul>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="px-4 py-8">
                <h1 className="mb-3 text-justify sm:text-left sm:text-xl">
                  {t("footer.connect")}{" "}
                  <span className="text-xl font-medium text-[#a69060]">
                    Pegabook
                  </span>{" "}
                </h1>
                {/* Social Handle */}
                <div className="mt-6 flex items-center gap-3">
                  <div className="group">
                    <FaInstagram
                      data-aos="zoom-in"
                      className="transform text-3xl duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="group">
                    <FaFacebook
                      data-aos="zoom-in"
                      className="transform text-3xl duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="group">
                    <FaLinkedin
                      data-aos="zoom-in"
                      className="transform text-3xl duration-300 group-hover:scale-105"
                    />
                  </div>
                </div>
                <br />
                <div className="flex items-center gap-3 text-sm">
                  <FaLocationArrow />
                  <p>PEGABOOK JAPAN INC.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="md:hidden">
            <div className="py-8">
              <h1 className="mb-3 text-justify sm:text-left sm:text-xl">
                {t("footer.connect")}{" "}
                <span className="text-xl font-medium text-[#a69060]">
                  Pegabook
                </span>{" "}
              </h1>
              {/* Social Handle */}
              <div className="mt-6 flex items-center gap-3">
                <div className="group">
                  <FaInstagram
                    data-aos="zoom-in"
                    className="transform text-3xl duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="group">
                  <FaFacebook
                    data-aos="zoom-in"
                    className="group-hover:scale-1v05 transform text-3xl duration-300"
                  />
                </div>
                <div className="group">
                  <FaLinkedin
                    data-aos="zoom-in"
                    className="transform text-3xl duration-300 group-hover:scale-105"
                  />
                </div>
              </div>
              <br />
              <div className="flex items-center gap-3 text-sm">
                <FaLocationArrow />
                <p>PEGABOOK JAPAN INC.</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="border-t-2 border-gray-300/50 py-10 text-center dark:border-[#3c4043]">
            {t("footer.copyright")}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Footer;
