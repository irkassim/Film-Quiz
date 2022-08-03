import { useState, useEffect } from 'react';

//we create the function in useEffect so we don't
//have to pass it as a dependency

const useFetch = (url, method = 'GET') => {
  const [data, setData] = useState([]);
  const [ispending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const [options, setOptions] = useState(null);

  const postData = (postData) => {
    setOptions({
      method: 'POST',
      headers: {
        'content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    });
  };

  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async (fetchOptions) => {
      setIsPending(true);

      try {
        const response = await fetch(url, {
          ...fetchOptions,
          signal: controller.signal,
        });
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

    if (method === 'GET') {
      fetchData();
    }

    if (method === 'POST' && options) {
      fetchData(options);
    }

    //cleanup function incase using component unmounts
    return () => {
      controller.abort();
    };
  }, [url, options, method]);

  return { data, ispending, error, postData };
};

export default useFetch;
