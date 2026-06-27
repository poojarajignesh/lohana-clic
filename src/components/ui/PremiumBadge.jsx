import { Radius } from "../../theme";

function PremiumBadge({
  text,
  color = "#22C55E",
}) {
  return (
    <span
      style={{
        background: color,
        color: "#fff",
        padding: "6px 14px",
        borderRadius:
          Radius.xl,
        fontSize: "12px",
        fontWeight: "700",
      }}
    >
      {text}
    </span>
  );
}

export default PremiumBadge;