import React, { createContext, useCallback, useContext, useState } from 'react';

const DataContext = createContext();

export function DataProvider({ children }) {
  const [items, setItems] = useState([]);
  const [pagination, setPagination] = useState({
    page: '',
    total: '',
    hasMore: '',
  });

  const fetchItems = useCallback(async ({ page = 1, q = '' } = {}) => {
    const res = await fetch(
      `http://localhost:3001/api/items?limit=3&page=${page}&q=${q}`
    ); // Intentional bug: backend ignores limit
    const json = await res.json();
    setItems(json.items);
    setPagination({
      page: json.page,
      total: json.total,
      hasMore: json.hasMore,
    });
  }, []);

  return (
    <DataContext.Provider value={{ items, fetchItems, pagination }}>
      {children}
    </DataContext.Provider>
  );
}

export const useData = () => useContext(DataContext);
