import React from 'react';
import { withStyles } from '@material-ui/core/styles';

export const FLIP_TIME = 500;

const styles = () => ({
  flipperContainer: {
    zIndex: '1',
    display: 'block',
    perspective: '1000px',
  },
  flipper: {
    zIndex: '1',
    width: '100%',
    height: '100%',
    position: 'relative',
    transformStyle: 'preserve-3d',
  },
});

const Flipper = ({ classes, isFlipped, onResize, children }) => (
  <div className={classes.flipperContainer}>
    <div className={classes.flipper}>
      {React.Children.map(children, child => {
        return React.cloneElement(child, {
          isFlipped,
          onResize,
        });
      })}
    </div>
  </div>
);

export default withStyles(styles)(Flipper);
