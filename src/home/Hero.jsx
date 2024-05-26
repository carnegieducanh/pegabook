import React from "react";
import Book1 from "../assets/books/book1.jpg";
import Book2 from "../assets/books/book2.jpg";
import Book3 from "../assets/books/book3.jpg";
import { Link } from "react-router-dom";

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
            "“Why We Sleep is an important and fascinating book…Walker taught me a lot about this basic activity that every person on Earth needs. I suspect his book will do the same for you.” —Bill Gates",
    },
];

const Hero = ({}) => {
    const [imageId, setImageId] = React.useState(Book1);
    const [title, setTitle] = React.useState("Young Mungo");
    const [author, setAuthor] = React.useState("Douglas Stuart");
    const [description, setDescription] = React.useState(
        "Growing up in a housing estate in Glasgow, Mungo and James are born under different stars--Mungo a Protestant and James a Catholic--and they should be sworn enemies if they're to be seen as men at all. Yet against all odds, they become best friends as they find a sanctuary in the pigeon dovecote that James has built for his prize racing birds."
    );

    const bgImage = {
        // backgroundImage: `url(${Vector})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        // height: "100%",
        width: "100%",
    };

    return (
        <>
            <div
                className="py-4 px-4 lg:px-24 min-h-[550px] sm:min-h-[650px] bg-gray-100 flex justify-center items-center dark:bg-gray-950 dark:text-white duration-200"
                style={bgImage}
            >
                <div className="container pb-8 sm:pb-0">
                    <div className="grid grid-cols-1 sm:grid-cols-2">
                        {/* text content section */}
                        <div
                            data-aos-once="true"
                            className="flex flex-col justify-center pr-4 gap-4 pt-12 sm:pt-0 text-left order-2 sm:order-1"
                        >
                            <h1
                                data-aos="zoom-out"
                                data-aos-duration="500"
                                data-aos-once="true"
                                className="text-5xl sm:text-6xl font-bold font-title"
                            >
                                {title}
                                <div>
                                    <p className="text-right text-sm my-4 text-[#a69060]">
                                        by {author}
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
                                    <button className="sm:mx-0 mt-12 block bg-[#a69060] text-white text-lg px-5 py-2 rounded hover:bg-black transition-all duration-300 ">
                                        Khám phá thêm
                                    </button>
                                </Link>
                            </div>
                        </div>
                        {/* Image section */}
                        <div className="min-h-[450px] sm:min-h-[450px] flex justify-center items-center relative order-1 sm:order-2 ">
                            <div className="h-[300px] sm:h-[450px] overflow-hidden flex justify-center items-center">
                                <img
                                    data-aos="zoom-in"
                                    data-aos-once="true"
                                    src={imageId}
                                    alt=""
                                    className="lg:h-96 w-[300px] h-[300px] sm:h-[450px] sm:w-[450px] sm:scale-125 object-contain mx-auto"
                                />
                            </div>
                            <div className="flex lg:flex-col lg:top-1/2 lg:-translate-y-1/2 lg:py-2 justify-center gap-4 absolute -bottom-[40px] lg:-right-1 ">
                                {ImageList.map((item) => (
                                    <img
                                        data-aos="zoom-in"
                                        data-aos-once="true"
                                        src={item.img}
                                        onClick={() => {
                                            setImageId(
                                                item.id === 1
                                                    ? Book1
                                                    : item.id === 2
                                                    ? Book2
                                                    : Book3
                                            );
                                            setTitle(item.title);
                                            setAuthor(item.author);
                                            setDescription(item.description);
                                        }}
                                        alt=""
                                        className="max-w-[100px] h-[100px] object-contain inline-block hover:scale-110 duration-200 rounded-sm shadow-xl rounded-tr-lg rounded-br-lg"
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
