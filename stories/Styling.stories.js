import React from 'react';
import { storiesOf } from '@storybook/react';
import * as R from 'ramda';
import TestProvider from '../src/tests/TestProvider';
import { Typography, Grid, Paper } from 'material-ui';
import { colors } from '../src/providers/theme';
import { getContrastRatio } from 'material-ui/styles/colorManipulator';

const getContrastingColor = background => {
  try {
    return getContrastRatio('#FFF', background) < 6 ? '#000' : '#FFF';
  } catch (error) {
    console.error(error);
    return '#888';
  }
};

const getTypographyContainer = variant => (
  <Grid item key={variant}>
    <Typography variant={variant}>
      {variant}: lorem ipsum LOREM IPSUM 2,182.34 m/s(^2)
    </Typography>
  </Grid>
);

storiesOf('Styling', module)
  .addDecorator(TestProvider)
  .add('Colours', () => (
    <div>
      <Grid container direction="column" spacing={16}>
        {Object.keys(colors).map(name => (
          <Grid item key={name}>
            <Paper
              style={{
                backgroundColor: colors[name],
                height: '4em',
                padding: '1em',
              }}
            >
              <Typography
                variant="display4"
                style={{ color: getContrastingColor(colors[name]) }}
              >
                {name}: {colors[name]}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </div>
  ))
  .add('Typography', () => (
    <Grid container direction="column" spacing={16}>
      {R.map(getTypographyContainer, [
        'subheading',
        'display1',
        'display2',
        'display3',
        'display4',
      ])}
    </Grid>
  ));
