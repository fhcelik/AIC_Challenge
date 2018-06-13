import React from 'react';
import CalculatorEditor from './Editor.view';

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
  onEditDone: stubHandler,
};

export default {
  editor: () => (
    <CalculatorEditor
      args={[]}
      result={{ name: 'a', execFormula: '' }}
      {...stubs}
    />
  ),
  'with arg': () => (
    <CalculatorEditor
      args={[{ name: 'a', alias: 'STARTING DENSITY' }]}
      result={{ name: 'test', execFormula: '(100 * (b - a)))/(35-b)' }}
      {...stubs}
    />
  ),
};
