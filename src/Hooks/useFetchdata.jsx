import { useState, useEffect } from "react";

const useFetchData = (url) => {
  const [data, setData] = useState(null);//state variable for data
  const [loading, setLoading] = useState(true);//state for loading 
  const [error, setError] = useState(null);//state for error

  useEffect(() => {
    if (!url) return; // ✅ always call hooks, skip fetch safely

    // reset state before fetching new data
    setLoading(true);
    setError(null);
    setData(null);
//fetch data by api call
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {//if no data fetched
          throw new Error("Failed to fetch data");
        }
        const result = await response.json();
        setData(result);
      } catch (err) {//if error then store in error state
        setError(err);
      } finally {//load false after data fetch success or error
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};

export default useFetchData;