import { createAction } from 'redux-actions';

export const ActionTypes = {
  addFormula: "ADD_FORMULA",
  addFormulaCard: "ADD_FORMULA_CARD",
  changeFormulaArg: "CHANGE_FORMULA_CARD_ARG",
};

export const addFormula = createAction(ActionTypes.addFormula,
  (args, result) => ({args, result}));

export const addFormulaCard = createAction(ActionTypes.addFormulaCard,
  (formula, argvals) => ({formula, argvals}));

export const changeFormulaArg = createAction(ActionTypes.changeFormulaArg,
  (formulaCard, argvals) => ({formulaCard, argvals}));