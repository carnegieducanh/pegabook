// value: chuỗi lưu vào database (giữ tiếng Việt để tương thích dữ liệu cũ)
// key:   key tra cứu bản dịch qua t("categories.<key>")
const bookCategories = [
  { value: "Tiểu sử - Hồi ký",       key: "biography"   },
  { value: "Văn học",                 key: "literature"  },
  { value: "Tâm lý học",              key: "psychology"  },
  { value: "Truyền cảm hứng",         key: "inspiration" },
  { value: "Chữa lành - tỉnh thức",   key: "healing"     },
  { value: "Hư cấu",                  key: "fiction"     },
  { value: "Giáo dục",                key: "education"   },
  { value: "Nghệ thuật - Thiết kế",   key: "artDesign"   },
  { value: "Khởi nghiệp - Kinh doanh",key: "startup"     },
];

export default bookCategories;
