import { useEffect, useState } from "react";
import FavoriteBookImg from "../assets/favoritebook.jpg";
import { Link } from "react-router-dom";
import { Avatar } from "flowbite-react";
import SpinnerLoading from "../components/SpinnerLoading";

const FavoriteBook = () => {
    const [allMembers, setAllMembers] = useState([]);
    const [latestMembers, setLatestMembers] = useState([]);
    const [totalMembers, setTotalMembers] = useState(0);
    const [totalBooks, setTotalBooks] = useState(0); // State to hold total number of books
    const [totalViews, setTotalViews] = useState(0); // State to hold total number of views

    useEffect(() => {
        fetch("https://pega-book-server.onrender.com/all-members")
            .then((res) => res.json())
            .then((members) => {
                setAllMembers(members);
                setTotalMembers(members.length);
                const lastFiveMembers = members.slice(-7).reverse();
                setLatestMembers(lastFiveMembers);

                fetch("https://pega-book-server.onrender.com/all-books")
                    .then((res) => res.json())
                    .then((books) => {
                        // setAllBooks(books);
                        setTotalBooks(books.length);

                        // Ensure views are numbers and calculate total views
                        const totalBookViews = books.reduce((sum, book) => {
                            const views = parseInt(book.views, 10);
                            return sum + (isNaN(views) ? 0 : views);
                        }, 0);

                        setTotalViews(totalBookViews);
                    });
            });
    }, []);

    return (
        <div className="px-4 lg:px-24 my-20 flex flex-col lg:flex-row justify-between items-center gap-12">
            <div className="md:w-10/12">
                <img src={FavoriteBookImg} alt="" className="rounded " />
            </div>

            <div className="md:w-10/12 lg:w-1/2 space-y-6">
                <h2 className="text-5xl font-bold my-5 md:w-3/4 leading-snug">
                    Sự Đa Dạng{" "}
                    <span className="text-[#a69060]">và Phong Phú!</span>
                </h2>
                <p className="mb-10 text-lg md:w-5/6">
                    <span className="text-[#a69060] text-xl font-medium">
                        Pegabook
                    </span>{" "}
                    tự hào về sự đa dạng của bộ sưu tập sách của mình, bao gồm
                    cả các tác phẩm văn hóa, nghệ thuật, khoa học, và nhiều lĩnh
                    vực khác. Điều này giúp{" "}
                    <span className="text-[#a69060] text-xl font-medium">
                        Pegabook
                    </span>{" "}
                    tạo ra một môi trường đọc sách đa chiều và thú vị.
                </p>
                {/* stats */}
                <div className="flex flex-row justify-between gap-6 md:w-3/4 my-14">
                    <div>
                        <h3 className="text-3xl font-bold">{totalMembers}+</h3>
                        <p className="text-base">Thành viên</p>
                    </div>

                    <div>
                        <h3 className="text-3xl font-bold">{totalBooks}+</h3>
                        <p className="text-base">Cuốn sách</p>
                    </div>

                    <div>
                        <h3 className="text-3xl font-bold">{totalViews}+</h3>
                        <p className="text-base">Lượt xem</p>
                    </div>
                </div>
                <div className="flex flex-wrap gap-2">
                    {latestMembers.length > 0 ? (
                        <Avatar.Group>
                            {latestMembers &&
                                latestMembers.map((member, index) => (
                                    <div key={index}>
                                        <Avatar
                                            img={member.memberAvatar}
                                            rounded
                                            stacked
                                        />
                                    </div>
                                ))}

                            <Avatar.Counter total={9} href="#" />
                        </Avatar.Group>
                    ) : (
                        <SpinnerLoading />
                    )}
                </div>

                <Link to="/Members">
                    <button className="mt-12 block bg-[#a69060] text-white font-semibold px-5 py-2 rounded hover:bg-black transition-all duration-300">
                        Khám phá thêm
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default FavoriteBook;
