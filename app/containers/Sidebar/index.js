/**
 *
 * Sidebar
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { connect } from 'react-redux';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import Navigator from 'components/Navigator';
import { notifyInfo } from 'containers/Notify';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectSidebar from './selectors';
import reducer from './reducer';
import saga from './saga';
// import messages from './messages';

export const navUpperItems = [
    {
        code: 'search',
        text: 'Search',
        iconClass: 'fa fa-search',

        // url: '/search',
        // type: 'internal_url',

        type: 'dropdown',
        items: [
            {
                code: 'searchTitle',
                type: 'title',
                text: 'Search',
            },
            {
                code: 'searchComponent',
                type: 'search',
            },
        ],
    }, {
        code: 'bookmark',
        text: 'Bookmark',
        iconClass: 'fa fa-bookmark',
        url: '/bookmark',
        type: 'internal_url',
    }, {
        code: 'favourite',
        text: 'Favourite',
        iconClass: 'fa fa-star',
        url: '/favourite',
        type: 'internal_url',
    }, {
        code: 'explore',
        text: 'Explore',
        iconClass: 'fa fa-puzzle-piece',
        url: '/explore',
        type: 'internal_url',
    }, {
        code: 'refresh',
        text: 'Refresh',
        iconClass: 'fa fa-refresh',
        url: '/refresh',
        type: 'internal_url',
    },
];

export const navLowerItems = [
    {
        code: 'language',
        text: 'Language',
        iconClass: 'fa fa-language',
        url: '/language',
        type: 'internal_url',
    }, {
        code: 'messenger',
        text: 'Messenger',
        iconClass: 'fa fa-comments',
        url: '/messenger',
        type: 'internal_url',
    }, {
        code: 'contact',
        text: 'Contact Us',
        iconClass: 'fa fa-phone',
        url: '/contact',
        // type: 'internal_url',
        type: 'exec_function',
    },
];

const LowerLeft = styled.div`
    position: absolute;
    bottom: 0;
`;

const ShowMore = styled.div`
    background-color: black;
    color: white;
`;

const isVertical = true;

export class Sidebar extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    handleLinkClick() {
        notifyInfo('TODO: action handler');
    }

    render() {
        return (
            <div className="text-left">
                <div className="upper-left">
                    {<Navigator
                        items={navUpperItems}
                        vertical={isVertical}
                        handleLinkClick={this.handleLinkClick}
                    />}
                </div>
                <LowerLeft className="lower-left">
                    <hr />
                    {<Navigator
                        items={navLowerItems}
                        vertical={isVertical}
                        handleLinkClick={this.handleLinkClick}
                    />}
                    <br />
                    <ShowMore className="text-center">
                        <span className="fa fa-arrow-right p-3"></span>
                    </ShowMore>
                </LowerLeft>
            </div>
        );
    }
}

Sidebar.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
    sidebar: makeSelectSidebar(),
});

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'sidebar', reducer });
const withSaga = injectSaga({ key: 'sidebar', saga });

export default compose(
    withReducer,
    withSaga,
    withConnect,
)(Sidebar);
