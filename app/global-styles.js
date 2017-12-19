import { injectGlobal } from 'styled-components';
import './global-styles.scss';

/* eslint no-unused-expressions: 0 */
injectGlobal`
    html,
    body {
        height: 100%;
        width: 100%;
    }
`;
