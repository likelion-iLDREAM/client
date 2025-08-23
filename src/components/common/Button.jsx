import "./Button.css";

const Button = ({ text, type, onClick, disabled = false }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`Button Button_${type}`}
    >
      {text}
    </button>
  );
};

export default Button;
