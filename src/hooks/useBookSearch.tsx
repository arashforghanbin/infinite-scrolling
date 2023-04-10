import React from "react";
import { useEffect, useState } from "react";
import axios, { Canceler } from "axios";
import { error } from "console";

const useBookSearch = (query: string, pageNumber: number) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [books, setBooks] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setBooks([]);
  }, [query]);

  useEffect(() => {
    setLoading(true);
    setError(false);
    let cancel: any;
    axios
      .get("http://openlibrary.org/search.json", {
        params: { q: query, page: pageNumber },

        // cancelToken is used to cancel the previous request upon change the request
        cancelToken: new axios.CancelToken((c: Canceler) => {
          cancel = c;
        }),
      })
      .then((res) => {
        setBooks((prevBooks) => {
          return [
            ...new Set([
              ...prevBooks,
              ...res.data.docs.map((b: any) => b.title),
            ]),
          ];
        });
        setHasMore(res.data.docs.length > 0);
        setLoading(false)
      })
      .catch((error) => {
        if (axios.isCancel(error)) return;
        setError(true);
      });
    return () => {
      cancel();
    };
  }, [query, pageNumber]);
  return { loading, error, books, hasMore };
};

export default useBookSearch;
