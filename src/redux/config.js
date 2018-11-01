export const debounceConfigNames = {
  SEARCH: 'search',
  CALCULATOR_USAGE: 'calculatorUsage',
  UNITS: 'units',
};

export const debounceConfig = {
  [debounceConfigNames.SEARCH]: 300,
  [debounceConfigNames.CALCULATOR_USAGE]: 3000,
  [debounceConfigNames.UNITS]: {
    leading: true,
    trailing: false,
    wait: 200,
  },
};
