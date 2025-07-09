import React, { useEffect, useState } from 'react';
import { useData } from '../state/DataContext';
import { Link } from 'react-router-dom';
import ItemsList from './ItemsList';
import Button from '../components/Button';
import MySkeleton from '../components/MySkeleton';

function Items() {
  const { items, fetchItems, pagination } = useData();
  const [loading, setLoading] = useState(false);
  const [q, setQ] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    let active = true;
    setLoading(true);
    const fetchData = async () => {
      try {
        await fetchItems({ page, q });
        if (!active) return;
      } catch (error) {
        if (active) {
          console.error(error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Clean‑up to avoid memory leak (candidate should implement)
    return () => {
      active = false;
    };
  }, [page, q, fetchItems]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    fetchItems({ page: 1, q });
  };

  return (
    <div style={{ padding: 16 }}>
      <form
        onSubmit={handleSearch}
        style={{ display: 'flex', gap: 8, alignItems: 'center' }}
      >
        <label htmlFor="search" style={{ marginRight: 8 }}>
          Search:
        </label>
        <input
          id="search"
          name="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search..."
          aria-label="Search items"
          style={{
            padding: '8px',
            borderRadius: 4,
            border: '1px solid #ccc',
          }}
        />
        <Button label={'Search'} type="submit" bgColor={'#28a745'} />
      </form>

      {loading ? (
        <MySkeleton />
      ) : !items.length ? (
        <p>No items found</p>
      ) : (
        <ItemsList items={items} />
      )}

      <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
        <Button
          label={'Previous'}
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
          ariaLabel={'Previous Page'}
          bgColor={'#007bff'}
        />

        <span style={{ fontSize: 20, fontWeight: 500 }}> Page {page} </span>
        <Button
          label={'Next'}
          onClick={() => setPage((p) => p + 1)}
          disabled={!pagination?.hasMore}
          ariaLabel={'Next page'}
          bgColor={'#007bff'}
        />
      </div>
    </div>
  );
}

export default Items;
