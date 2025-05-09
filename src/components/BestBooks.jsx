import { useEffect, useState } from "react";
import TrendingBooks from "../home/TrendingBooks";
// import TrendingBooks from "../home/TrendingBooks";

const BestBooks = () => {
  const [membersData, setMembersData] = useState(null);
  const [booksData, setBooksData] = useState([]);

  useEffect(() => {
    fetch("https://pega-book-server.onrender.com/all-members")
      .then((res) => res.json())
      .then((data) => setMembersData(data));
  }, []);

  useEffect(() => {
    fetch("https://pega-book-server.onrender.com/all-books")
      .then((res) => res.json())
      .then((data) => setBooksData(data.slice(0, 8)));
  }, []);
  return (
    <div>
      <TrendingBooks
        booksData={booksData}
        membersData={membersData}
        headline="Mượn Sách Miễn Phí"
      />
    </div>
  );
};

export default BestBooks;
