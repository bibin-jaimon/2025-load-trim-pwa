import { useEffect, useState } from "react";
import "./App.css";
import Table from "./components/Table";
import { loadAircrafts, loadPressures } from "./data-store";

function App() {
  const [pressures, setPressures] = useState([]);
  const [aircrafts, setAircrafts] = useState({});

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

  return (
    <div className="app-container">
      <h1>Load And Trim</h1>
      <Table />
      <h1>Trim Sheet</h1>
    </div>
  );
}

export default App;
