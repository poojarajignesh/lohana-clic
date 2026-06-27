export const Colors = {
  primary: "#5B3DF5",
  primaryDark: "#2D1B7E",

  secondary: "#FF7A45",
  secondaryDark: "#FF5A1F",

  success: "#22C55E",
  warning: "#F59E0B",
  danger: "#EF4444",
  info: "#2563EB",

  background: "#F6F8FC",
  card: "#FFFFFF",

  text: "#111827",
  subText: "#6B7280",

  border: "#E5E7EB",

  shadow: "0 12px 35px rgba(0,0,0,.08)",
  shadowLight: "0 4px 15px rgba(0,0,0,.05)",

  gradientPrimary:
    "linear-gradient(135deg,#5B3DF5,#2D1B7E)",

  gradientOrange:
    "linear-gradient(135deg,#FF7A45,#FF5A1F)",

  gradientSuccess:
    "linear-gradient(135deg,#34D399,#16A34A)",

  gradientDanger:
    "linear-gradient(135deg,#FB7185,#DC2626)",
};

export const Radius = {
  sm: "10px",
  md: "16px",
  lg: "22px",
  xl: "30px",
};

export const Space = {
  xs: "6px",
  sm: "10px",
  md: "16px",
  lg: "22px",
  xl: "30px",
};

export const Card = {
  background: Colors.card,
  borderRadius: Radius.lg,
  boxShadow: Colors.shadow,
  padding: Space.lg,
};

export const Button = {
  border: "none",
  borderRadius: Radius.md,
  padding: "14px",
  color: "#fff",
  fontWeight: "700",
  cursor: "pointer",
  width: "100%",
  background: Colors.gradientPrimary,
};

export const Input = {
  width: "100%",
  padding: "14px",
  borderRadius: Radius.md,
  border: `1px solid ${Colors.border}`,
  background: "#fff",
  outline: "none",
  fontSize: "15px",
  boxSizing: "border-box",