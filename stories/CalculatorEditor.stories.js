import React from 'react';
import { storiesOf } from '@storybook/react';
import Decorator, { mwCalcId } from './Provider';
import Calculator from '../src/components/Calculator';
import CalculatorEditor from '../src/components/Calculator/Editor/Editor.view';

const stubHandler = () => null;

const stubs = {
  title: '',
  description: '',
  tags: ['tag1', 'tag2'],
  onTagAdd: stubHandler,
  onTagDelete: stubHandler,
  formula: 'a*b',
  onTitleChange: stubHandler,
  onDescriptionChange: stubHandler,
  onArgAdd: stubHandler,
  onArgAliasChange: stubHandler,
  onArgUnitChange: stubHandler,
  onArgRemove: stubHandler,
  onResultFormulaChange: stubHandler,
  onResultUnitChange: stubHandler,
};

storiesOf('CalculatorEditor', module)
  .addDecorator(Decorator)
  .add('editor', () => (
    <CalculatorEditor
      args={[]}
      result={{ name: 'a', execFormula: '' }}
      {...stubs}
    />
  ))
  .add('with arg', () => (
    <CalculatorEditor
      args={[{ name: 'a', alias: 'STARTING DENSITY' }]}
      result={{ name: 'test', execFormula: '(100 * (b - a)))/(35-b)' }}
      {...stubs}
    />
  ))
  .add('from store', () => <Calculator edit={true} id={mwCalcId} />);
