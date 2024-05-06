import React from "react";
import ReactPaginate from "react-paginate";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

const PaginationButtons = ({ booksPerPage, totalBooks, paginate }) => {
    const handlePageClick = ({ selected }) => {
        const pageNumber = selected + 1;
        paginate(pageNumber);
    };

    return (
        <div className="my-10">
            <ReactPaginate
                breakLabel={<span className="mr-4">...</span>}
                nextLabel={
                    <span className="w-24 h-10 text-base flex items-center justify-center text-white bg-[#a69060] hover:bg-gray-500 rounded-md ">
                        Next
                        <BsChevronRight />
                    </span>
                }
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                marginPagesDisplayed={2}
                pageCount={Math.ceil(totalBooks / booksPerPage)}
                previousLabel={
                    <span className="w-24 h-10 text-base flex items-center justify-center text-white bg-[#a69060] hover:bg-gray-500 rounded-md mr-4 ">
                        Previous <BsChevronLeft />
                    </span>
                }
                pageClassName="block bg-solid cursor-pointer text-gray-500 hover:bg-gray-500 hover:text-white w-10 h-10 text-base flex items-center justify-center font-medium rounded-md mr-4"
                pageLinkClassName="p-4"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="flex items-center justify-center mt-8"
                activeClassName=" text-white bg-[#a69060]"
            />
        </div>
    );
};

export default PaginationButtons;
