import { Spinner } from "flowbite-react";
import { useEffect, useState } from "react";

// eslint-disable-next-line react/prop-types
export function SpinnerLoading({ initialCountdown = 20 }) {
  const [countdown, setCountdown] = useState(initialCountdown); // Sử dụng prop để khởi tạo giá trị đếm ngược

  useEffect(() => {
    // Bắt đầu đếm ngược
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    // Dừng đếm ngược khi component bị unmount
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-row gap-3">
      <div color="gray">
        <Spinner aria-label="Alternate spinner button example" size="xl" />
        {/* <span className="pl-3">Loading...</span> */}
        <p className="mt-4 text-lg font-semibold text-gray-700">
          Vui lòng đợi...{" "}
          <span className="text-2xl text-[#c23f69]">{countdown}s</span>
        </p>
      </div>
    </div>
  );
}

export default SpinnerLoading;
