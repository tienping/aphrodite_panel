import { fromJS } from 'immutable';
import {
    selectMallDomain,
    makeSelectMallLoading,
    makeSelectMallError,
    makeSelectMall,
} from '../selectors';

describe('Session Selectors', () => {
    it('should select from MallPage', () => {
        const mall = fromJS({});
        const mock = fromJS({
            mall: {},
        });
        expect(selectMallDomain(mock)).toEqual(mall);
    });
});

describe('Mall Selectors', () => {
    it('should select error in MallPage', () => {
        const selector = makeSelectMallError();
        const errorState = fromJS({
            error: false,
        });
        const mock = fromJS({ mall: errorState });
        expect(selector(mock)).toEqual(errorState.get('error'));
    });

    it('should select loading in MallPage', () => {
        const selector = makeSelectMallLoading();
        const loadingSelector = fromJS({
            loading: false,
        });
        const mock = fromJS({ mall: loadingSelector });
        expect(selector(mock)).toEqual(loadingSelector.get('loading'));
    });

    it('should select mall in MallPage', () => {
        const selector = makeSelectMall();
        const mallSelector = fromJS({
            mall: {},
        });
        const mock = fromJS({ mall: mallSelector });
        expect(selector(mock)).toEqual(mallSelector.get('mall'));
    });
});
