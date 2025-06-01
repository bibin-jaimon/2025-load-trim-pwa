import React from "react";

const styles = {
  container: (maxWidth, minWidth) => ({
    maxWidth: maxWidth || "600px",
    minWidth: minWidth || "320px",
    margin: "40px auto",
    textAlign: "center",
    fontFamily: "'Inter', sans-serif",
    padding: "0 16px",
    boxSizing: "border-box",
  }),
  title: {
    fontSize: "26px",
    marginBottom: "24px",
    color: "#0b2b5e", // deep aviation blue
    fontWeight: "600",
  },
  optionsWrapper: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: "16px",
  },
  option: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "14px 28px",
    fontSize: "16px",
    border: "2px solid #cbd5e1",
    borderRadius: "12px",
    background: "#f0f4f8",
    color: "#0b2b5e",
    cursor: "pointer",
    transition: "all 0.25s ease-in-out",
    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.05)",
    minWidth: "120px",
    userSelect: "none",
  },
  selected: {
    background: "linear-gradient(to right, #007bff, #00b4db)",
    borderColor: "#007bff",
    color: "#fff",
    boxShadow: "0 4px 12px rgba(0, 123, 255, 0.4)",
  },
  hiddenInput: {
    display: "none",
  },
};

const RadioButtonGroup = ({
  options = [],
  value,
  onChange,
  label,
  name = "radio-group",
  maxWidth,
  minWidth,
}) => {
  return (
    <div style={styles.container(maxWidth, minWidth)}>
      {label && <h2 style={styles.title}>{label}</h2>}
      <div style={styles.optionsWrapper}>
        {options.map((option) => {
          const isSelected = value === option;
          return (
            <label
              key={option}
              style={{
                ...styles.option,
                ...(isSelected ? styles.selected : {}),
              }}
              role="radio"
              aria-checked={isSelected}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  onChange(option);
                }
              }}
            >
              <input
                type="radio"
                name={name}
                value={option}
                checked={isSelected}
                onChange={() => onChange(option)}
                style={styles.hiddenInput}
              />
              <span>{option}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
};

export default RadioButtonGroup;
