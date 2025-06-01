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
    margin: "0 auto",
    width: "100%",
    boxSizing: "border-box",
  }),
  title: {
    margin: 0,
    fontSize: "16px",
    fontWeight: 500,
    color: "#1e293b",
    flex: 1,
  },
  select: {
    padding: "10px 12px",
    fontSize: "16px",
    borderRadius: "8px",
    border: "1px solid #cbd5e1",
    backgroundColor: "#ffffff",
    color: "#1e293b",
    // outline: "none",
    width: "250px",
    transition: "border 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
  },
  selectFocus: {
    border: "1px solid #3b82f6",
    boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.3)",
  },
};

const TitleWithSelector = ({
  title,
  options,
  displayKey,
  value,
  onChange,
  maxWidth,
}) => {
  const [focused, setFocused] = React.useState(false);

  return (
    <div style={styles.container(maxWidth)}>
      <h2 style={styles.title}>{title}</h2>
      <select
        value={value}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onChange={(e) => {
          const selectedItem = options.find(
            (item) => item[displayKey] === e.target.value
          );
          if (selectedItem) onChange(selectedItem);
        }}
        style={{
          ...styles.select,
          ...(focused ? styles.selectFocus : {}),
        }}
      >
        <div style={{ width: "100px" }}>
          {options.map((opt) => (
            <option key={opt[displayKey]} value={opt[displayKey]}>
              {opt[displayKey]}
            </option>
          ))}
        </div>
      </select>
    </div>
  );
};

export default TitleWithSelector;
