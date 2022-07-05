import { useState, useEffect } from 'react';

//we create the function in useEffect so we don't
//have to pass it as a dependency

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [ispending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async () => {
      setIsPending(true);

      try {
        const response = await fetch(url, { signal: controller.signal });
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        const json = await response.json();
        setData(json);
        setIsPending(false); //done loading questions
        setError(null); // with no error
      } catch (err) {
        if (err.name === 'AbortError') {
          console.log('the fetch was aborted');
        } else {
          setIsPending(false); //Don't show loading questions when there is an error
          setError('Could not fetch data');
          console.log(err.message);
        }
      }
    };

    fetchData();

    //cleanup function incase using component unmounts
    return () => {
      controller.abort();
    };
  }, [url]);

  return { data, ispending, error };
};

export default useFetch;
