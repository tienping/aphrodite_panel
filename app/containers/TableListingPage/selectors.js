import { createSelector } from 'reselect';

/**
 * Direct selector to the tableListingPage state domain
 */
const selectTableListingPageDomain = (state) => state.get('tableListingPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by TableListingPage
 */

const makeSelectTableListingPage = () => createSelector(
    selectTableListingPageDomain,
    (substate) => substate.toJS()
);

export default makeSelectTableListingPage;
export {
    selectTableListingPageDomain,
};
