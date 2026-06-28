import { Colors } from "../../theme";

function AddBusinessButton({
  onClick,
}) {
  return (
    <button
      onClick={onClick}
      style={{
        width: "100%",
        padding: "16px",
        border: "none",
        borderRadius: "20px",
        background:
          Colors.gradientOrange,
        color: "#fff",
        fontWeight: "700",
        fontSize: "15px",
        cursor: "pointer",
        boxShadow: Colors.shadow,
        transition: ".25s",
      }}
    >
      🚀 Add Your Business
    </button>
  );
}

export default AddBusinessButton;