import { Colors } from "../../theme";

function CategoryChips({
  categories,
  selected,
  onSelect,
}) {
  return (
    <div
      style={{
        display: "flex",
        gap: "10px",
        overflowX: "auto",
        paddingBottom: "10px",
        marginBottom: "18px",
        scrollbarWidth: "none",
      }}
    >
      {categories.map((item) => {
        const active =
          selected === item;

        return (
          <button
            key={item}
            onClick={() =>
              onSelect(item)
            }
            style={{
              whiteSpace: "nowrap",
              border: "none",
              padding: "10px 18px",
              borderRadius: "30px",
              cursor: "pointer",

              background: active
                ? Colors.gradientPrimary
                : "#fff",

              color: active
                ? "#fff"
                : Colors.text,

              fontWeight: "700",

              boxShadow:
                active
                  ? Colors.shadow
                  : Colors.shadowLight,
            }}
          >
            {item}
          </button>
        );
      })}
    </div>
  );
}

export default CategoryChips;