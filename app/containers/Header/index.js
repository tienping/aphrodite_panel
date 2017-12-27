/**
 *
 * Header
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { sessionService } from 'redux-react-session';

import Navigator from 'components/Navigator';

import injectReducer from 'utils/injectReducer';
import reducer from './reducer';
import messages from './messages';

import {
    makeSelectTopNav,
    makeSelectHeaderLoading,
} from './selectors';

export class Header extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    render() {
        const navItems = [
            { url: '/', text: 'Home' },
            // { link: '/mall', name: 'Malls' },
            // { link: '/flagship', name: 'Flagship Stores' },
        ];

        return (
            <div>
                <img className="navbar-brand" src="" alt="logo" />
                <Navigator items={navItems} />
                <button onClick={sessionService.deleteSession}>
                    <FormattedMessage {...messages.logout} />
                </button>
            </div>
        );
    }
}

Header.propTypes = {
    dispatch: PropTypes.func.isRequired,
    topNav: PropTypes.array.isRequired,
    loading: PropTypes.boolean,
};

const mapStateToProps = createStructuredSelector({
    topNav: makeSelectTopNav(),
    loading: makeSelectHeaderLoading(),
});

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'header', reducer });

export default compose(
    withReducer,
    withConnect,
)(Header);
