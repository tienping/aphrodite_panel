import { createSelector } from 'reselect';

/**
 * Direct selector to the globalDataProcessor state domain
 */
const selectGlobalDataProcessorDomain = (state) => state.get('globalDataProcessor');

/**
 * Other specific selectors
 */


/**
 * Default selector used by GlobalDataProcessor
 */

const makeSelectGlobalDataProcessor = () => createSelector(
    selectGlobalDataProcessorDomain,
    (substate) => substate.toJS()
);

export default makeSelectGlobalDataProcessor;
export {
    selectGlobalDataProcessorDomain,
};
