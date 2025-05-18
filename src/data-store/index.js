const loadJSONModules = async (modules) => {
  const imports = Object.values(modules).map((fn) => fn());
  return await Promise.all(imports);
};

export const loadAircrafts = async () => {
  const modules = import.meta.glob("./aircrafts/*.json");
  let data = await loadJSONModules(modules);

  return mapped(data);
};
export const loadPressures = async () => {
  const modules = import.meta.glob("./pressure/pressure.json");
  let data = await loadJSONModules(modules);
  return mapped(data)[0].data;
};

const mapped = (data) => {
  let mapped = data.map((item) => {
    return item.default;
  });
  return mapped;
};
