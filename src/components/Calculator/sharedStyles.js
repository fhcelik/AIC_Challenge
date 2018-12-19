export const CalculatorStyles = theme => ({
  root: {
    width: '320px',
    backgroundColor: theme.palette.card.background,
  },
  content: {
    flexGrow: 1,
    width: 'auto',
    margin: '0 0.4em 0.4em',
  },
  tags: {
    overflow: 'auto',
  },
  tag: {
    ...theme.typography.subheading,
    backgroundColor: theme.palette.tag.background,
    borderRadius: '0px',
    color: theme.palette.tag.highlight,
    textTransform: 'uppercase',
    margin: 3,
    padding: 6,
    maxWidth: 304,
  },
  args: {
    flexGrow: 2,
    marginBottom: 6,
  },
  argument: {
    marginTop: -1,
    marginBottom: -1,
  },
  title: {
    marginBottom: '0.5em',
    marginTop: '0.1em',
    overflow: 'hidden',
    textTransform: 'uppercase',
    width: '100%',
  },
  titleText: {
    ...theme.typography.display3,
  },
  progress: {
    margin: 'auto',
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 100,
  },
  isSaving: {
    pointerEvents: 'none',
    opacity: '0.6',
    minHeight: '200px',
  },
  author: {
    margin: '2px 7px 0 5px',
    padding: '0 7px',
    width: 30,
    height: 30,
    borderRight: `1px solid ${theme.palette.card.header}`,
  },
});

export const ArgumentStyles = {
  textField: {
    '& input::-webkit-inner-spin-button, & input::-webkit-outer-spin-button': {
      '-webkit-appearance': 'none',
      margin: 0,
    },
    '& input': {
      '-moz-appearance': 'textfield',
    },
  },
  endAdornmentRoot: {
    margin: '0 2px 2px 0',
  },
  inputLabel: {
    textTransform: 'none',
  },
};

export const ResultStyles = theme => ({
  result: {
    margin: '0.5em 0',
    backgroundColor: theme.palette.card.header,
    padding: '0.8em 0',
    border: `1px solid ${theme.palette.text.faded}`,
  },
  container: {
    padding: '0 0.3em',
    position: 'relative',
    minHeight: 25,
  },
  resultText: {
    ...theme.typography.display4,
  },
  resultSelectMenu: {
    ...theme.typography.display4,
  },
  resultSelectIcon: {
    bottom: '-0.75em',
    right: '-0.35em',
  },
});

export const InfoStyles = theme => ({
  border: {
    border: `2px solid ${theme.palette.card.header}`,
    padding: '0.2em',
    marginTop: '-2px',
    width: '100%',
  },
  formula: {
    color: theme.palette.text.primary,
    overflow: 'auto',
  },
  description: {
    ...theme.typography.display3,
  },
  author: {
    margin: '10px 0',
  },
});
