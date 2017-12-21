// import { withRouter } from "../../../../../../Library/Caches/typescript/2.6/node_modules/@types/react-router";

import React from 'react';
import { shallow } from 'enzyme';

import Header from '../index';

describe('<Header />', () => {
    it('should render Header Correctly', () => {
        const wrapper = shallow(<Header />);
        expect(wrapper).toMatchSnapshot();
    });

    // it('should have a logo', () => {
    //     const wrapper = shallow(<Header />);
    //     expect(wrapper.find('img').length).toEqual(1);
    // });

    // it('should display some links', () => {
    //     const wrapper = shallow(<Header />);
    //     expect(wrapper.find('ul').length).toEqual(1);
    //     expect(wrapper.find('ul').children().nodes.length).toEqual(3);
    // });

    // it('should have a logout button', () => {
    //     const wrapper = shallow(<Header />);
    //     expect(wrapper.props().children.props.children[2].props.children).toEqual('Logout');
    //     expect(wrapper.find('button').children().nodes[0]).toEqual('Logout');
    // });

    // it('should show logout button if authenticated', () => {
    //     app.setProps({ authenticated: true });
    //     expect(app.find('button').length).toEqual(1);
    // });
});
