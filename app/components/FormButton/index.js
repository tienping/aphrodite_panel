/**
*
* FormButton
*
*/

import React from 'react';

import { dataChecking, getXdp } from 'utils/globalUtils';
import Switch from 'react-switch';

import tableSetting from 'utils/globalTableSetting';
import formSetting from 'utils/globalFormSetting';

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

import './style.scss';

// import dataGroup from './../../containers/TableListingPage/mockdata';

class FormButton extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
        };

        if (this.props.pageType && tableSetting && tableSetting[this.props.pageType]) {
            this.state.formConfig = dataChecking(formSetting, this.props.pageType, 'fields');
            this.state.formHeight = dataChecking(formSetting, this.props.pageType, 'formHeight');

            if (dataChecking(formSetting, this.props.pageType, 'fields')) {
                formSetting[this.props.pageType].fields.forEach((field) => {
                    this.state[field.key] = {
                        value: field.type === 'boolean' ? field.default || false : '',
                    };
                });
            }
        }
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
            obj[field.key] = {
                info: null,
                url: '',
            };
            this.setState(obj);
        }
    }

    onUnselectImage = (event, inputId, field) => {
        const inputEl = document.getElementById(inputId);
        inputEl.value = '';

        const obj = {};
        obj[field.key] = {
            value: '',
        };
        this.setState(obj);
    }

    handleTextChange = (event, field) => {
        const obj = {};
        let newValue = null;
        if (field.type === 'boolean') {
            newValue = event;
        } else if (event && event.target) {
            newValue = event.target.value;
        } else {
            alert('unhandled change...');
        }
        obj[field.key] = {
            value: newValue,
        };
        this.setState(obj);
    }

    renderInput(field) {
        switch (field.type) {
            case 'image':
                return (
                    <div className="gamicenter-imageUploader">
                        <div className="image-preview">
                            <span
                                className="image-holder"
                                onClick={() => {
                                    const inputEl = document.getElementById(`${this.props.pageType}-${field.key}-uploader`);
                                    inputEl.click();
                                }}
                            >
                                <img
                                    className={`previewer-image ${dataChecking(this.state, field.key, 'url') ? '' : 'previewer-placeholder'}`}
                                    style={{ maxHeight: '150px', maxWidth: '80%' }}
                                    width={dataChecking(this.state, field.key, 'url') ? '' : '70%'}
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
                        <div className="upload-action">
                            <button
                                htmlFor={`${this.props.pageType}-${field.key}-uploader`}
                                className="upload-button gamicenter-button"
                                onClick={() => {
                                    const inputEl = document.getElementById(`${this.props.pageType}-${field.key}-uploader`);
                                    inputEl.click();
                                }}
                            >
                                <i className="fa fa-cloud-upload"></i> Upload
                            </button>
                            <input id={`${this.props.pageType}-${field.key}-uploader`} className="upload-input" type="file" onChange={(event) => { this.onSelectImage(event, field); }}></input>
                        </div>
                    </div>
                );
            case 'boolean':
                return (
                    <Switch
                        className="switch-button"
                        onChange={(event) => {
                            this.handleTextChange(event, field);
                        }}
                        checked={this.state[field.key].value}
                    />
                );
            default:
                return (
                    <input
                        placeholder={field.placeholder}
                        value={dataChecking(this.state, field.key, 'value')}
                        onChange={(value) => this.handleTextChange(value, field)}
                    />
                );
        }
    }

    renderField(field) {
        return (
            <div className={`field-input input-${field.type}`}>
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
