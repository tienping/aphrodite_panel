import React from 'react';
import { shallow } from 'enzyme';

import Navigator from '../index';

describe('<Navigator />', () => {
    const navItems = [
        { link: '/mall', name: 'Malls' },
        { link: '/flagship', name: 'Flagship Stores' },
    ];
    const wrapper = shallow(<Navigator items={navItems} />);

    it('should render Navigator Correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('should have a nav element', () => {
        expect(wrapper.find('nav').length).toEqual(1);
    });
});
