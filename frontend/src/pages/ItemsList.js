import { Link } from 'react-router-dom';
import { FixedSizeList as List } from 'react-window';

const ItemsList = ({ items }) => {
  const Row = ({ index, style }) => (
    <div style={style}>
      <Link to={'/items/' + items[index].id}>{items[index].name}</Link>
    </div>
  );

  return (
    <List
      height={400}
      itemCount={items.length}
      itemSize={40}
      width="100%"
      style={{ marginTop: 24 }}
    >
      {Row}
    </List>
  );
};

export default ItemsList;
