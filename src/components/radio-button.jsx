import React, { useState } from "react";

const styles = {
  container: {
    maxWidth: "500px",
    margin: "40px auto",
    textAlign: "center",
    fontFamily: "sans-serif",
  },
  title: {
    fontSize: "28px",
    marginBottom: "20px",
    color: "#333",
  },
  optionsWrapper: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    flexWrap: "wrap",
  },
  option: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    padding: "12px 24px",
    fontSize: "18px",
    border: "2px solid #ccc",
    borderRadius: "10px",
    backgroundColor: "#f5f5f5",
    cursor: "pointer",
    transition: "all 0.3s ease",
    userSelect: "none",
  },
  selected: {
    backgroundColor: "#007bff",
    borderColor: "#007bff",
    color: "#fff",
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
}) => {
  return (
    <div style={styles.container}>
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
