import { useEffect, useState } from "react";
import SpinnerLoading from "../components/SpinnerLoading";

const NewMember = () => {
  const [lastMember, setLastMember] = useState(null);

  useEffect(() => {
    fetch("https://pega-book-server.onrender.com/all-members")
      .then((res) => res.json())
      .then((members) => {
        if (members.length > 0) {
          setLastMember(members[members.length - 1]);
        }
      });
  }, []);

  return (
    <div>
      <p className="text-md pl-2 pt-4 text-left font-medium text-maroon underline dark:text-blush">
        Thành viên mới
      </p>
      {lastMember ? (
        <div className="grid grid-cols-1 justify-between gap-x-8 sm:grid-cols-2 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-4 pt-6">
              <div className="h-16 w-16 rounded-full border border-solid border-opacity-10 shadow-md hover:shadow-lg">
                <img
                  src={lastMember.memberAvatar}
                  alt=""
                  className="block h-16 w-16 shrink-0 rounded-full object-cover"
                />
              </div>
              <div className="">
                <h2 className="text-sm font-bold tracking-tight text-gray-900 dark:text-white">
                  <div className="line-clamp-2">
                    <p>{lastMember.memberName}</p>
                  </div>
                </h2>
                <p className="text-sm font-normal text-gray-700 dark:text-gray-400">
                  {lastMember.workPlace}
                </p>
              </div>
            </div>
            <hr className="my-2 inline-block w-full" />
            {/* <p className="w-full">{lastMember.comment}</p> */}
          </div>
        </div>
      ) : (
        <SpinnerLoading />
      )}
    </div>
  );
};

export default NewMember;
