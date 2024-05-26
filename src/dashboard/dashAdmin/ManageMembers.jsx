import { useEffect, useState } from "react";
import { Table } from "flowbite-react";
import { Link } from "react-router-dom";
import PaginationButtons from "../../components/PaginationBtns";
import { GrEdit } from "react-icons/gr";
import { RiDeleteBinLine } from "react-icons/ri";
import DashSearchMember from "./DashSearchMember";

const ManageMembers = () => {
    const [allMembers, setAllMembers] = useState([]);
    const [allBooks, setAllBooks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const membersPerPage = 10;
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    useEffect(() => {
        fetch("https://pega-book-server.onrender.com/all-members")
            .then((res) => res.json())
            .then((data) => {
                setAllMembers(data.reverse());
            });
    }, []);

    useEffect(() => {
        fetch("https://pega-book-server.onrender.com/all-books")
            .then((res) => res.json())
            .then((books) => {
                setAllBooks(books);
            });
    }, []);

    const indexOfLastMember = currentPage * membersPerPage;
    const indexOfFirstMember = indexOfLastMember - membersPerPage;
    const currentMember = allMembers.slice(
        indexOfFirstMember,
        indexOfLastMember
    );

    // delete a member
    const handleDelete = (id, memberID) => {
        const isConfirmed = window.confirm(
            "Are you sure you want to delete this Member?"
        );

        if (isConfirmed) {
            // Lọc các sách có liên quan đến thành viên cần xóa
            const matchedBooks = allBooks.filter(
                (book) => book.sharerID === memberID
            );

            // Xóa tất cả các sách có liên quan
            Promise.all(
                matchedBooks.map((book) =>
                    fetch(
                        `https://pega-book-server.onrender.com/book/${book._id}`,
                        {
                            method: "DELETE",
                        }
                    ).then((res) => res.json())
                )
            ).then(() => {
                // Sau khi xóa các sách liên quan, xóa thành viên
                fetch(`https://pega-book-server.onrender.com/member/${id}`, {
                    method: "DELETE",
                })
                    .then((res) => res.json())
                    .then(() => {
                        alert(
                            "Member and their books are deleted successfully!"
                        );
                        location.reload();
                    });
            });
        }
    };

    return (
        <div className="px-4 my-12">
            <div className="flex justify-between">
                <h2 className="mb-8 text-3xl font-bold">Manage Members</h2>
                <DashSearchMember />
            </div>

            {/* table for member data */}
            <Table className="lg:w-[1100px]">
                <Table.Head>
                    <Table.HeadCell>No.</Table.HeadCell>
                    <Table.HeadCell>AVATAR</Table.HeadCell>
                    <Table.HeadCell>Member name</Table.HeadCell>
                    <Table.HeadCell>Work Place</Table.HeadCell>
                    <Table.HeadCell>MEMBER ID</Table.HeadCell>
                    <Table.HeadCell>
                        <span>Edit or Manage</span>
                    </Table.HeadCell>
                </Table.Head>
                {currentMember.map((member, index) => (
                    <Table.Body className="divide-y" key={member._id}>
                        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                {index + 1}
                            </Table.Cell>
                            <Table.Cell className="w-20">
                                <div className="border border-solid border-opacity-10 shadow-md hover:shadow-lg w-12 h-12 rounded-full">
                                    <img
                                        src={member.memberAvatar}
                                        alt=""
                                        className="w-12 h-12 rounded-full object-cover shrink-0"
                                    />
                                </div>
                            </Table.Cell>
                            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                {member.memberName}
                            </Table.Cell>
                            <Table.Cell>{member.workPlace}</Table.Cell>
                            <Table.Cell>{member.memberID}</Table.Cell>
                            <Table.Cell>
                                <div className="mx-auto my-auto flex">
                                    <Link
                                        className="bg-cyan-700 px-4 py-1 font-semibold text-white rounded-sm mr-5"
                                        to={`/admin/dashboard/edit-members/${member._id}`}
                                    >
                                        <GrEdit />
                                    </Link>
                                    <button
                                        onClick={() =>
                                            handleDelete(
                                                member._id,
                                                member.memberID
                                            )
                                        }
                                        className="bg-red-600 px-4 py-1 font-semibold text-white rounded-sm"
                                    >
                                        <RiDeleteBinLine />
                                    </button>
                                </div>
                            </Table.Cell>
                        </Table.Row>
                    </Table.Body>
                ))}
            </Table>
            <PaginationButtons
                booksPerPage={membersPerPage}
                totalBooks={allMembers.length}
                paginate={paginate}
                currentPage={currentPage}
            />
        </div>
    );
};

export default ManageMembers;
