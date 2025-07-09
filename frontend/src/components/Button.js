const Button = ({
  label,
  onClick,
  disabled,
  ariaLabel,
  type = 'button',
  bgColor,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      style={{
        padding: '8px 12px',
        backgroundColor: bgColor,
        color: '#fff',
        border: 'none',
        borderRadius: 4,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? '0.5' : 1,
      }}
      type={type}
    >
      {label}
    </button>
  );
};

export default Button;
