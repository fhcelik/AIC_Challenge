import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'jest-enzyme';
import { createAction } from 'redux-actions';

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

const mockActionCreator = createAction('@@calcoola/stub');

jest.mock('material-ui/Tooltip', () => 'Tooltip');
jest.mock('material-ui/transitions/Slide', () => 'Slide');
jest.mock('material-ui/Tooltip', () => 'Tooltip');
jest.mock('react-stack-grid', () => 'StackGrid');
jest.mock('./redux/actions/collections', () => ({
  fetchCollection: mockActionCreator,
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
