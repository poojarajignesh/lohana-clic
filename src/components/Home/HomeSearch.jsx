import { FaSearch } from "react-icons/fa";
import { Colors } from "../../theme";

function HomeSearch({
  value,
  onChange,
  onSearch,
}) {
  return (
    <div
      style={{
        position: "relative",
        marginBottom: "22px",
      }}
    >
      <FaSearch
        style={{
          position: "absolute",
          left: "18px",
          top: "18px",
          color: "#9CA3AF",
          fontSize: "18px",
        }}
      />

      <input
        value={value}
        onChange={onChange}
        onKeyDown={onSearch}
        placeholder="Search Family, Business, Member..."
        style={{
          width: "100%",
          padding: "16px 18px 16px 52px",
          border: "none",
          outline: "none",
          borderRadius: "20px",
          background: "#fff",
          fontSize: "15px",
          boxShadow: Colors.shadow,
          boxSizing: "border-box",
        }}
      />
    </div>
  );
}

export default HomeSearch;