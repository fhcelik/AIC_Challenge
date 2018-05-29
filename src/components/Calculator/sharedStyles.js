export const CalculatorStyles = theme => ({
  root: {
    display: 'inline-block',
    width: '20em',
    backgroundColor: theme.colors.cardBackground,
  },

  content: {
    width: 'auto',
    margin: '0 0.4em 0.4em',
  },

  tag: {
    ...theme.typography.subheading,
    backgroundColor: theme.colors.tagBackground,
    borderRadius: '0px',
    color: theme.colors.tagHighlight,
    textTransform: 'uppercase',
    margin: 3,
    padding: 6,
  },

  args: {
    marginBottom: 6,
  },

  title: {
    textTransform: 'uppercase',
    marginTop: '0.1em',
    marginBottom: '0.5em',
  },
  titleText: {
    ...theme.typography.display3,
  },
});
export const ArgumentStyles = theme => ({
  argument: {
    border: `2px solid ${theme.colors.cardHeader}`,
    padding: '0.2em',
    marginTop: '-2px',
  },
  label: {
    textTransform: 'uppercase',
    marginBottom: '0.5em',
    ...theme.typography.subheading,
  },
  container: {
    padding: '0 0.3em',
    position: 'relative',
  },
});
export const ResultStyles = theme => ({
  result: {
    margin: '0.5em 0',
    backgroundColor: theme.colors.cardHeader,
    padding: '0.8em 0',
    border: `1px solid ${theme.colors.fadedText}`,
  },
  container: {
    padding: '0 0.3em',
    position: 'relative',
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
    border: `2px solid ${theme.colors.cardHeader}`,
    padding: '0.2em',
    marginTop: '-2px',
    width: '100%',
  },
  formula: {
    color: theme.colors.text,
  },
});
