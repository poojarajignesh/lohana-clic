import { Colors } from "../../theme";
import {
  FaBirthdayCake,
  FaBriefcase,
} from "react-icons/fa";

import {
  MdCampaign,
} from "react-icons/md";

import {
  GiLotusFlower,
} from "react-icons/gi";

function LatestCards({
  birthdays,
  deathNotes,
  jobs,
  updates,
}) {
  const items = [
  {
    icon: (
      <FaBirthdayCake
        size={28}
        color="#F97316"
      />
    ),
    title: "Birthdays",
    count: birthdays.length,
    text: "Today",
  },
  {
    icon: (
      <GiLotusFlower
        size={28}
        color="#8B5CF6"
      />
    ),
    title: "Shraddhanjali",
    count: deathNotes.length,
    text: "Recent",
  },
  {
    icon: (
      <FaBriefcase
        size={28}
        color="#2563EB"
      />
    ),
    title: "Jobs",
    count: jobs.length,
    text: "Active",
  },
  {
    icon: (
      <MdCampaign
        size={30}
        color="#EF4444"
      />
    ),
    title: "Updates",
    count: updates.length,
    text: "Latest",
  },
];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(2,1fr)",
        gap: "14px",
        marginTop: "25px",
      }}
    >
      {items.map((item) => (
        <div
          key={item.title}
          style={{
            background: "#fff",
            borderRadius: "22px",
            padding: "16px",
            border: "1px solid #F1F5F9",
            boxShadow: Colors.shadow,
          }}
        >
          <div
  style={{
    width: "58px",
    height: "58px",
    borderRadius: "16px",
    background: "#F8FAFC",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "12px",
  }}
>
  {item.icon}
</div>

          <h4
            style={{
              margin: "10px 0 5px",
            }}
          >
            {item.title}
          </h4>

          <p
            style={{
              margin: 0,
              color: Colors.subText,
            }}
          >
            <b>{item.count}</b> {item.text}
          </p>
        </div>
      ))}
    </div>
  );
}

export default LatestCards;