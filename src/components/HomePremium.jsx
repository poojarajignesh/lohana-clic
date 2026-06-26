function AnnouncementStrip() {
  return (
    <div
      style={{
        overflow: "hidden",
        background:
          "linear-gradient(135deg,#2D1B7E,#FF5A1F)",
        color: "#fff",
        borderRadius: "14px",
        padding: "10px 0",
        marginBottom: "20px",
        whiteSpace: "nowrap",
      }}
    >
      <div
        style={{
          display: "inline-block",
          paddingLeft: "100%",
          animation:
            "scrollText 18s linear infinite",
        }}
      >
        📢 Welcome To Lohana Clic • Business Directory • Matrimony • Blood Help • Jobs • Community Updates • Lohana Helping Lohana
      </div>

      <style>
        {`
          @keyframes scrollText {
            0% {
              transform: translateX(0%);
            }

            100% {
              transform: translateX(-100%);
            }
          }
        `}
      </style>
    </div>
  );
}

export default AnnouncementStrip;