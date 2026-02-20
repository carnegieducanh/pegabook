import { useEffect, useState } from "react";
import API_BASE_URL from "../config/api";


const defaultSharer = { name: "", id: "", avatar: "", comment: "", workPlace: "", email: "" };
const defaultBorrower = { name: "", workPlace: "" };

export default function useBookData(sharerID, borrowerID) {
  const [sharer, setSharer] = useState(defaultSharer);
  const [borrowerInfo, setBorrowerInfo] = useState(defaultBorrower);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const [membersRes, booksRes] = await Promise.all([
        fetch(`${API_BASE_URL}/all-members`),
        fetch(`${API_BASE_URL}/all-books`),
      ]);
      const members = await membersRes.json();
      const books = await booksRes.json();

      const sharerData = members.find((m) => m.memberID === sharerID);
      const borrowerData = members.find((m) => m.memberID === borrowerID);
      const sharedCount = books.filter((b) => b.sharerID === sharerID).length;

      if (sharerData) {
        setSharer({
          name: sharerData.memberName,
          id: sharerData._id,
          avatar: sharerData.memberAvatar,
          comment: sharerData.comment,
          workPlace: sharerData.workPlace,
          email: sharerData.email,
        });
      }
      if (borrowerData) {
        setBorrowerInfo({ name: borrowerData.memberName, workPlace: borrowerData.workPlace });
      }
      setCount(sharedCount);
    };

    fetchData();
  }, [sharerID, borrowerID]);

  return { sharer, borrowerInfo, count };
}
