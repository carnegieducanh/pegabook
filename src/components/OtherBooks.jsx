import React, { useEffect, useState } from "react";
import OtherBookCards from "../home/OtherBookCards";

const OtherBooks = () => {
  const [books, setBooks] = useState([]);
  useEffect(() => {
    fetch("https://pega-book-server.onrender.com/all-books")
      .then((res) => res.json())
      .then((data) => setBooks(data.slice(0, 9)));
  }, []);
  return (
    <div>
      <OtherBookCards
        books={books}
        headline="🤝 Sách là cái cớ, kết nối mới là mục tiêu!"
      />
    </div>
  );
};

export default OtherBooks;
