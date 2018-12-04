export const debounceConfigNames = {
  CALCULATOR_USAGE: 'calculatorUsage',
  SEARCH: 'search',
  UNITS: 'units',
};

export const debounceConfig = {
  [debounceConfigNames.CALCULATOR_USAGE]: 3000,
  [debounceConfigNames.SEARCH]: 300,
  [debounceConfigNames.UNITS]: {
    leading: true,
    trailing: false,
    wait: 200,
  },
};
