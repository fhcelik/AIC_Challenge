import Promise from 'bluebird';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'jest-enzyme';

configure({ adapter: new Adapter() });

if (global.document) {
  document.createRange = () => ({
    setStart: () => {},
    setEnd: () => {},
    commonAncestorContainer: {
      nodeName: 'BODY',
      ownerDocument: document,
    },
  });
}

const mockAsyncActionCreator = () => ({
  type: '@@calcoola/stub',
  payload: Promise.resolve(),
});

jest.mock('material-ui/Tooltip', () => 'Tooltip');
jest.mock('material-ui/transitions/Slide', () => 'Slide');
jest.mock('material-ui/Tooltip', () => 'Tooltip');
jest.mock('react-stack-grid', () => 'StackGrid');
jest.mock('./redux/actions/collections', () => ({
  fetchCollection: mockAsyncActionCreator,
}));
jest.mock('./redux/actions/calculatorsByAuthor', () => ({
  fetchCalculatorsByAuthorId: mockAsyncActionCreator,
}));

jest.mock(
  'popper.js',
  () =>
    class Popper {
      static placements = [
        'auto',
        'auto-end',
        'auto-start',
        'bottom',
        'bottom-end',
        'bottom-start',
        'left',
        'left-end',
        'left-start',
        'right',
        'right-end',
        'right-start',
        'top',
        'top-end',
        'top-start',
      ];

      constructor() {
        return {
          destroy: () => {},
          scheduleUpdate: () => {},
        };
      }
    }
);
