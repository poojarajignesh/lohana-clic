function AnnouncementStrip() {
  return (
    <div
      style={{
        background:
          "linear-gradient(135deg,#2D1B7E,#FF5A1F)",
        color: "#fff",
        padding: "10px 15px",
        borderRadius: "14px",
        marginBottom: "20px",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          whiteSpace: "nowrap",
          display: "inline-block",
          animation: "ticker 20s linear infinite",
        }}
      >
        📢 Welcome To Lohana Clic • Business Directory • Matrimony • Blood Help • Jobs • Community Updates • Lohana Helping Lohana
      </div>

      <style>{`
        @keyframes ticker {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
      `}</style>
    </div>
  );
}

export default AnnouncementStrip;