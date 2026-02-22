// Map giá trị status từ DB (cả cũ tiếng Việt lẫn key mới)
// sang nhãn dịch theo ngôn ngữ hiện tại.
const STATUS_KEY_MAP = {
  // Key mới (bookStatus.*)
  "bookStatus.available": "bookStatus.available",
  "bookStatus.borrowed": "bookStatus.borrowed",
  // Dữ liệu cũ trong DB (tiếng Việt) — backwards compat
  "Có thể mượn": "bookStatus.available",
  "Đang mượn bởi": "bookStatus.borrowed",
};

export const getStatusLabel = (status, t) => {
  const key = STATUS_KEY_MAP[status];
  return key ? t(key) : status;
};
