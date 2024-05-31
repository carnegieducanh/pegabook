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
        // Cuộn lên trên khi component được render
        window.scrollTo(0, 0);

        return () => {};
    });

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
                <h2 className="text-4xl font-bold text-left font-title">
                    Lời cảm ơn
                </h2>

                <div className="my-10 text-lg">
                    <p className="mb-3 text-gray-700 dark:text-gray-400">
                        Team Pegabook xin bày tỏ sự trân trọng biết ơn đến tất
                        cả các thành viên vì những đóng góp to lớn trong việc
                        xây dựng và phát triển thư viện sách chia sẻ kiến thức
                        này. Sự nhiệt tình và sáng tạo của các bạn đã biến
                        Pegabook từ những ý tưởng mơ hồ trở thành hiện thực, tạo
                        nên một thư viện sách như ngày hôm nay.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 md:gap-6">
                        <p className="mb-3 text-gray-700 dark:text-gray-400">
                            Xin cảm ơn những thành viên tuyệt vời trong team
                            Pegabook. <br />
                            <br />
                            Cảm ơn Nga Nguyễn đã giúp các thành viên trong team
                            được kết nối, chia sẻ mọi ý tưởng tuyệt vời cùng
                            nhau. Sự có mặt của em đối với dự án thư viện sách
                            này là một điều không thể thay thế, giống như cây
                            cầu giúp mọi thành viên team Việt Nam đến với mảnh
                            đất của trí tuệ, sự thông thái, tình yêu và những
                            giá trị của cuộc sống. Em là nguồn cổ vũ tinh thần
                            to lớn và sự hỗ trợ tuyệt vời của cả team Pegabook.
                            <br />
                            <br />
                            Cảm ơn Vũ Hồng Hà là người đã truyền cảm hứng cho
                            team Pegabook - nơi giúp cho rất nhiều bạn trẻ ở
                            công ty tiếp cận tri thức từ những cuốn sách hay. Vì
                            "Tri thức thay đổi vận mệnh, giáo dục quyết định
                            nhân sinh". Không chỉ vậy, Hà còn là thành viên hoạt
                            động tích cực trong mảng giáo dục của công ty, nguồn
                            năng lượng tích cực từ Hà chính là động lực to lớn
                            trên hành trình tạo nên dự án Pegabook như ngày hôm
                            nay. Biết ơn sự hiện diện, nguồn năng lượng, sự động
                            viên và quan tâm sâu sắc của Hà dành cho dự án.
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
                        Cảm ơn em út Trang Nguyễn trong team Pegabook. Nhờ sự
                        thông minh và khả năng phán đoán, đặt câu hỏi, nhìn nhận
                        chi tiết mọi khía cạnh, em chính là người đã giúp dự án
                        Pegabook cải thiện được rất nhiều điều tuyệt vời. Biết
                        ơn những ý tưởng thật xuất sắc từ em. Mong em tiếp tục
                        đồng hành cùng team Pegabook với những dự án vì cộng
                        đồng và các bạn Việt Nam làm việc ở công ty. <br />{" "}
                        <br />
                        Cảm ơn anh Đan là người đã chia sẻ những kiến thức
                        chuyên môn của mình đến dự án lẫn cả trong công việc.
                        Nhờ có anh luôn ủng hộ và động viên, đã nhen nhóm nên
                        một ngọn lửa khát khao để cho team Pegabook xây dựng dự
                        án này. Anh chính là người thầy đã dẫn đường cho team
                        Pegabook tạo nên một thư viện sách như ngày hôm nay.
                        Thay mặt team Pegabook xin được bày tỏ lòng biết ơn sâu
                        sắc đến anh. <br /> <br />
                        Xin được cảm ơn các bạn trẻ trong team Việt Nam: Hoàng,
                        Trâm, Duy, Ánh.... Nhờ tình yêu và sự ham đọc sách, ham
                        học hỏi của các bạn đã hình thành nên ý tưởng tạo nên
                        thư viện sách này. Các bạn chính là nguồn năng lượng trẻ
                        trung tươi mới mang đến nhiều ý tưởng sáng tạo trong
                        công việc và cuộc sống.
                        <br />
                        <br />
                        Một lần nữa, đội ngũ Pegabook xin cảm ơn tất cả các bạn
                        vì những đóng góp to lớn và quý báu này. Chính nhờ sự
                        chung tay và nhiệt huyết của các bạn mà thư viện sách đã
                        trở thành một biểu tượng của tri thức và sự chia sẻ
                        trong cộng đồng.
                    </p>
                </div>
                <figcaption className="flex space-x-3 text-lg">
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
                            thành viên team Pegabook
                        </cite>
                    </div>
                </figcaption>
            </div>
        </div>
    );
};

export default Gratitude;
