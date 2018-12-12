import React from 'react';
import { create } from 'jss';
import compose from 'jss-compose';
import { createGenerateClassName, jssPreset } from '@material-ui/core/styles';
import JssProvider from 'react-jss/lib/JssProvider';
import 'typeface-oxygen-mono/index.css';

// Configure JSS
const jss = create({ plugins: [...jssPreset().plugins, compose()] });

// Custom Material-UI class name generator.
const generateClassName = createGenerateClassName();

export const JSSComposable = props => (
  <JssProvider jss={jss} generateClassName={generateClassName}>
    {props.children}
  </JssProvider>
);

export default JSSComposable;
