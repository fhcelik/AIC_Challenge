import React from 'react';
import { Flipper, Front, Back } from './index';
import { compose, withStateHandlers, lifecycle } from 'recompose';
import { Typography } from '@material-ui/core';

const style = {
  backgroundColor: 'black',
  color: 'white',

  minHeight: '50px',
  textAlign: 'center',
  padding: '1em',
  margin: '2em',
  border: '5px solid white',
  cursor: 'pointer',
};

const enhance = withStateHandlers(
  { flipped: false },
  {
    clicked: ({ flipped }) => () => ({ flipped: !flipped }),
  }
);
const ClickFlipperDemo = ({ flipped, clicked }) => (
  <Flipper isFlipped={flipped}>
    <Front>
      <Typography style={style} onClick={clicked}>
        Click Me!
      </Typography>
    </Front>
    <Back>
      <Typography style={style} onClick={clicked}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
        suscipit varius nulla, in blandit erat cursus eget. Sed ullamcorper
        lorem nec augue maximus, vel condimentum velit cursus. Vivamus euismod
        condimentum magna, sed ullamcorper turpis pretium sed. Sed aliquet
        accumsan sem, eget euismod ex eleifend in. Pellentesque in libero purus.
        Ut sollicitudin ex sit amet lacus fringilla, eget maximus dolor blandit.
        Cras sollicitudin fringilla mi, sit amet interdum nunc luctus et. Proin
        sit amet ex lacinia, egestas lacus vitae, cursus urna. Nulla suscipit
        tellus ut felis mollis viverra. Praesent justo risus, vehicula non
        ligula eget, mattis laoreet lectus. Suspendisse eget feugiat mauris,
        pulvinar egestas eros. Pellentesque habitant morbi tristique senectus et
        netus et malesuada fames ac turpis egestas. Vivamus pretium a est quis
        placerat. Pellentesque habitant morbi tristique senectus et netus et
        malesuada fames ac turpis egestas.
      </Typography>
    </Back>
  </Flipper>
);
const EnhancedClickFlipperDemo = enhance(ClickFlipperDemo);

const RotateFlipperDemo = ({ flipped, rotateForever }) => (
  <Flipper isFlipped={flipped}>
    <Front>
      <Typography style={style}>Side 1</Typography>
    </Front>
    <Back>
      <Typography style={style}>Side 2</Typography>
    </Back>
  </Flipper>
);
const rotate = compose(
  enhance,
  lifecycle({
    componentDidMount() {
      setInterval(this.props.clicked, 1000);
    },
  })
);
const EnhancedRotateFlipperDemo = rotate(RotateFlipperDemo);

export default {
  flipper: () => <EnhancedClickFlipperDemo />,
  flipperRotate: () => <EnhancedRotateFlipperDemo />,
};
