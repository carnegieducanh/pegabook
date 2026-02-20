import ReactPaginate from "react-paginate";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

// eslint-disable-next-line react/prop-types
const PaginationButtons = ({ booksPerPage, totalBooks, paginate }) => {
  const handlePageClick = ({ selected }) => {
    const pageNumber = selected + 1;
    paginate(pageNumber);
  };

  return (
    <div className="px-2 py-10">
      <ReactPaginate
        breakLabel={<span className="mr-2 sm:mr-4">...</span>}
        nextLabel={
          <span className="flex h-8 w-16 items-center justify-center gap-1 rounded-md bg-[#a69060] text-xs text-white hover:bg-gray-500 sm:h-10 sm:w-24 sm:text-base">
            Next
            <BsChevronRight />
          </span>
        }
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={Math.ceil(totalBooks / booksPerPage)}
        previousLabel={
          <span className="mr-2 flex h-8 w-16 items-center justify-center gap-1 rounded-md bg-[#a69060] text-xs text-white hover:bg-gray-500 sm:mr-4 sm:h-10 sm:w-24 sm:text-base">
            Prev <BsChevronLeft />
          </span>
        }
        pageClassName="block bg-solid cursor-pointer text-gray-500 hover:bg-gray-500 hover:text-white w-8 sm:w-10 h-8 sm:h-10 text-xs sm:text-base flex items-center justify-center font-medium rounded-md mr-2 sm:mr-4"
        pageLinkClassName="p-2 sm:p-4"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="flex flex-wrap items-center justify-center mt-8 gap-2"
        activeClassName=" text-white bg-[#a69060]"
      />
    </div>
  );
};

export default PaginationButtons;
