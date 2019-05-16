/**
*
* Loading
*
*/

import React from 'react';

import './style.scss';


function Loading(props) {
    return (
        <div className={`custom-loading-image-container ${props.fixed ? 'posi-fixed' : ''}`}>
            <div className="custom-loading-image-holder">
                <img
                    className="custom-loading-image"
                    style={{ ...props.style }}
                    src={require('./../../images/loading.svg')}
                    alt=""
                />
            </div>
        </div>
    );
}

export default Loading;
