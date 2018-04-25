import { createAction } from 'redux-actions';
import { Formula } from '../schemas/formula';

export const addFormula = createAction('@@calcoola/formula/add', Formula);
