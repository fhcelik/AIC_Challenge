import Adapter from 'enzyme-adapter-react-16';
import { configure } from 'enzyme';
import Promise from 'bluebird';
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

const mockActionCreator = () => ({ type: '@@calcoola/mock' });

const mockAsyncActionCreator = () => ({
  type: '@@calcoola/mock',
  payload: Promise.resolve(),
});

jest.mock('@material-ui/core/Tooltip', () => 'Tooltip');
jest.mock('@material-ui/core/Slide', () => 'Slide');
jest.mock('react-stack-grid', () => 'StackGrid');
jest.mock('./redux/actions/collections', () => ({
  fetchCollection: mockAsyncActionCreator,
  fetchUser: mockAsyncActionCreator,
}));
jest.mock('./redux/actions/calculatorsByAuthor', () => ({
  fetchCalculatorsByAuthorId: mockAsyncActionCreator,
  saveMyCalculator: mockActionCreator,
  removeMyNewCalculator: mockActionCreator,
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
