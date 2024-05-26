import React, { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { Link } from "react-router-dom";

const DashSearchMember = () => {
    const [data, setData] = useState([]);

    const [search, setSearch] = useState([]);
    const [loading, setLoading] = useState(true);
    const [inputEntered, setInputEntered] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const [selectedMember, setSelectedMember] = useState(null);

    // const { sharedBy } = useLoaderData();

    useEffect(() => {
        fetch("https://pega-book-server.onrender.com/all-members")
            .then((res) => res.json())
            .then((data) => {
                setData(data);
                setSearch(data);
                setLoading(false);
                // console.log("All Members:", data);
            });
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            const div = document.getElementById("searchResultsDiv");
            if (div && !div.contains(event.target)) {
                div.style.opacity = 0; // Sử dụng opacity để làm mềm mại việc biến mất
                setTimeout(() => {
                    setShowResults(false);
                    div.style.opacity = 1; // Reset lại opacity sau khi ẩn
                }, 0); // Thời gian chờ trước khi ẩn (ở đây là 300ms)
            }
        };

        document.body.addEventListener("click", handleClickOutside);

        return () => {
            document.body.removeEventListener("click", handleClickOutside);
        };
    }, []);

    const filterMembers = (event) => {
        const searchTerm = event.target.value.toLowerCase();
        setSearch(
            data.filter((f) => f.memberName.toLowerCase().includes(searchTerm))
        );
        setInputEntered(true);
        setShowResults(true);
    };

    const handleMemberSelect = (member) => {
        setSelectedMember(member);
        setInputEntered(true);
        setShowResults(true);
    };

    return (
        <div className="w-80">
            <div className="flex justify-start border border-solid bg-[#f9fafb] rounded-s-sm outline-none relative">
                <IoIosSearch className="absolute left-2 top-2 w-6 h-6 my-auto" />
                <input
                    id="searchInput" // Thêm id cho input để có thể truy cập nó
                    type="text"
                    className="bg-[#f9fafb] w-full pl-10 font-normal border-none outline-none"
                    onChange={filterMembers}
                    placeholder="Search name"
                    autoComplete="off"
                    // required
                />
            </div>

            {showResults && inputEntered && (
                <div
                    id="searchResultsDiv"
                    className="bg-[#f9fafb] rounded-lg w-80 max-h-40 overflow-hidden shadow hover:shadow-md text-center px-5"
                >
                    {loading ? (
                        <h3 className="font-bold">Loading...</h3>
                    ) : search.length > 0 ? (
                        search.map((member, index) => (
                            <div
                                key={member._id}
                                onClick={() => handleMemberSelect(member)}
                            >
                                <Link
                                    to={`/admin/dashboard/edit-members/${member._id}`}
                                >
                                    <div className="flex gap-4 h-20 py-2 px-5 hover:bg-[#dadada] cursor-pointer z-10">
                                        <img
                                            src={member.memberAvatar}
                                            alt=""
                                            className="w-16 h-16 rounded-full object-cover mr-2"
                                        />
                                        <div className="h-full flex flex-col justify-center text-left whitespace-nowrap">
                                            <p className="font-bold">
                                                {member.memberName}
                                            </p>
                                            <p>{member.workPlace}</p>
                                            <p>{member.memberID}</p>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))
                    ) : (
                        <p>
                            {search.length === 0
                                ? "No matching members found."
                                : "Enter a search term."}
                        </p>
                    )}
                </div>
            )}
        </div>
    );
};

export default DashSearchMember;
