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
  useEffect(() => {
    fetchAircrafts();
    fetchPressures();
  }, []);

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

  useEffect(() => {
    setSelectedVariant(selectedAircraft?.regns?.[0])
  }, [selectedAircraft]);

  return (
    <div
      style={{
        background: "green",
        maxWidth: "100%",
        width: "100%",
      }}
      className="app-container"
    >
      <h1>Load And Trim [{selectedAircraft?.type}]</h1>
      <TitleWithSelector
        title="Aircraft"
        displayKey="type"
        options={aircrafts}
        value={selectedAircraft?.type}
        onChange={setSelectedAircraft}
      />

      {selectedAircraft && (
        <TitleWithSelector
          title={"Variant"}
          displayKey={"acreg"}
          options={selectedAircraft?.regns}
          value={selectedVariant?.acreg}
          onChange={setSelectedVariant}
        />
      )}

      {selectedVariant && <ReferenceTable aircraft={selectedAircraft} variant={selectedVariant} />}
      <h1>Trim Sheet</h1>
    </div>
  );
}

export default App;
