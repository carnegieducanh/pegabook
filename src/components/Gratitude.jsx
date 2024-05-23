import { Avatar, Blockquote } from "flowbite-react";
import ImageBanner from "../components/ImageBanner";
import { useEffect, useState } from "react";
import SpinnerLoading from "./SpinnerLoading";

const Gratitude = () => {
    const [allMembers, setAllMembers] = useState([]);
    const [allBooks, setAllBooks] = useState([]);
    const [matchedMembers, setMatchedMembers] = useState([]);
    const filteredMembers = matchedMembers.filter(
        (member) => member.sharedBooksCount > 0
    );

    useEffect(() => {
        fetch("https://pega-book-server.onrender.com/all-members")
            .then((res) => res.json())
            .then((members) => {
                setAllMembers(members);

                fetch("https://pega-book-server.onrender.com/all-books")
                    .then((res) => res.json())
                    .then((books) => {
                        setAllBooks(books);

                        const matchedMembersData = [];

                        // Duyệt qua từng thành viên
                        members.forEach((member) => {
                            // Tìm các cuốn sách của thành viên hiện tại
                            const matchedBooks = books.filter(
                                (book) => book.sharerID === member.memberID
                            );

                            matchedMembersData.push({
                                memberName: member.memberName,
                                sharedBooksCount: matchedBooks.length,
                            });
                        });

                        setMatchedMembers(matchedMembersData);
                    });
            });
    }, []);
    return (
        <div className="min-h-screen">
            <ImageBanner />

            <div className="py-10 px-4 lg:px-36 bg-[#fffffff2]">
                <h2 className="text-4xl font-bold text-left">Lời cảm ơn</h2>

                <div className="my-12 text-lg">
                    <p className="mb-3 text-gray-700 dark:text-gray-400">
                        Pegabook xin bày tỏ sự trân trọng biết ơn đến tất cả các
                        thành viên vì những đóng góp to lớn trong việc xây dựng
                        và phát triển thư viện sách chia sẻ kiến thức này. Sự
                        nhiệt tình và sáng tạo của các bạn đã biến Pegabook từ
                        những ý tưởng trở thành hiện thực, tạo nên một thư viện
                        sách như ngày hôm nay.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 md:gap-6">
                        <p className="mb-3 text-gray-700 dark:text-gray-400">
                            Pegabook không chỉ là nơi tập hợp các cuốn sách quý
                            báu mà còn mang lại nhiều giá trị tích cực cho team
                            Việt Nam. Thư viện mở ra cơ hội tiếp cận tri thức
                            rộng lớn cho mọi người, từ các bạn du học sinh,
                            người đi làm đến các chuyên gia, nhà nghiên cứu.
                            Khuyến khích tinh thần học hỏi, sáng tạo và tự phát
                            triển, giúp mọi người nâng cao kỹ năng và mở rộng
                            tầm nhìn. Hơn nữa, thư viện còn là một không gian
                            gặp gỡ, trao đổi và gắn kết team Việt Nam - các
                            thành viên đang làm việc cùng nhau tại công ty, thúc
                            đẩy sự chia sẻ và đoàn kết.
                        </p>

                        <Blockquote className="mb-3 border-l-4 border-gray-300 bg-gray-50 p-4 dark:border-gray-500 dark:bg-gray-800">
                            <p className="text-lg">
                                Xin chân thành cảm ơn tất cả những thành viên đã
                                và đang chia sẻ những cuốn sách hay tới
                                Pegabook:
                            </p>{" "}
                            {filteredMembers.length > 0 ? (
                                <div className="text-xl py-2 font-semibold italic text-[#99154b] dark:text-white">
                                    "
                                    {filteredMembers &&
                                        filteredMembers.map((member, index) => (
                                            <span key={index}>
                                                {member.memberName},{" "}
                                            </span>
                                        ))}
                                    ..."
                                </div>
                            ) : (
                                <div className="flex justify-center items-center w-full h-full">
                                    <SpinnerLoading />
                                </div>
                            )}
                        </Blockquote>
                    </div>
                    <p className="mb-3 text-gray-700 dark:text-gray-400">
                        Pegabook một lần nữa xin gửi lời cảm ơn chân thành đến
                        tất cả các bạn vì những nỗ lực và đóng góp quý báu. Sự
                        chung tay của các bạn đã tạo nên một thư viện sách phong
                        phú và hữu ích, mang lại lợi ích lớn lao cho toàn thể
                        team Việt Nam tại công ty.
                    </p>
                </div>
                <figcaption className="mt-6 flex space-x-3 text-lg">
                    {/* <Avatar
                        rounded
                        size="xs"
                        img="/images/people/profile-picture-3.jpg"
                        alt="profile picture"
                    /> */}
                    <div className="flex items-center divide-x-2 divide-gray-300 dark:divide-gray-700">
                        <cite className="pr-3 font-medium text-gray-900 dark:text-white">
                            Người đại diện
                        </cite>
                        <cite className="pl-3 text-gray-700 dark:text-gray-400">
                            thành viên Pegabook
                        </cite>
                    </div>
                </figcaption>
            </div>
        </div>
    );
};

export default Gratitude;
