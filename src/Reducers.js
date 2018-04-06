import { combineReducers } from 'redux';
import { handleAction, handleActions } from 'redux-actions';
import { ActionTypes } from './Actions';

const formulaCardsReducerMap = {};
formulaCardsReducerMap[ActionTypes.addFormulaCard] = 
  (formulaCards, action) => (formulaCards.concat(action.payload));
formulaCardsReducerMap[ActionTypes.changeFormulaArg] =
  (formulaCards, action) => {
    const cardId = action.payload.formulaCard;
    const newCard = Object.assign({}, formulaCards[cardId],
      {argvals: Object.assign({}, formulaCards[cardId].argvals)});
    for(const arg in newCard.argvals) {
      Object.assign(newCard.argvals[arg], action.payload.argvals[arg]);
    }
    return formulaCards.map((fc, index) => cardId == index ? newCard : fc);
  };

export default combineReducers({
  formulas : handleAction(ActionTypes.addFormula,
    (formulas, action) => (formulas.concat(action.payload)), []),
  formulaCards: handleActions(formulaCardsReducerMap, []),
});