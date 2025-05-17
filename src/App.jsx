import { useEffect, useState } from "react";
import "./App.css";
import Table from "./components/reference-table/Table";
import { loadAircrafts, loadPressures } from "./data-store";
import TitleWithSelector from "./components/selector/selector-with-title";

function App() {
  const [pressures, setPressures] = useState([]);
  const [aircrafts, setAircrafts] = useState([]);

  const [selectedAircraft, setSelectedAircraft] = useState();

  useEffect(() => {
    fetchAircrafts();
    fetchPressures();
  }, []);

  const fetchPressures = async () => {
    const data = await loadPressures();
    setPressures(data);
  };

  const fetchAircrafts = async () => {
    const data = await loadAircrafts();
    setAircrafts(data);
  };

  useEffect(() => {
    setSelectedAircraft(aircrafts[0]);
  }, [aircrafts]);

  return (
    <div className="app-container">
      <h1>Load And Trim [{selectedAircraft?.type}]</h1>
      <TitleWithSelector
        title="Aircraft"
        displayKey="type"
        options={aircrafts}
        value={selectedAircraft?.type}
        onChange={setSelectedAircraft}
      />
      {selectedAircraft && <Table aircraft={selectedAircraft} />}
      <h1>Trim Sheet</h1>
    </div>
  );
}

export default App;
