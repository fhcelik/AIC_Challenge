import { createAction } from 'redux-actions';
import { Calculator } from '../schemas/calculator';

export const addCalculator = createAction("@@calcoola/calculator/add", Calculator);

export const changeCalculatorArg = createAction("@@calcoola/calculator/argument-change");

export const addCalculatorFormulaArg = createAction("@@calcoola/calculator/formula-argument-add");

export const removeCalculatorFormulaArg = createAction("@@calcoola/calculator/formula-argument-remove");

export const changeCalculatorResult = createAction("@@calcoola/calculator/result-change");
