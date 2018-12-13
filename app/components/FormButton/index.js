/**
*
* FormButton
*
*/

import React from 'react';

import { dataChecking, getXdp } from 'utils/globalUtils';

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

import './style.scss';

class FormButton extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    state = {
        showModal: false,
    }

    render() {
        return (
            <div className="FormButton-component">
                <div role="button" id="page-action-modal" style={this.props.style} className={`page-action-modal gamicenter-button ${this.state.showModal ? 'triggered' : ''}`} >
                    {
                        this.state.showModal ?
                            <div className="become-title">{this.props.children}</div>
                            :
                            <div className="default-button-text button-text" onClick={() => this.setState({ showModal: true })}>{this.props.children}</div>
                    }
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
                                                        <div className="field-input">
                                                            <span className="field-label">{`${field.label}: `}</span>
                                                            <input onChange={(value) => this.handleTextChange(field.key, value)} placeholder={field.placeholder} />
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                            <div className="gamicenter-button smaller">
                                                {
                                                    this.state.loading ?
                                                        <span>loading...</span>
                                                        :
                                                        <span>Create</span>
                                                }
                                            </div>
                                        </div>
                                        :
                                        null
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div id="page-action-modal-wrapper" className={`page-action-modal-wrapper ${this.state.showModal ? 'triggered' : ''}`}></div>
            </div>
        );
    }
}

FormButton.propTypes = {

};

export default FormButton;
