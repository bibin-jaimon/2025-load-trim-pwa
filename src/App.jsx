import { useEffect, useState } from "react";
import "./App.css";
import ReferenceTable from "./components/reference-table/Table";
import { loadAircrafts, loadPressures } from "./data-store";
import TitleWithSelector from "./components/selector/selector-with-title";
import LabeledTextInput from "./components/labeled-text/label-text-input";
import TrimSheet from "./components/trim-sheet/trim-sheet";

const convertLtoGas = (val) => Number(val) * 0.72;

const createTrimSheetData = ({
  aircraft,
  variant,
  fuel,
  pilotWeight,
  coPilotWeight,
}) => {
  const initialRows = [
    {
      no: 1,
      itemDescription: "Basic Empty Weight",
      arm: variant.arm,
      weight: variant.bew,
      moment: (Number(variant.arm) * Number(variant.bew)).toFixed(2),
    },
    {
      no: 2,
      itemDescription: "Usable Fuel",
      arm: 40,
      weight: fuel,
      moment: (Number(40) * Number(fuel)).toFixed(2),
    },
    {
      no: 3,
      itemDescription: "Pilot",
      arm: 39,
      weight: pilotWeight,
      moment: (Number(39) * Number(pilotWeight)).toFixed(2),
    },
    {
      no: 4,
      itemDescription: "Co-Pilot",
      arm: 39,
      weight: coPilotWeight,
      moment: (Number(39) * Number(coPilotWeight)).toFixed(2),
    },
  ];

  const totalWeight = initialRows.reduce(
    (sum, row) => sum + Number(row.weight),
    0
  );
  const totalMoment = initialRows.reduce(
    (sum, row) => sum + Number(row.moment),
    0
  );

  const rampWeightRow = {
    no: 7,
    itemDescription: "Ramp Weight",
    arm: "", //rampArm.toFixed(2),
    weight: totalWeight.toFixed(2),
    moment: totalMoment.toFixed(2),
  };

  return {
    columns: [
      { key: "no", label: "No" },
      { key: "itemDescription", label: "Item Description" },
      { key: "weight", label: "Weight (kg)" },
      { key: "arm", label: "Arm (in)" },
      { key: "moment", label: "Moment" },
    ],
    rows: [...initialRows, rampWeightRow],
  };
};

function App() {
  const [pressures, setPressures] = useState([]);
  const [aircrafts, setAircrafts] = useState([]);

  const [selectedAircraft, setSelectedAircraft] = useState();
  const [selectedVariant, setSelectedVariant] = useState();
  const [selectedPressure, setSelectedPressure] = useState();
  const [fuel, setFuel] = useState(1);

  const [pilotWeight, setPilotWeight] = useState(() => 75);
  const [coPilotWeight, setCoPilotWeight] = useState(() => 75);

  const [trimSheetData, setTrimSheetData] = useState();

  useEffect(() => {
    const isValid =
      selectedAircraft &&
      selectedVariant &&
      fuel &&
      pilotWeight &&
      coPilotWeight;

    if (isValid) {
      console.log({ isValid });
      let trimSheet = createTrimSheetData({
        aircraft: selectedAircraft,
        variant: selectedVariant,
        fuel: convertLtoGas(fuel),
        pilotWeight,
        coPilotWeight,
      });
      setTrimSheetData(trimSheet);
    }
  }, [selectedAircraft, selectedVariant, fuel, pilotWeight, coPilotWeight]);

  useEffect(() => {
    fetchAircrafts();
    fetchPressures();
  }, []);

  // set initial pressure
  useEffect(() => {
    console.log(pressures);
    setSelectedPressure(pressures?.[0]);
  }, [pressures]);

  // fetch all pressures
  const fetchPressures = async () => {
    const data = await loadPressures();
    setPressures(data);
  };

  // fetch all aircrafts
  const fetchAircrafts = async () => {
    const data = await loadAircrafts();
    setAircrafts(data);
  };

  // set initial aircraft
  useEffect(() => {
    setSelectedAircraft(aircrafts[0]);
  }, [aircrafts]);

  // set selected aircrafts first variant
  useEffect(() => {
    setSelectedVariant(selectedAircraft?.regns?.[0]);
  }, [selectedAircraft]);

  const canShow =
    selectedPressure != undefined &&
    selectedAircraft != undefined &&
    selectedVariant != undefined;

  if (canShow == false) {
    console.log({ selectedPressure, selectedAircraft, selectedVariant });
    return <h1>Not loaded</h1>;
  }

  const renderFuelTextField = ({ label, value, onChange }) => {
    return <LabeledTextInput label={label} value={value} onChange={onChange} />;
  };

  return (
    <div
      style={{
        background: "#d7a0ce",
        maxWidth: "100%",
        width: "100%",
      }}
      className="app-container"
    >
      <h1>Load And Trim</h1>

      {canShow && (
        <TitleWithSelector
          title="Pressure"
          displayKey="key"
          options={pressures}
          value={selectedPressure?.key}
          onChange={setSelectedPressure}
        />
      )}
      {canShow && (
        <TitleWithSelector
          title="Aircraft"
          displayKey="type"
          options={aircrafts}
          value={selectedAircraft?.type}
          onChange={setSelectedAircraft}
        />
      )}
      {canShow && (
        <TitleWithSelector
          title={"Variant"}
          displayKey={"acreg"}
          options={selectedAircraft?.regns}
          value={selectedVariant?.acreg}
          onChange={setSelectedVariant}
        />
      )}
      {renderFuelTextField({
        label: "Fuel (L)",
        value: fuel,
        onChange: setFuel,
      })}
      {renderFuelTextField({
        label: "Pilot",
        value: pilotWeight,
        onChange: setPilotWeight,
      })}
      {renderFuelTextField({
        label: "Co-Pilot",
        value: coPilotWeight,
        onChange: setCoPilotWeight,
      })}
      <h1>Trim Sheet</h1>
      {canShow && trimSheetData && <TrimSheet data={trimSheetData} />}
      <h1>Reference Table</h1>
      {canShow && (
        <ReferenceTable
          aircraft={selectedAircraft}
          variant={selectedVariant}
          pressure={selectedPressure}
          fuel={`${convertLtoGas(fuel)}`}
        />
      )}
      <button
        onClick={() => window.location.reload()}
        style={{ margin: "10px" }}
      >
        🔄 Reload App
      </button>
    </div>
  );
}

export default App;
