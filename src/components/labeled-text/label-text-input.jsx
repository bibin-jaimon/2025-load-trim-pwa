import React from "react";

const styles = {
  container: (maxWidth) => ({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px",
    backgroundColor: "#f9fafb",
    border: "1px solid #e2e8f0",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.03)",
    fontFamily: "'Inter', sans-serif",
    marginRight: "100px",
    width: "100%",
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
    padding: "10px 12px",
    fontSize: "16px",
    borderRadius: "8px",
    border: "1px solid #cbd5e1",
    backgroundColor: "#ffffff",
    color: "#1e293b",
    // outline: "none",
    width: "225px",
    transition: "border 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
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
