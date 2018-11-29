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

  title: {
    marginBottom: '0.5em',
    marginTop: '0.1em',
    overflowX: 'hidden',
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
});
export const ArgumentStyles = theme => ({
  argument: {
    border: `2px solid ${theme.palette.card.header}`,
    padding: '0.2em',
    marginTop: '-2px',
  },
  label: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    textTransform: 'uppercase',
    whiteSpace: 'nowrap',
    width: 380,
  },
  container: {
    padding: '0 0.3em',
    position: 'relative',
  },
  textField: {
    '& input::-webkit-inner-spin-button, & input::-webkit-outer-spin-button': {
      '-webkit-appearance': 'none',
      margin: 0,
    },
    '& input': {
      '-moz-appearance': 'textfield',
    },
    overflowX: 'hidden',
  },
});
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
});
