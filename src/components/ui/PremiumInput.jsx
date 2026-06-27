import { Input } from "../../theme";

function PremiumInput(props) {
  return (
    <input
      {...props}
      style={{
        ...Input,
        ...(props.style || {}),
      }}
    />
  );
}

export default PremiumInput;