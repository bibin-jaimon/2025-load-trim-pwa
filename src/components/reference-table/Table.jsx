import { useEffect, useState } from "react";
import "./Table.css";
import TitleWithSelector from "../selector/selector-with-title";

const COLUMNS = [
  { key: "acreg", label: "A/c Regn." },
  { key: "bew", label: "Basic Empty Wt(Kgs)" },
  { key: "arm", label: "Arm(Inches)" },
  { key: "mtow", label: "MTOW(KGS" },
  { key: "mlw", label: "MLW(KGS" },
];

const Table = ({ aircraft }) => {
  const [selectedVariant, setSelectedVariant] = useState(aircraft?.regns?.[0]);

  useEffect(() => {
    setSelectedVariant(aircraft?.regns?.[0]);
  }, [aircraft]);
  return (
    <div className="table-container">
      <div className="vtsha-selector">
        {aircraft && (
          <TitleWithSelector
            title={"Variant"}
            displayKey={"acreg"}
            options={aircraft?.regns}
            value={selectedVariant?.acreg}
            onChange={setSelectedVariant}
          />
        )}
      </div>

      <table className="data-table">
        <tbody>
          <tr>
            {COLUMNS.map((column) => (
              <td key={column.key} data-label={column.label}>
                {selectedVariant[column.key]}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Table;
