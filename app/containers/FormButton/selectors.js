import { createSelector } from 'reselect';

/**
 * Direct selector to the formButton state domain
 */
const selectFormButtonDomain = (state) => state.get('formButton');

/**
 * Other specific selectors
 */


/**
 * Default selector used by FormButton
 */

const makeSelectFormButton = () => createSelector(
    selectFormButtonDomain,
    (substate) => substate.toJS()
);

export default makeSelectFormButton;
export {
    selectFormButtonDomain,
};
