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
import injectSaga from 'utils/injectSaga';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import {
    makeSelectTopNav,
    // makeSelectHeaderLoading,
    // makeSelectHeaderError,
} from './selectors';

import { fetchTopNav } from './actions';

export class Header extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    componentDidMount() {
        this.props.dispatch(fetchTopNav({}));
    }

    render() {
        const navItems = this.props.topNav;

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
    topNav: PropTypes.array,
    // loading: PropTypes.bool,
    // error: PropTypes.oneOfType([
    //     PropTypes.bool,
    //     PropTypes.object,
    // ]),
};

const mapStateToProps = createStructuredSelector({
    topNav: makeSelectTopNav(),
    // loading: makeSelectHeaderLoading(),
    // error: makeSelectHeaderError(),
});

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'header', reducer });
const withSaga = injectSaga({ key: 'mall', saga });

export default compose(
    withReducer,
    withSaga,
    withConnect,
)(Header);
