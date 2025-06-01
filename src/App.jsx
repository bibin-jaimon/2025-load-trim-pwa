import { useEffect, useState } from "react";
import "./App.css";
import ReferenceTable from "./components/reference-table/Table";
import { loadAircrafts, loadPressures } from "./data-store";
import TitleWithSelector from "./components/selector/selector-with-title";
import LabeledTextInput from "./components/labeled-text/label-text-input";
import TrimSheet from "./components/trim-sheet/trim-sheet";
import RadioButtonGroup from "./components/radio-button";
import {
  convertLtoGas,
  createTrimSheetData,
} from "./utils/create-trim-sheet-data";

function App() {
  const [pressures, setPressures] = useState([]);
  const [aircrafts, setAircrafts] = useState([]);

  const [selectedAircraft, setSelectedAircraft] = useState();
  const [selectedVariant, setSelectedVariant] = useState();
  const [selectedPressure, setSelectedPressure] = useState();
  const [fuel, setFuel] = useState(70);

  const [pilotWeight, setPilotWeight] = useState(() => 75);
  const [coPilotWeight, setCoPilotWeight] = useState(() => 75);

  const [trimSheetData, setTrimSheetData] = useState();
  const [mode, setMode] = useState("Dual");

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
        mode,
      });
      setTrimSheetData(trimSheet);
    }
  }, [
    selectedAircraft,
    selectedVariant,
    fuel,
    pilotWeight,
    coPilotWeight,
    mode,
  ]);

  useEffect(() => {
    fetchAircrafts();
    fetchPressures();
  }, []);

  // set initial pressure
  useEffect(() => {
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
    pressures.length != 0 &&
    aircrafts.length != 0 &&
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
    <>
      <div
        style={{
          background: "white",
          maxWidth: "100%",
          width: "100%",
        }}
        className="app-container"
      >
        <h1
          style={{
            color: "white",
            background: "linear-gradient(to right, #007bff, #00b4db)",
          }}
        >
          LOAD AND TRIM SHEET
        </h1>
        <RadioButtonGroup
          options={["Solo", "Dual"]}
          value={mode}
          onChange={setMode}
        />
        {canShow && trimSheetData && <TrimSheet data={trimSheetData} />}
        {trimSheetData && (
          <div
            style={{
              justifyContent: "center",
              alignContent: "flex-start",
              width: "100%",
              margin: "0 auto",
            }}
          >
            <h1>CG: {trimSheetData.cg}</h1>
          </div>
        )}
        {canShow && (
          <TitleWithSelector
            title={`Pressure (${selectedPressure.value})`}
            displayKey="key"
            options={pressures}
            value={selectedPressure?.key}
            onChange={setSelectedPressure}
          />
        )}
        {canShow && (
          <TitleWithSelector
            title="Type"
            displayKey="type"
            options={aircrafts}
            value={selectedAircraft?.type}
            onChange={setSelectedAircraft}
          />
        )}
        {canShow && (
          <TitleWithSelector
            title={"Aircraft"}
            displayKey={"acreg"}
            options={selectedAircraft?.regns}
            value={selectedVariant?.acreg}
            onChange={setSelectedVariant}
          />
        )}
        {renderFuelTextField({
          label: `Fuel (L)`,
          value: fuel,
          onChange: setFuel,
        })}
        {/* {renderFuelTextField({
          label: "Pilot",
          value: pilotWeight,
          onChange: setPilotWeight,
        })}
        {mode == "Dual" &&
          renderFuelTextField({
            label: "Co-Pilot",
            value: coPilotWeight,
            onChange: setCoPilotWeight,
          })} */}

        {/* <h1
          style={{
            background: "linear-gradient(to right, #007bff, #00b4db)",
          }}
        >
          Reference Table
        </h1>
        {canShow && (
          <ReferenceTable
            aircraft={selectedAircraft}
            variant={selectedVariant}
            pressure={selectedPressure}
            fuel={`${convertLtoGas(fuel)}`}
          />
        )} */}
        <button
          onClick={() => window.location.reload()}
          style={{
            margin: "10px",
            marginBottom: "30px",
            borderRadius: "10px",
            color: "white",
            fontSize: "24px",
            // fontWeight: "bold",
            background: "linear-gradient(to right, #007bff, #00b4db)",
          }}
        >
          Reload
        </button>
      </div>
    </>
  );
}

export default App;
