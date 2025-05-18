import { useEffect, useState } from "react";
import "./App.css";
import ReferenceTable from "./components/reference-table/Table";
import { loadAircrafts, loadPressures } from "./data-store";
import TitleWithSelector from "./components/selector/selector-with-title";

function App() {
  const [pressures, setPressures] = useState([]);
  const [aircrafts, setAircrafts] = useState([]);

  const [selectedAircraft, setSelectedAircraft] = useState();
  const [selectedVariant, setSelectedVariant] = useState();
  const [selectedPressure, setSelectedPressure] = useState();

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

  return (
    <div
      style={{
        background: "green",
        maxWidth: "100%",
        width: "100%",
      }}
      className="app-container"
    >
      <h1>
        Load And Trim {`${canShow}`} - {selectedAircraft?.type} -
        {selectedPressure?.value}
      </h1>

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
      {selectedVariant && (
        <ReferenceTable aircraft={selectedAircraft} variant={selectedVariant} />
      )}
      <h1>Trim Sheet</h1>
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
