import { createSelector } from 'reselect';

/**
 * Direct selector to the header state domain
 */
const selectHeaderDomain = (state) => state.get('header');

/**
 * Other specific selectors
 */


/**
 * Default selector used by Header
 */

const makeSelectHeaderLoading = () => createSelector(
    selectHeaderDomain,
    (substate) => substate.get('loading')
);

const makeSelectHeaderError = () => createSelector(
    selectHeaderDomain,
    (substate) => substate.get('error')
);

const makeSelectTopNav = () => createSelector(
    selectHeaderDomain,
    (substate) => substate.get('topNav')
);

export {
    selectHeaderDomain,
    makeSelectHeaderLoading,
    makeSelectHeaderError,
    makeSelectTopNav,
};
