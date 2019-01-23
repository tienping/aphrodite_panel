/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import tableSetting from 'utils/globalTableSetting';
import { dataChecking } from 'globalUtils';
// import Fancy from '@tienping/my-react-dom';

import messages from './messages';

const Header = styled.h1`
    text-align: center;
`;

const Section = styled.section`
    text-align: center;
    padding: 5vw 1vw;
`;

export default class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    render() {
        return (
            <div className="container">
                <Header>
                    <FormattedMessage {...messages.header} />
                </Header>
                {/* <div><Fancy /></div> */}
                <Section>
                    {
                        Object.keys(tableSetting).map((key, index) => (
                            <div key={index}>
                                <NavLink to={dataChecking(tableSetting, key, 'link')} className="gamicenter-button" title={dataChecking(tableSetting, key, 'title')}>
                                    {dataChecking(tableSetting, key, 'title')}
                                </NavLink>
                            </div>
                        ))
                    }
                </Section>
            </div>
        );
    }
}
