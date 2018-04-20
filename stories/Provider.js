import React from 'react';
import { Provider } from 'react-redux';
import createStore from '../src/redux/store';
import { addFormula } from '../src/redux/actions/formulas';
import { addCalculator } from '../src/redux/actions/calculators';
import math from 'mathjs';
import '../src/App.css';

const store = createStore();

store.dispatch(addFormula({
  args: [{name:"a", value:1},
    {name:"b", value:1},
    {name:"c", value:1}],
  result: {name: "x",
    execFormula: "(-b + sqrt(b^2-4a*c))/(2a)",},
  title: "Quadratic Formula",
  description: "Formula for finding roots of a quadratic polynomial",
  tags: ["pure math",]
}));

const quadraticId = Object.keys(store.getState().formulas).find(id => "Quadratic Formula" === store.getState().formulas[id].title);

store.dispatch(addFormula({
    args: [
      {name:"pressure", value:5000, unit: "psi"},
      {name:"TVD", value:8000, unit: "ft"}
    ],
    result: {execFormula: "pressure / TVD", name: "Equivalent mud weight", unit: "ppg"},
    title: "Mud weight",
    description: "Find mud weight based on pressure and total vertical distance (TVD)",
    tags: ["basic drilling",]
}));

const mwId = Object.keys(store.getState().formulas).find(id => "Mud weight" === store.getState().formulas[id].title);

store.dispatch(addFormula({
    args: [
      {name:"x", value:1},
      {name:"y", value:1}
    ],
    result: {execFormula: "x^2 + y + x", name: "error"},
    title: "Error test",
    description: "error", tags: []
}));

const errId = Object.keys(store.getState().formulas).find(id => "Error test" === store.getState().formulas[id].title);

store.dispatch(addFormula({
    args: [
      {name:"MW", value:12, unit: "ppg"},
      {name:"TVD", value:8000, unit: "ft"}
    ],
    result: {execFormula: "MW * TVD", name: "Pressure", unit: "psi"},
    title: "Derive Pressure",
    description: "Find pressure based on mud weight and total vertical distance (TVD)",
    tags: ["basic drilling",]
}));

const pressureId = Object.keys(store.getState().formulas).find(id => "Derive Pressure" === store.getState().formulas[id].title);

store.dispatch(addCalculator({formula: quadraticId, argvals: {
  a: ({value:1}),
  b: ({value:8}),
  c: ({value:-9})
}}));

export const quadraticCalcId = Object.keys(store.getState().calculators).find(id => 1 === store.getState().calculators[id].argvals.a.value);
const calcIds = [quadraticCalcId];

store.dispatch(addCalculator({formula: mwId, argvals: {
  pressure: ({value: 5000, unit:"psi"}),
  TVD: ({value:8000, unit:"ft"})
}}));

export const mwCalcId = Object.keys(store.getState().calculators).find(id => !calcIds.includes(id));
calcIds.push(mwCalcId);

store.dispatch(addCalculator({formula: mwId, argvals: {
  pressure: ({value: 5000, unit:"psi"}),
  TVD: ({value:2500, unit:"m"})
}}));

export const mwMCalcId = Object.keys(store.getState().calculators).find(id => !calcIds.includes(id));
calcIds.push(mwMCalcId);

store.dispatch(addCalculator({formula: errId, argvals: {
  x: ({value:1}),
  y: ({value:3}),
}}));

export const errCalcId = Object.keys(store.getState().calculators).find(id => !calcIds.includes(id));
calcIds.push(errCalcId);

store.dispatch(addCalculator({formula: quadraticId, argvals: {
  a: ({value:1}),
  b: ({refId:quadraticCalcId}),
  c: ({value:4})
}}));

export const nestedQuadraticCalcId = Object.keys(store.getState().calculators).find(id => !calcIds.includes(id));
calcIds.push(nestedQuadraticCalcId);

store.dispatch(addCalculator({formula: pressureId, argvals: {
  MW: ({refId: mwCalcId}),
  TVD: ({value:8000, unit:"ft"})
}}));

export const nestedPressureCalcId = Object.keys(store.getState().calculators).find(id => !calcIds.includes(id));
calcIds.push(nestedPressureCalcId);

math.createUnit('ppg', '1 lbf / gal');

export default function Decorator(story) {
  return (
  <Provider store={store}>
    {story()}
  </Provider>
  );
}
