import React from 'react';
import { shallow } from 'enzyme';
import { Route } from 'react-router-dom';

import { App } from '../index';
import PrivateRoute from '../PrivateRoute';

describe('<App />', () => {
    const auth = false;
    let appNoLogin;
    let appDoLogin;
    beforeEach(() => {
        appNoLogin = shallow(<App authenticated={auth} />);
        appDoLogin = shallow(<App authenticated={!auth} />);
    });

// before login:

    it('should NOT show HershopHeader before login', () => {
        expect(appNoLogin.find('#hershop-header-container').length).toEqual(0);
    });

    it('should NOT show show HershopSideBar before login', () => {
        expect(appNoLogin.find('#hershop-sidebar-container').length).toEqual(0);
    });

    it('should show HershopContent before login', () => {
        expect(appNoLogin.find('#hershop-content-container').length).toEqual(1);
    });

    it('should render Routes and PrivateRoutes before login', (done) => {
        const routes = appNoLogin.find(Route).length;
        const privateRoutes = appNoLogin.find(PrivateRoute).length;
        expect(routes).toBeGreaterThan(0);
        expect(privateRoutes).toBeGreaterThan(0);
        done();
    });

// after login:

    it('should show HershopHeader after login', () => {
        expect(appDoLogin.find('#hershop-header-container').length).toEqual(1);
    });

    it('should show show HershopSideBar after login', () => {
        expect(appDoLogin.find('#hershop-sidebar-container').length).toEqual(1);
    });

    it('should show HershopContent after login', () => {
        expect(appDoLogin.find('#hershop-content-container').length).toEqual(1);
    });

    it('should render Routes and PrivateRoutes after login', (done) => {
        const routes = appNoLogin.find(Route).length;
        const privateRoutes = appNoLogin.find(PrivateRoute).length;
        expect(routes).toBeGreaterThan(0);
        expect(privateRoutes).toBeGreaterThan(0);
        done();
    });
});
