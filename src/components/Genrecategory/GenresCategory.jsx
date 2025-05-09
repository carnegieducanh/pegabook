import useFetch from "../../hooks/useFetch";

// eslint-disable-next-line react/prop-types
const GenresCategory = ({ onChange, value = [] }) => {
  const { data } = useFetch({ url: `/all-books` }, { enabled: true });

  const categoryMap =
    Array.isArray(data) &&
    data.reduce((acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = [];
      }
      acc[item.category].push(item); // 🟢 lưu object thay vì id
      return acc;
    }, {});

  // console.log(categoryMap);

  return (
    <div className="flex flex-wrap gap-3">
      {Object.entries(categoryMap).map(([category, items]) => (
        <p
          key={category}
          className={`cursor-pointer rounded-lg border px-2 py-1 ${
            items.every((item) => value.some((v) => v._id === item._id))
              ? "bg-[#a69060] text-white"
              : ""
          }`}
          onClick={() => {
            let newValue = [...value];
            if (
              items.every((item) => newValue.some((v) => v._id === item._id))
            ) {
              // Nếu đã chọn hết -> bỏ hết
              newValue = newValue.filter(
                (v) => !items.some((item) => item._id === v._id),
              );
            } else {
              // Thêm những item chưa có
              const itemsToAdd = items.filter(
                (item) => !newValue.some((v) => v._id === item._id),
              );
              newValue = [...newValue, ...itemsToAdd];
            }
            onChange(newValue);
          }}
        >
          {category}
        </p>
      ))}
    </div>
  );
};

export default GenresCategory;
