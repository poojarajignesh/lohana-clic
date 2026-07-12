function MasterData() {
  return (
    <div
      style={{
        maxWidth: "430px",
        margin: "0 auto",
        padding: "20px",
      }}
    >
      <h1>Master Data</h1>

      <button style={btn}>
        States
      </button>

      <button style={btn}>
        Districts
      </button>

      <button style={btn}>
        Talukas
      </button>

      <button style={btn}>
        Villages
      </button>

      <button style={btn}>
        Business Categories
      </button>

      <button style={btn}>
        Business Sub Categories
      </button>
    </div>
  );
}

const btn = {
  width: "100%",
  padding: "18px",
  marginBottom: "15px",
  border: "none",
  borderRadius: "16px",
  background: "#2D1B7E",
  color: "#fff",
  fontWeight: "700",
  cursor: "pointer",
};

export default MasterData;