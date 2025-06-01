import React from "react";
import "./trim-sheet.css";

const TrimSheet = ({ data }) => {
  const { columns, rows } = data;

  return (
    <div
      className="table-container"
      style={{ overflowX: "auto", width: "100%" }}
    >
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          fontFamily: "Arial, sans-serif",
          minWidth: "500px",
          color: "black", // set default font color
        }}
      >
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                style={{
                  border: "1px solid #ccc",
                  backgroundColor: "#e0e0e0",
                  textAlign: "center",
                  padding: "10px",
                  fontWeight: "bold",
                  fontSize: "14px",
                  color: "black", // explicitly set black font
                }}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              style={{
                backgroundColor: rowIndex % 2 === 0 ? "#fff" : "#f9f9f9",
                textAlign: "center",
              }}
            >
              {columns.map((col) => (
                <td
                  key={col.key}
                  style={{
                    border: "1px solid #ccc",
                    padding: "10px",
                    fontSize: "14px",
                    color: "black", // explicitly set black font
                  }}
                >
                  {row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div
        style={{
          justifyContent: "center",
          width: "100%",
          margin: "10px",
        }}
      >
        <h1>CG: {data.cg}</h1>
      </div>
    </div>
  );
};

export default TrimSheet;
