import { createSelector } from 'reselect';

/**
 * Direct selector to the mall state domain
 */
const selectMallDomain = (state) => state.get('mall');

/**
 * Other specific selectors
 */


/**
 * Default selector used by Mall
 */
const makeSelectMallLoading = () => createSelector(
    selectMallDomain,
    (substate) => substate.get('loading')
);

const makeSelectMallError = () => createSelector(
    selectMallDomain,
    (substate) => substate.get('error')
);

const makeSelectMall = () => createSelector(
    selectMallDomain,
    (substate) => substate.get('mall')
);

export default makeSelectMall;
export {
    selectMallDomain,
    makeSelectMallLoading,
    makeSelectMallError,
    makeSelectMall,

};
