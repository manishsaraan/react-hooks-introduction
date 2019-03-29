import { useState, useEffect } from "react";

const useHttp = (url, dependencies) => {
  const [isLoading, setLoading] = useState(false);
  const [fetchData, setFetchData] = useState(null);
  //   fetch("https://swapi.co/api/people")
  useEffect(() => {
    setLoading(true);
    console.log("sending http request");
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error("Failed to fetch.");
        }
        return response.json();
      })
      .then(data => {
        setLoading(false);
        setFetchData(data);
      })
      .catch(err => {
        console.log(err);
      });
  }, dependencies);

  return [isLoading, fetchData];
};

export default useHttp;
