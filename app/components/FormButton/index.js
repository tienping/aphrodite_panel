/**
*
* FormButton
*
*/

import React from 'react';

import { dataChecking, getXdp } from 'utils/globalUtils';

import tableSetting from 'utils/globalTableSetting';
import formSetting from 'utils/globalFormSetting';

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

import './style.scss';

// import dataGroup from './../../containers/TableListingPage/mockdata';

class FormButton extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    constructor(props) {
        super(props);

        if (this.props.pageType && tableSetting && tableSetting[this.props.pageType]) {
            this.state = {
                formConfig: dataChecking(formSetting, this.props.pageType, 'fields'),
                formHeight: dataChecking(formSetting, this.props.pageType, 'formHeight'),
            };
        }
    }

    state = {
        showModal: false,
    }

    onSelectImage = (event, field) => {
        const { target } = event;
        const obj = {};

        if (target.files && target.files[0]) {
            const reader = new FileReader();

            reader.onload = (e) => {
                obj[field.key] = {
                    info: target.files[0],
                    url: e.target.result,
                };
                this.setState(obj);
            };

            reader.readAsDataURL(target.files[0]);
        } else {
            obj[field.key] = {};
            this.setState(obj);
        }
    }

    onUnselectImage = (event, inputId, field) => {
        const inputEl = document.getElementById(inputId);
        inputEl.value = '';

        const obj = [];
        obj[field.key] = {};
        this.setState(obj);
    }

    renderInput(field) {
        switch (field.type) {
            case 'image':
                return (
                    <div className="gamicenter-imageUploader">
                        <div className="image-preview">
                            <span
                                onClick={() => {
                                    const inputEl = document.getElementById(`${this.props.pageType}-${field.key}-uploader`);
                                    inputEl.click();
                                }}
                            >
                                <img
                                    className="previewer-image"
                                    style={{ maxHeight: '150px', maxWidth: '80%' }}
                                    width={dataChecking(this.state, field.key, 'url') ? '' : '30%'}
                                    src={dataChecking(this.state, field.key, 'url') || require('../../Resources/arrow_up_upload-512.png')}
                                    alt="preview upload"
                                />
                            </span>
                            {
                                dataChecking(this.state, field.key, 'url') ?
                                    <span
                                        className="close-btn"
                                        onClick={(event) => {
                                            this.onUnselectImage(event, `${this.props.pageType}-${field.key}-uploader`, field);
                                        }}
                                    >
                                        <img alt="unselect-upload" width="18px" src={require('../../Resources/ic-close.png')} />
                                    </span>
                                    :
                                    null
                            }
                        </div>
                        <input id={`${this.props.pageType}-${field.key}-uploader`} type="file" onChange={(event) => { this.onSelectImage(event, field); }}></input>
                    </div>
                );
            default:
                return <input onChange={(value) => this.handleTextChange(field.key, value)} placeholder={field.placeholder} />;
        }
    }

    renderField(field) {
        return (
            <div className="field-input">
                <span className="field-label">{`${field.label}: `}</span>
                { this.renderInput(field) }
            </div>
        );
    }

    render() {
        return (
            <div className="FormButton-component">
                <div
                    id="page-action-modal"
                    style={{ ...this.props.style, height: `${this.state.showModal ? this.state.formHeight : '45px'}` }}
                    className={`page-action-modal gamicenter-button ${this.state.showModal ? 'triggered' : ''}`}
                >
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
                                    this.state.formConfig ?
                                        <div>
                                            {
                                                this.state.formConfig.map((field, index) => (
                                                    <div
                                                        key={index}
                                                        className="create-modal-form-field"
                                                    >
                                                        <span style={{ color: 'red' }}>{dataChecking(this.state, field.key, 'error')}</span>
                                                        { this.renderField(field) }
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
