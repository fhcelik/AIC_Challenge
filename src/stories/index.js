import React from 'react';
import { storiesOf } from '@storybook/react';
import { createStore } from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension';
import { Provider, connect } from 'react-redux';
import reducer from '../Reducers';
import { addFormula, addFormulaCard } from '../Actions';
import Formula from '../components/Formula';
import FormulaResult from '../components/FormulaResult';
import FormulaCard from '../components/FormulaCard';
import math from 'mathjs';
import '../App.css';

const store = createStore(reducer, devToolsEnhancer());

store.dispatch(addFormula(
  [{name:"a"},
    {name:"b"},
    {name:"c"}],
  {name: "x",
    execFormula: "(-b + sqrt(b^2-4a*c))/(2a)",}
));

store.dispatch(addFormula(
    [
      {name:"pressure", value:5000, unit: "psi"},
      {name:"TVD", value:8000, unit: "ft"}
    ],
    {execFormula: "pressure / TVD", name: "Equivalent mud weight", unit: "ppg"}
));

store.dispatch(addFormula(
    [
      {name:"x"},
      {name:"y"}
    ],
    {execFormula: "x^2 + y + z", name: "error"}
));

store.dispatch(addFormulaCard(0, {
  a: ({value:1}),
  b: ({value:8}),
  c: ({value:-9})
}));

store.dispatch(addFormulaCard(1, {
  pressure: ({value: 5000, unit:"psi"}),
  TVD: ({value:8000, unit:"ft"})
}));

store.dispatch(addFormulaCard(1, {
  pressure: ({value: 5000, unit:"psi"}),
  TVD: ({value:2500, unit:"m"})
}));

store.dispatch(addFormulaCard(2, {
  x: ({value:1}),
  y: ({value:3}),
}));

math.createUnit('ppg', '1 lbf / gal');

storiesOf('Formula', module)
  .add('basic TeX', () => (
    <Formula formula="\sum_{n=0}^{\infty}{\frac{1}{2^n}}=2"/>
  ))
  .add('error', () => (
    <Formula formula="\sum}{"/>
  ))
  .add('with other text', () => (
    <p>
      When <Formula formula="a \ne 0,"/> there are two solutions to <Formula formula="ax^2+bx+c=0"/> and they are <Formula formula="x = {-b \pm \sqrt{b^2-4ac} \over 2a}."/>
    </p>
  ))

storiesOf('FormulaResult', module)
  .add('polynomial x=3', () => (
    <FormulaResult name="y_1" execFormula="x^2+x" scope={({x:3})}/>
  ))

storiesOf('FormulaCard', module)
  .addDecorator(story => (
    <Provider store={store}>
      {story()}
    </Provider>
  ))
  .add('quadratic from state', () => (
    <FormulaCard id={0} />
  ))
  .add('mudweight ft from state', () => (
    <FormulaCard id={1} />
  ))
  .add('mudweight m from state', () => (
    <FormulaCard id={2} />
  ))
  .add('errors', () => (
    <FormulaCard id={3} />
  ))