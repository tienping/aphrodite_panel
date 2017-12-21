/**
 *
 * MallPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import {
    makeSelectMall,
    makeSelectMallLoading,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import { fetchMall } from './actions';

export class MallPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    componentDidMount() {
        // const params = (this.props.location) ? this.props.location.get('search') : null;
        // const page = parseFloat(getURLParams(params).page) || null;
        // this.props.dispatch(fetchMall(page));
        this.props.dispatch(fetchMall({}));
    }

    render() {
        return (
            <div>
                <Helmet>
                    <title>Mall Page</title>
                    <meta name="description" content="Description of Mall" />
                </Helmet>
                <FormattedMessage {...messages.header} />
                {this.props.loading &&
                    <h3>Loading...</h3>
                }
                <div>{JSON.stringify(this.props.mall)}</div>
            </div>
        );
    }
}

MallPage.propTypes = {
    dispatch: PropTypes.func.isRequired,
    mall: PropTypes.object,
    loading: PropTypes.bool,
    // error: PropTypes.oneOfType([
    //     PropTypes.bool,
    //     PropTypes.object,
    // ]),
};

const mapStateToProps = createStructuredSelector({
    mall: makeSelectMall(),
    loading: makeSelectMallLoading(),
});

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'mall', reducer });
const withSaga = injectSaga({ key: 'mall', saga });

export default compose(
    withReducer,
    withSaga,
    withConnect,
)(MallPage);
