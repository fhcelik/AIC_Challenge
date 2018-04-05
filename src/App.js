import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Formula from './components/Formula';
import FormulaCard from './components/FormulaCard';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Calcoola</h1>
        </header>
        <p className="App-intro">
          Formula Builders
        </p>
        <Formula formula="\sum_{n=0}^{\infty}{\frac{1}{2^n}}=2"/>
        <Formula formula="\sum}{"/>
        When <Formula formula="a \ne 0,"/> there are two solutions to <Formula formula="ax^2+bx+c=0"/> and they are <Formula formula="x = {-b \pm \sqrt{b^2-4ac} \over 2a}."/>
        <FormulaCard id={0}
          args={[
            {name:"a",value:1},
            {name:"b",value:0},
            {name:"c",value:4}]}
          displayFormula="x = {-b \pm \sqrt{b^2-4ac} \over 2a}"
          execFormulae={[
            {execFormula: "(-b + sqrt(b^2-4a*c))/(2a)", name: "x_1"},
            {execFormula: "(-b - sqrt(b^2-4a*c))/(2a)", name: "x_2"}]}
        />
      </div>
    );
  }
}

export default App;
