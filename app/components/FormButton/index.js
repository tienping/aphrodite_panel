/**
*
* FormButton
*
*/

import React from 'react';
import styled from 'styled-components';

import { dataChecking, getXdp } from 'utils/globalUtils';

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

import './style.scss';

const Item = styled.div`
    background-color: 'lightyellow';
`;

const TouchableOpacity = styled.div`
    margin-top: 2rem;
`;

class FormButton extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    state = {
        showModal: false,
    }

    render() {
        return (
            <div className="FormButton-component">
                <div role="button" id="page-action-modal" className={`page-action-modal gamicenter-button ${this.state.showModal ? 'triggered' : ''}`} >
                    <div className="button-text" onClick={() => this.setState({ showModal: true })}>{this.props.children}</div>
                    <div className="page-action-modal-toggle">
                        <div
                            style={{
                                position: 'absolute',
                                right: '.5rem',
                                top: '.5rem',
                                backgroundColor: 'rgba(0,0,0,0.3)',
                                borderRadius: 100,
                                zIndex: 100,
                            }}
                            onClick={() => { this.setState({ showModal: false }); }}
                        >
                            <span
                                style={{
                                    padding: getXdp(1),
                                    fontWeight: '700',
                                    color: 'white',
                                }}
                            >
                                X
                            </span>
                        </div>
                        <div>
                            <div>
                                {
                                    this.props.formConfig ?
                                        <div>
                                            {
                                                this.props.formConfig.map((field, index) => (
                                                    <div
                                                        key={index}
                                                        className="create-modal-form-field"
                                                    >
                                                        <span style={{ color: 'red' }}>{dataChecking(this.props.formFields, field.key, 'error')}</span>
                                                        <Item style={{ marginTop: getXdp(3) }}>
                                                            <input onChange={(value) => this.handleTextChange(field.key, value)} placeholder={field.placeholder} />
                                                        </Item>
                                                    </div>
                                                ))
                                            }
                                            <TouchableOpacity activeOpacity={0.9} onClick={() => this.state.formAction()}>
                                                {
                                                    this.state.loading ?
                                                        <span>isloading</span>
                                                        :
                                                        <span className="gamicenter-button">Create</span>
                                                }
                                            </TouchableOpacity>
                                        </div>
                                        :
                                        null
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`page-action-modal-wrapper ${this.state.showModal ? '' : 'hide'}`}></div>
            </div>
        );
    }
}

FormButton.propTypes = {

};

export default FormButton;
