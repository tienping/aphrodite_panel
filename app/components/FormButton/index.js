/**
*
* FormButton
*
*/

import React from 'react';

import { dataChecking, getXdp } from 'globalUtils';
import Switch from 'react-switch';

import formSetting from 'utils/globalFormSetting';

import { FilePond } from 'react-filepond';
import 'filepond/dist/filepond.min.css';

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

        if (this.props.formId && dataChecking(formSetting, this.props.formId)) {
            this.state.formConfig = dataChecking(formSetting[this.props.formId], 'fields');
            this.state.formHeight = dataChecking(formSetting[this.props.formId], 'formHeight');
            this.state.formWidth = dataChecking(formSetting[this.props.formId], 'formWidth');

            if (dataChecking(formSetting, this.props.formId, 'fields')) {
                formSetting[this.props.formId].fields.forEach((field) => {
                    this.state[field.key] = {
                        value: field.type === 'boolean' ? field.default || false : '',
                    };
                });
            }
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.formId && dataChecking(formSetting, nextProps.formId)) {
            const tempObj = {
                showModal: false,
                formConfig: dataChecking(formSetting[nextProps.formId], 'fields'),
                formHeight: dataChecking(formSetting[nextProps.formId], 'formHeight'),
                formWidth: dataChecking(formSetting[nextProps.formId], 'formWidth'),
            };

            if (dataChecking(formSetting[nextProps.formId], 'fields')) {
                formSetting[nextProps.formId].fields.forEach((field) => {
                    tempObj[field.key] = {
                        value: field.type === 'boolean' ? field.default || false : '',
                    };
                });
            }

            this.setState(tempObj);
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

    onSelectFile = (event, field) => {
        const { target } = event;
        const obj = {};
        obj[field.key] = {
            info: null,
            url: '',
        };

        if (target.files && target.files[0]) {
            const data = new FormData();
            data.append('file', target.files[0], target.files[0].name);

            obj[field.key] = {
                fileName: target.files[0].name,
                file: data,
            };
        }

        this.setState(obj);
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
                                    const inputEl = document.getElementById(`${this.props.formId}-${field.key}-uploader`);
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
                                            this.onUnselectImage(event, `${this.props.formId}-${field.key}-uploader`, field);
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
                                htmlFor={`${this.props.formId}-${field.key}-uploader`}
                                className="upload-button gamicenter-button"
                                onClick={() => {
                                    const inputEl = document.getElementById(`${this.props.formId}-${field.key}-uploader`);
                                    inputEl.click();
                                }}
                            >
                                <i className="fa fa-cloud-upload"></i> Upload
                            </button>
                            <input id={`${this.props.formId}-${field.key}-uploader`} className="upload-input" type="file" onChange={(event) => { this.onSelectImage(event, field); }}></input>
                        </div>
                    </div>
                );
            case 'file':
                return (
                    <div className="gamicenter-imageUploader">
                        <FilePond />
                        {/* <div className="image-preview">
                            <span
                                className="image-holder"
                                onClick={() => {
                                    const inputEl = document.getElementById(`${this.props.formId}-${field.key}-uploader`);
                                    inputEl.click();
                                }}
                            >
                                {
                                    dataChecking(this.state, field.key, 'fileName') ?
                                        <div>{dataChecking(this.state, field.key, 'fileName')}</div>
                                        :
                                        <img
                                            className={'previewer-image previewer-placeholder'}
                                            style={{ maxHeight: '150px', maxWidth: '80%' }}
                                            width="70%"
                                            src={require('../../Resources/arrow_up_upload-512.png')}
                                            alt="upload placeholder"
                                        />
                                }
                            </span>
                            {
                                dataChecking(this.state, field.key, 'fileName') ?
                                    <span
                                        className="close-btn"
                                        onClick={(event) => {
                                            this.onUnselectImage(event, `${this.props.formId}-${field.key}-uploader`, field);
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
                                htmlFor={`${this.props.formId}-${field.key}-uploader`}
                                className="upload-button gamicenter-button"
                                onClick={() => {
                                    const inputEl = document.getElementById(`${this.props.formId}-${field.key}-uploader`);
                                    inputEl.click();
                                }}
                            >
                                <i className="fa fa-cloud-upload"></i> Upload
                            </button>
                            <input
                                id={`${this.props.formId}-${field.key}-uploader`}
                                className="upload-input"
                                type="file"
                                onChange={(event) => { this.onSelectFile(event, field); }}
                            ></input>
                        </div> */}
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
        const getModalWidht = (style) => {
            if (this.state.showModal) {
                return this.state.formWidth || '265px';
            }

            return style.width;
        };

        return (
            <div className="FormButton-component">
                <div
                    id="page-action-modal"
                    style={{
                        ...this.props.style,
                        height: `${this.state.showModal ? this.state.formHeight : '45px'}`,
                        width: `${getModalWidht(this.props.style)}`,
                    }}
                    className={`page-action-modal gamicenter-button ${this.state.showModal ? 'triggered' : ''}`}
                >
                    {
                        this.state.showModal ?
                            <div className="become-title">{this.props.children}</div>
                            :
                            <div className="default-button-text button-text text-capitalize" onClick={() => this.setState({ showModal: true })}>{this.props.children}</div>
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
