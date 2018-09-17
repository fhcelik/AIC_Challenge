import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import {
  compose,
  lifecycle,
  pure,
  withHandlers,
  withProps,
  withStateHandlers,
} from 'recompose';
import { FLIP_TIME } from './Flipper';
import { withStyles } from 'material-ui';

const SIDES = {
  front: 'front',
  back: 'back',
};

const styles = () => ({
  tile: {
    display: 'block',
    width: '100%',
    height: 'auto',
    backfaceVisibility: 'hidden',
    position: 'absolute',
    top: 0,
    left: 0,
    transformStyle: 'preserve-3d',
    transition: `transform ease ${FLIP_TIME}ms`,
  },
  front: {
    transform: 'rotateY(0deg)',
  },
  back: {
    transform: 'rotateY(-180deg)',
  },
  frontFlipped: {
    transform: 'rotateY(180deg)',
  },
  backFlipped: {
    transform: 'rotateY(0deg)',
  },
});

const enhance = compose(
  withStateHandlers(
    {
      hidden: false,
      hideHandler: undefined,
    },
    {
      setHidden: () => hidden => ({ hidden }),
      saveHideHandler: () => hideHandler => ({ hideHandler }),
    }
  ),

  withProps(({ position }) => ({
    isFront: position === SIDES.front,
    isBack: position === SIDES.back,
  })),

  withProps(({ isFront, isBack, isFlipped }) => ({
    isVisible: (isFront && !isFlipped) || (isBack && isFlipped),
  })),

  withHandlers({
    resizeNowAndLater: ({ onResize }) => () => {
      setTimeout(onResize, 0);
      setTimeout(onResize, FLIP_TIME);
    },
  }),

  lifecycle({
    componentDidUpdate({ isFlipped: previousIsFlipped }) {
      const {
        isVisible,
        setHidden,
        resizeNowAndLater,
        isFlipped: currentIsFlipped,
        hideHandler,
        saveHideHandler,
      } = this.props;

      if (previousIsFlipped !== currentIsFlipped) {
        clearTimeout(hideHandler);
        if (isVisible) {
          setHidden(false);
        } else {
          saveHideHandler(setTimeout(() => setHidden(true), FLIP_TIME));
        }
        resizeNowAndLater();
      }
    },
    componentWillUnmount() {
      clearTimeout(this.props.hideHandler);
    },
  }),
  withStyles(styles, { name: 'Flipper' }),
  pure
);

const Tile = ({ classes, children, isFront, isBack, isFlipped, hidden }) => (
  <div
    className={cx(classes.tile, {
      [classes.front]: isFront && !isFlipped,
      [classes.back]: isBack && !isFlipped,
      [classes.frontFlipped]: isFront && isFlipped,
      [classes.backFlipped]: isBack && isFlipped,
    })}
  >
    {!hidden && children}
  </div>
);

Tile.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
  isFront: PropTypes.bool.isRequired,
  isBack: PropTypes.bool.isRequired,
  isFlipped: PropTypes.bool.isRequired,
  hidden: PropTypes.bool.isRequired,
};

export const Front = compose(withProps({ position: SIDES.front }), enhance)(
  Tile
);
export const Back = compose(withProps({ position: SIDES.back }), enhance)(Tile);
