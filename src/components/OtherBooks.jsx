import React, { useEffect, useState } from "react";
import OtherBookCards from "../home/OtherBookCards";
import API_BASE_URL from "../config/api";

const OtherBooks = () => {
  const [books, setBooks] = useState([]);
  useEffect(() => {
    fetch(`${API_BASE_URL}/all-books`)
      .then((res) => res.json())
      .then((data) => setBooks(data.slice(0, 9)));
  }, []);
  return (
    <div>
      <OtherBookCards
        books={books}
        headline="Kết nối cộng đồng yêu sách – Chia sẻ đam mê đọc"
      />
    </div>
  );
};

export default OtherBooks;
