import { useEffect, useState } from "react";
import "./Table.css";
import TitleWithSelector from "../selector/selector-with-title";

const COLUMNS = [
  { key: "pressure", label: "Pressure Alt" },
  { key: "acreg", label: "A/c Regn." },
  { key: "bew", label: "Basic Empty Wt(Kgs)" },
  { key: "arm", label: "Arm(Inches)" },
  { key: "mtow", label: "MTOW(KGS)" },
  { key: "mlw", label: "MLW(KGS)" },
];

const ReferenceTable = ({ aircraft, variant, pressure }) => {
  const data = {
    pressure: pressure.value,
    ...variant,
  };
  return (
    <div className="table-container">
      <table className="data-table">
        <tbody>
          <tr>
            {COLUMNS.map((column) => (
              <td key={column.key} data-label={column.label}>
                {data[column.key]}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ReferenceTable;
