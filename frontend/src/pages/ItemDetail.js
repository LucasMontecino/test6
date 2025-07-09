import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function ItemDetail() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('the id', id);
    fetch('/api/items/' + id)
      .then(async (res) => {
        console.log('Fetch response:', res.status, res.ok);
        const raw = await res.clone().text();
        console.log('raw response body', raw);

        const json = await res.json();
        return json;
      })
      .then(setItem)
      .catch((err) => {
        console.error('Error loading item:', err);
        navigate('/');
      });
  }, [id, navigate]);

  if (!item) return <p>Loading...</p>;

  return (
    <div style={{ padding: 16 }}>
      <h2>{item.name}</h2>
      <p>
        <strong>Category:</strong> {item.category}
      </p>
      <p>
        <strong>Price:</strong> ${item.price}
      </p>
    </div>
  );
}

export default ItemDetail;
