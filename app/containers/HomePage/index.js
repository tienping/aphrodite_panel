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
import tableSetting from 'utils/globalTableSetting';
import { dataChecking } from 'utils/globalUtils';

import messages from './messages';

const Header = styled.h1`
    text-align: center;
`;

const Section = styled.section`
    text-align: center;
    padding: 5vw 1vw;
`;

const NavButtonItem = styled.a`
    font-size: 120%;
    margin: .5rem 1rem;
    padding: 1.5rem 3rem;
    display: inline-block;
    border-radius: 15px;
    color: ${(props) => props.theme.secondary_bg};
    background-color: ${(props) => props.theme.secondary_color};
    &:hover {
        cursor: pointer;
        transform: scale(1.05);
        transition: transform .215s;
        color: ${(props) => props.theme.tertiary_color};
        text-decoration: none;
    };
`;

export default class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    render() {
        return (
            <div className="container">
                <Header>
                    <FormattedMessage {...messages.header} />
                </Header>
                <Section>
                    {
                        Object.keys(tableSetting).map((key, index) => (
                            <div key={index}>
                                <NavButtonItem href={dataChecking(tableSetting, key, 'href')}>
                                    {dataChecking(tableSetting, key, 'title')}
                                </NavButtonItem>
                            </div>
                        ))
                    }
                </Section>
            </div>
        );
    }
}
