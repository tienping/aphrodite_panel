import React from 'react';
import { shallow, mount } from 'enzyme';

import { MallPage, mapDispatchToProps } from '../index';

describe('<MallPage />', () => {
    it('should how helmet with title and meta', () => {
        const mallPage = shallow(<MallPage dispatch={jest.fn} />);
        expect(mallPage.find('title').length).toEqual(1);
        expect(mallPage.find('meta[name="description"]').length).toEqual(1);
    });
});

describe('mapDispatchToProps', () => {
    const spy = jest.fn();

    beforeEach(() => {
        mount(<MallPage dispatch={spy} />);
    });

    afterEach(() => {
        spy.mockClear();
    });

    it('should be injected', (done) => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        expect(result).toBeDefined();
        done();
    });

    it('should dispatch fetchMall() when componentDidMount', (done) => {
        expect(spy).toHaveBeenCalled();
        done();
    });
});
