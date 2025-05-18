import React from "react";

const TitleWithSelector = ({ title, options, displayKey, value, onChange }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "space-between",
        padding: "8px 16px",
        background: "red",
      }}
    >
      <h2 style={{ margin: 0, flex: 1 }}>{title}</h2>
      <select
        value={value}
        onChange={(e) => {
          let selectedItem = options.filter(
            (item) => item[displayKey] == e.target.value
          );
          if (selectedItem.length == 0) {
            return {};
          }

          onChange(selectedItem[0]);
        }}
        style={{ padding: "4px 8px" }}
      >
        {options.map((opt) => (
          <option key={opt[displayKey]} value={opt[displayKey]}>
            {opt[displayKey]}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TitleWithSelector;
