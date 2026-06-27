import { Card } from "../../theme";

function PremiumCard({
  children,
  style = {},
  onClick,
}) {
  return (
    <div
      onClick={onClick}
      style={{
        ...Card,
        transition: "0.25s",
        cursor: onClick
          ? "pointer"
          : "default",
        ...style,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform =
          "translateY(-3px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform =
          "translateY(0px)";
      }}
    >
      {children}
    </div>
  );
}

export default PremiumCard;