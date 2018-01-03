import React from 'react';
import { shallow } from 'enzyme';
import { MemoryRouter, Route } from 'react-router-dom';

import PrivateRoute from '../PrivateRoute';

describe('<PrivateRoute />', () => {
    let authenticated;
    let spy;

    beforeEach(() => {
        authenticated = false;
        spy = () => <span />;
    });

    it('should render a route', (done) => {
        const wrapper = shallow(
            <MemoryRouter initialEntries={['/']} initialIndex={0}>
                <PrivateRoute auth={authenticated} path="/" component={spy} />
            </MemoryRouter>
        ).children().at(0).dive();
        expect(wrapper.find(Route).length).toEqual(1);
        done();
    });

    // it('should not display LoginForm authenticated=true', (done) => {
    //     authenticated = true;
    //     const wrapper = shallow(
    //         <MemoryRouter initialEntries={['/']} initialIndex={0}>
    //             <PrivateRoute auth={authenticated} path="/" component={spy} />
    //         </MemoryRouter>
    //     ).children().at(0).dive();

    //     const loginForm = wrapper.find(Route).props().render().type.preload;
    //     expect(loginForm).toBeUndefined();

    //     done();
    // });

    // it('should display LoginForm if authenticated=false', (done) => {
    //     const wrapper = shallow(
    //         <MemoryRouter initialEntries={['/']} initialIndex={0}>
    //             <PrivateRoute auth={authenticated} path="/" component={spy} />
    //         </MemoryRouter>
    //     ).children().at(0).dive();

    //     const loginForm = wrapper.find(Route).props().render().type.preload;
    //     expect(loginForm).toBeDefined();

    //     done();
    // });

    it('should render mall page route', (done) => {
        const wrapper = shallow(
            <MemoryRouter initialEntries={['/mall']} initialIndex={0}>
                <PrivateRoute auth={authenticated} path="/" component={spy} />
            </MemoryRouter>
        ).children().at(0).dive();
        expect(wrapper.find(Route).length).toEqual(1);
        done();
    });
});
