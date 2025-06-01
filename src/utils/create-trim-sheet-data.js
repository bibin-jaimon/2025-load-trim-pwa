const convertLtoGas = (val) => Number(val) * 0.72;

const createTrimSheetData = ({
  aircraft,
  variant,
  fuel,
  pilotWeight,
  coPilotWeight,
  mode,
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
      moment: (Number(39) * Number(pilotWeight)).toFixed(0),
    },
  ];

  if (mode == "Dual") {
    initialRows.push({
      no: 4,
      itemDescription: "Co-Pilot",
      arm: 39,
      weight: coPilotWeight,
      moment: (Number(39) * Number(coPilotWeight)).toFixed(0),
    });
  } else {
    initialRows.push({
      no: 4,
      itemDescription: "Co-Pilot",
      arm: 39,
      weight: "-",
      moment: "-",
    });
  }

  const baggageArea1 = {
    no: 5,
    itemDescription: "Baggage Area 1",
    arm: 64,
    weight: "-",
    moment: "-",
  };

  const baggageArea2 = {
    no: 6,
    itemDescription: "Baggage Area 2",
    arm: 84,
    weight: "-",
    moment: "-",
  };

  const totalWeight = initialRows.reduce((sum, row) => {
    let number = isNaN(Number(row.weight)) ? 0 : Number(row.weight);
    return sum + number;
  }, 0);
  const totalMoment = initialRows.reduce((sum, row) => {
    let number = isNaN(Number(row.moment)) ? 0 : Number(row.moment);
    return sum + number;
  }, 0);

  const rampWeightRow = {
    no: 7,
    itemDescription: "Ramp Weight",
    arm: "", //rampArm.toFixed(2),
    weight: totalWeight.toFixed(2),
    moment: totalMoment.toFixed(2),
  };

  const engineStartAndTaxiFuel = {
    no: 8,
    itemDescription: "Engine Start and Taxi Fuel",
    arm: 40,
    weight: 2.16,
    moment: (Number(40) * Number(2.16)).toFixed(2),
  };

  const totalWeightAndMoment = {
    no: 9,
    itemDescription: "Total weight and moment",
    arm: "",
    weight: (
      Number(totalWeight) - Number(engineStartAndTaxiFuel.weight)
    ).toFixed(2),
    moment: (
      Number(totalMoment) - Number(engineStartAndTaxiFuel.moment)
    ).toFixed(2),
  };

  return {
    columns: [
      { key: "no", label: "No" },
      { key: "itemDescription", label: "Item Description" },
      { key: "weight", label: "Weight (kg)" },
      { key: "arm", label: "Arm (in)" },
      { key: "moment", label: "Moment" },
    ],
    rows: [
      ...initialRows,
      baggageArea1,
      baggageArea2,
      rampWeightRow,
      engineStartAndTaxiFuel,
      totalWeightAndMoment,
    ],
    cg: (totalWeightAndMoment.moment / totalWeightAndMoment.weight).toFixed(2),
  };
};

export { createTrimSheetData, convertLtoGas };
