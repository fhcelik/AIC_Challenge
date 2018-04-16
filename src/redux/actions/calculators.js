import { createAction } from 'redux-actions';

export const addCalculator = createAction("@@calcoola/calculator/add");

export const changeCalculatorArg = createAction("@@calcoola/calculator/argument-change");

export const addCalculatorFormulaArg = createAction("@@calcoola/calculator/formula-argument-add");

export const removeCalculatorFormulaArg = createAction("@@calcoola/calculator/formula-argument-remove");
