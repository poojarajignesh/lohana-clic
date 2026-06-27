import { Button } from "../../theme";

function PremiumButton({
  children,
  onClick,
  type = "button",
  style = {},
  disabled = false,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={{
        ...Button,
        opacity: disabled ? 0.6 : 1,
        transition: "0.25s",
        ...style,
      }}
    >
      {children}
    </button>
  );
}

export default PremiumButton;