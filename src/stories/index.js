import React from 'react';
import { storiesOf } from '@storybook/react';
import Formula from '../components/Formula';
import FormulaResult from '../components/FormulaResult';
import FormulaCard from '../components/FormulaCard';
import '../App.css';

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
  .add('quadratic theorem', () => (
    <FormulaCard id={0}
      args={[
        {name:"a",value:1},
        {name:"b",value:0},
        {name:"c",value:4}]}
      execFormulae={[
        {execFormula: "(-b + sqrt(b^2-4a*c))/(2a)", name: "x_1"},
        {execFormula: "(-b - sqrt(b^2-4a*c))/(2a)", name: "x_2"}]}
    />
  ))
  .add('errors', () => (
    <FormulaCard id={1}
      args={[
        {name:"x",value:1},
        {name:"y",value:2}
      ]}
      execFormulae={[
        {execFormula: "x^2+y+z", name: "w"}
      ]}
    />
  ))