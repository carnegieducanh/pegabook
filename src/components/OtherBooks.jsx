import React, { useEffect, useState } from "react";
import OtherBookCards from "../home/OtherBookCards";
import API_BASE_URL from "../config/api";
import { useLanguage } from "../contexts/LanguageProvider";

const OtherBooks = () => {
  const { t } = useLanguage();
  const [books, setBooks] = useState([]);
  useEffect(() => {
    fetch(`${API_BASE_URL}/all-books`)
      .then((res) => res.json())
      .then((data) => setBooks(data.slice(0, 9)));
  }, []);
  return (
    <div>
      <OtherBookCards books={books} headline={t("otherBooks.title")} />
    </div>
  );
};

export default OtherBooks;
