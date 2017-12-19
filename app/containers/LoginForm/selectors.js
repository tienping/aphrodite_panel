import { createSelector } from 'reselect';

/**
 * Direct selector to the session state domain
 */
const selectSession = (state) => state.get('LoginForm');

/**
 * Other specific selectors
 */


/**
 * Default selector used by LoginForm
 */

const makeSelectAuthError = () => createSelector(
    selectSession,
    (session) => session.get('error')
);

const makeSelectAuthLoading = () => createSelector(
    selectSession,
    (session) => session.get('loading')
);

export {
    selectSession,
    makeSelectAuthError,
    makeSelectAuthLoading,
};
