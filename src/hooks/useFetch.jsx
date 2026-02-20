import { useEffect, useState } from "react";
import API_BASE_URL from "../config/api";

const DEFAULT_HEADERS = {
  accept: "application/json",
  // Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
};

export default function useFetch(
  { url = "", method = "GET", headers = {} },
  { enabled } = { enabled: true },
) {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (enabled) {
      setIsLoading(true);
      fetch(`${API_BASE_URL}${url}`, {
        method,
        headers: {
          ...DEFAULT_HEADERS,
          ...headers,
        },
      })
        .then(async (res) => {
          const data = await res.json();
          console.log({ data });
          setData(data);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, method, JSON.stringify(headers), enabled]);

  return { isLoading, data };
}
