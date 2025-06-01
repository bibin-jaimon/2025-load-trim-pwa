import React from "react";

const styles = {
  container: (maxWidth) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "16px",
    gap: "16px",
    width: "100%",
    margin: "0 auto",
    backgroundColor: "#f9fafb",
    border: "1px solid #e2e8f0",
    boxShadow: "0 2px 4px rgba(0,0,0,0.03)",
    fontFamily: "'Inter', sans-serif",
    boxSizing: "border-box",
  }),
  label: {
    margin: 0,
    fontSize: "16px",
    fontWeight: 500,
    color: "#1e293b",
    flex: 1,
  },
  input: {
    flex: 1,
    width: "100px",
    fontSize: "16px",
    padding: "10px 12px",
    borderRadius: "8px",
    border: "1px solid #cbd5e1",
    backgroundColor: "#ffffff",
    color: "#1e293b",
    outline: "none",
    transition: "border 0.2s ease, box-shadow 0.2s ease",
  },
  inputFocus: {
    border: "1px solid #3b82f6",
    boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.3)",
  },
};

const LabeledTextInput = ({ label, value, onChange, maxWidth }) => {
  const [focused, setFocused] = React.useState(false);

  const handleChange = (e) => {
    const val = e.target.value;
    if (val === "" || !isNaN(val)) {
      onChange(val === "" ? "" : Number(val));
    }
  };

  return (
    <div style={styles.container(maxWidth)}>
      <h2 style={styles.label}>{label}</h2>
      <input
        type="number"
        inputMode="decimal"
        pattern="[0-9]*"
        value={value}
        onChange={handleChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          ...styles.input,
          ...(focused ? styles.inputFocus : {}),
        }}
      />
    </div>
  );
};

export default LabeledTextInput;
