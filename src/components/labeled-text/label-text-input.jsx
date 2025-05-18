import React from "react";

const LabeledTextInput = ({ label, value, onChange }) => {
  const handleChange = (e) => {
    const val = e.target.value;
    if (val === "" || !isNaN(val)) {
      onChange(val === "" ? "" : Number(val));
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "8px 16px",
        gap: "12px",
        width: "100%",
        maxWidth: "100%",
        boxSizing: "border-box",
      }}
    >
      <h2 style={{ margin: 0, flex: 1, color: "black" }}>{label}</h2>
      <input
        type="number"
        inputMode="decimal"
        pattern="[0-9]*"
        value={value}
        onChange={handleChange}
        style={{
          flex: 1,
          fontSize: "16px",
          padding: "10px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          width: "100%",
          color: "black",
          backgroundColor: "white"
        }}
      />
    </div>
  );
};

export default LabeledTextInput;
