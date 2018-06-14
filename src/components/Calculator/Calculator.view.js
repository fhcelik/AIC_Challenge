import PropTypes from 'prop-types';
import React from 'react';
import Display from './Display';
import Editor from './Editor';
import Info from './Info';
import { Flipper, Front, Back } from 'react-flipper';

const Calculator = ({ renderDisplay, renderEditor, renderInfo, ...rest }) => (
  <Flipper isFlipped={!renderDisplay} orientation="horizontal">
    <Front>
      <Display {...rest} />
    </Front>
    <Back>
      {renderEditor && <Editor {...rest} />}
      {renderInfo && <Info {...rest} />}
    </Back>
  </Flipper>
);

Calculator.propTypes = {
  renderDisplay: PropTypes.bool.isRequired,
  renderEditor: PropTypes.bool.isRequired,
  renderInfo: PropTypes.bool.isRequired,
};

export default Calculator;
