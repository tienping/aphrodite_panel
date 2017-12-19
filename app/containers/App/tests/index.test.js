import React from 'react';
import { shallow } from 'enzyme';
import { Route } from 'react-router-dom';

import { App } from '../index';
import PrivateRoute from '../PrivateRoute';

describe('<App />', () => {
    const auth = false;
    let app;
    beforeEach(() => {
        app = shallow(<App authenticated={auth} />);
    });

    it('should show logout button if authenticated', () => {
        app.setProps({ authenticated: true });
        expect(app.find('button').length).toEqual(1);
    });

    it('should render Routes and PrivateRoutes', (done) => {
        const routes = app.find(Route).length;
        const privateRoutes = app.find(PrivateRoute).length;
        expect(routes).toBeGreaterThan(0);
        expect(privateRoutes).toBeGreaterThan(0);
        done();
    });
});
