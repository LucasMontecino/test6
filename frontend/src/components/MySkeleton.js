const MySkeleton = () => {
  return (
    <div style={{ padding: 16 }}>
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          style={{
            height: 24,
            width: 320,
            background: '#eee',
            borderRadius: 4,
            marginBottom: 8,
          }}
        />
      ))}
    </div>
  );
};

export default MySkeleton;
