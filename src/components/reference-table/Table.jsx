import { useEffect, useState } from "react";
import "./Table.css";
import TitleWithSelector from "../selector/selector-with-title";

const COLUMNS = [
  { key: "fuel", label: "Fuel (Kg)", emphasized: true },
  { key: "pressure", label: "Pressure Alt", emphasized: false },
  { key: "acreg", label: "A/c Regn.", emphasized: false },
  { key: "bew", label: "Basic Empty Wt (Kgs)", emphasized: false },
  { key: "arm", label: "Arm (Inches)", emphasized: false },
  { key: "mtow", label: "MTOW (KGS)", emphasized: false },
  { key: "mlw", label: "MLW (KGS)", emphasized: false },
];

const ReferenceTable = ({ aircraft, variant, pressure, fuel }) => {
  const data = {
    pressure: pressure.value,
    fuel,
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
