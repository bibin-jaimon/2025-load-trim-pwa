import { useState } from "react";
import "./Table.css";

const AIRCRAFT = {
  sha: {
    acreg: "VT-SHA",
    bew: 539.86,
    arm: 30.21,
    mtow: 758.18,
    mlw: 758.18,
  },
  shc: {
    acreg: "VT-SHC",
    bew: 543.33,
    arm: 30.21,
    mtow: 758.18,
    mlw: 758.18,
  },
};

const COLUMNS = [
  { key: "acreg", label: "A/c Regn." },
  { key: "bew", label: "Basic Empty Wt(Kgs)" },
  { key: "arm", label: "Arm(Inches)" },
  { key: "mtow", label: "MTOW(KGS" },
  { key: "mlw", label: "MLW(KGS" },
];

const Table = () => {
  const [selectedAircraft, setSelectedAircraft] = useState("sha");
  const aircraftData = AIRCRAFT[selectedAircraft];

  return (
    <div className="table-container">
      <div className="vtsha-selector">
        <select
          value={selectedAircraft}
          onChange={(e) => setSelectedAircraft(e.target.value)}
          className="vtsha-dropdown"
        >
          {Object.entries(AIRCRAFT).map(([key, data]) => (
            <option key={key} value={key}>
              {data.acreg}
            </option>
          ))}
        </select>
      </div>

      <table className="data-table">
        <tbody>
          <tr>
            {COLUMNS.map((column) => (
              <td key={column.key} data-label={column.label}>
                {aircraftData[column.key]}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Table;
