/**
 *
 * FormButton
 *
 */

import React from 'react';

import Select from 'react-select';
import makeAnimated from 'react-select/lib/animated';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { NotificationManager } from 'react-notifications';

// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import { dataChecking } from 'globalUtils';
import Switch from 'react-switch';
import formSetting from 'utils/globalFormSetting';
import tableSetting from 'utils/globalTableSetting';
import globalScope from 'globalScope';

import { FilePond } from 'assets/react-filepond.js';
import 'filepond/dist/filepond.min.css';

// import makeSelectFormButton from './selectors';
import reducer from './reducer';
import saga from './saga';
import * as tableListingActions from './../TableListingPage/actions';
import './style.scss';

export class FormButton extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
        };
    }

    componentWillMount() {
        const { formSettingKey, formId } = this.props;
        const tempObj = {};

        if (formId && dataChecking(formSetting, formSettingKey)) {
            tempObj.formSettingKey = formSettingKey;
            tempObj.formTitle = dataChecking(formSetting[formSettingKey], 'title');
            tempObj.formFields = dataChecking(formSetting[formSettingKey], 'fields');
            tempObj.maxFormHeight = dataChecking(formSetting[formSettingKey], 'maxFormHeight');
            tempObj.formWidth = dataChecking(formSetting[formSettingKey], 'formWidth');
            tempObj.formOnSubmit = dataChecking(formSetting[formSettingKey], 'onSubmit');
        }
        this.setState(tempObj);
    }

    componentWillReceiveProps(nextProps) {
        const { formbutton } = nextProps;
        const comingformId = nextProps.formId.split('__#__')[0];

        if (formbutton.firing !== this.props.formbutton.firing) {
            const tempObj = { firing: formbutton.firing };

            if (!formbutton.firing && formbutton.fireApiReturnedData && formbutton.fireApiReturnedData !== this.props.formbutton.fireApiReturnedData) {
                if (dataChecking(formbutton, 'fireApiReturnedData', 'message', 'content')) {
                    NotificationManager.success(formbutton.fireApiReturnedData.message.content, formbutton.fireApiReturnedData.message.title, 3000, () => {
                        if (dataChecking(formSetting[comingformId], 'successCallback')) {
                            formSetting[comingformId].successCallback();
                        }
                    });

                    if (formbutton.getListApi) {
                        this.props.dispatch(tableListingActions.getList({ api: formbutton.getListApi }));
                    }
                }
                tempObj.showModal = false;
                if (this.props.formId === 'create_partner') {
                    this.props.dispatch(tableListingActions.getList({ api: tableSetting[this.props.pageType].api }));
                }
            }
            this.setState(tempObj);
        }

        if (formbutton.fireApiError && formbutton.fireApiError !== this.props.formbutton.fireApiError && formbutton.fireApiError.message) {
            NotificationManager.error(formbutton.fireApiError.message, 'Error!! (click to dismiss)', 5000, () => {
                // alert(JSON.stringify(formbutton.fireApiError).replace('\"', '"'));
            });
            console.log(formbutton.fireApiError);
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
            message: 'File not found...',
            loading: false,
        };

        if (target.files && target.files[0]) {
            const form = new FormData();
            form.append('file', target.files[0]);

            obj[field.key] = {
                form,
                fileName: target.files[0].name,
                // loading: true,
                loading: false,
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

    onSubmit = () => {
        if (this.state.formOnSubmit) {
            this.state.formOnSubmit(this, tableListingActions, this.state, this.state.formFields);
        }
    }

    initializedFormData(objPassed, formSettingKey) {
        const { initialData } = this.props;
        const tempObj = objPassed;

        if (dataChecking(formSetting, formSettingKey, 'fields')) {
            formSetting[formSettingKey].fields.forEach((field) => {
                let value = field.type === 'boolean' ? field.default || false : '';
                if (initialData && initialData[field.key] && initialData && initialData[field.key] !== null) {
                    value = initialData[field.key];
                }
                tempObj[field.key] = {
                    value,
                };
                if (field.type === 'selection') {
                    if (value) {
                        if (field.items && field.items.constructor === Array) {
                            tempObj[field.key] = field.items.find((item) => {
                                if (parseInt(item.value, 10) && parseInt(value, 10)) {
                                    return parseInt(item.value, 10) === parseInt(value, 10);
                                }
                                return item.value === value;
                            });
                        } else if (dataChecking(globalScope, 'selectionData', field.key)) {
                            tempObj[field.key] = globalScope.selectionData[field.key].find((item) => JSON.parse(item.value) === JSON.parse(value));
                        }
                    } else if (typeof field.defaultIndex === 'number') {
                        tempObj[field.key] = dataChecking(field, 'items', field.defaultIndex);
                    }
                }
            });
        }

        return tempObj;
    }

    handleTextChange = (event, field) => {
        const obj = {};
        obj[field.key] = { value: null };
        if (field.type === 'boolean') {
            obj[field.key].value = event;
        } else if (field.type === 'selection') {
            obj[field.key] = event;
        } else if (field.type === 'datetime' || field.type === 'date') {
            obj[field.key].value = event.getTime();
        } else if (event && event.target) {
            obj[field.key].value = event.target.value;
        } else {
            alert('unhandled change...');
        }
        this.setState(obj);
    }

    renderInput(field) {
        let itemsData = field.items || [];
        if (field.itemApi) {
            if (globalScope.selectionData[field.key]) {
                itemsData = dataChecking(globalScope, 'selectionData', field.key);
            } else {
                globalScope.selectionData[field.key] = [];
                this.props.dispatch(tableListingActions.getDataKeyValue(field));
            }
        }

        switch (field.type) {
            case 'image':
                return (
                    <div className="input-container input-type-image">
                        <div className="gamicenter-imageUploader">
                            <FilePond
                                id="gamicenter-imageUploader"
                                name="file"
                                ref={(ref) => (this.pond = ref)}
                                files={this.state.filepondFiles}
                                fileMetadata={{ hi: 'halo' }}
                                onupdatefiles={(fileItems) => {
                                    this.setState({
                                        filepondFiles: fileItems.map((fileItem) => fileItem.file),
                                    });
                                }}
                                allowMultiple={true}
                                server={{
                                    url: 'https://api-staging.hermo.my/services/fileman/public',
                                    process: {
                                        headers: {
                                            'hertoken': globalScope.token,
                                        },
                                    },
                                }}
                            />
                        </div>
                    </div>
                );
            case 'file': // file type cannot be use together with other field, it need to be unique content during ajax call
                return (
                    <div className="input-container input-type-file">
                        {
                            dataChecking(field, 'sample', 'url') ?
                                <div className="link-for-sample">
                                    <a href={field.sample.url}>
                                        <small>{field.sample.name || 'Sample'}</small>
                                    </a>
                                </div>
                                :
                                null
                        }
                        <div className="gamicenter-imageUploader">
                            <div className="image-preview">
                                <span
                                    className="image-holder"
                                    onClick={() => {
                                        const inputEl = document.getElementById(`${this.props.formId}-${field.key}-uploader`);
                                        inputEl.click();
                                    }}
                                >
                                    {
                                        dataChecking(this.state, field.key, 'fileName') ?
                                            <div>
                                                <i className="far fa-file-alt" style={{ fontSize: '5rem', padding: '2rem', display: 'block' }} />
                                                <span>{dataChecking(this.state, field.key, 'fileName')}</span>
                                                <span
                                                    style={{ paddingLeft: '0.5rem', fontSize: '75%', color: dataChecking(this.state, field.key, 'loading') ? 'red' : 'green' }}
                                                >{dataChecking(this.state, field.key, 'loading') ? 'loading...' : 'done'}</span>
                                            </div>
                                            :
                                            <img
                                                className="previewer-image previewer-placeholder"
                                                width="70%"
                                                src={require('../../Resources/arrow_up_upload-512.png')}
                                                alt="upload placeholder"
                                                // onLoad={this.onLoad}
                                            />
                                            // <picture>
                                            //     <source media="(min-width: 650px)" srcSet="https://via.placeholder.com/150/F55?text=big" />
                                            //     <img src="https://via.placeholder.com/150/55F?text=small" alt="Flowers" />
                                            // </picture>
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
                                    <i className="fas fa-cloud-upload-alt"></i> Upload
                                </button>
                                <input
                                    id={`${this.props.formId}-${field.key}-uploader`}
                                    className="upload-input"
                                    type="file"
                                    onChange={(event) => { this.onSelectFile(event, field); }}
                                ></input>
                            </div>
                        </div>
                    </div>
                );
            case 'boolean':
                return (
                    <span className="input-container input-type-boolean">
                        <Switch
                            className="switch-button px-1"
                            onChange={(event) => {
                                this.handleTextChange(event, field);
                            }}
                            checked={(this.state[field.key] && this.state[field.key].value) || false}
                        />
                    </span>
                );
            case 'datetime':
                return (
                    <div className="input-container input-type-datetime">
                        <DatePicker
                            showTimeSelect={true}
                            timeFormat="HH:mm"
                            dateFormat="dd/MM/yyyy  HH:mm"
                            selected={dataChecking(this.state, field.key, 'value') ? new Date(this.state[field.key].value) : null}
                            onChange={(value) => this.handleTextChange(value, field)}
                        />
                    </div>
                );
            case 'date':
                return (
                    <div className="input-container input-type-date">
                        <DatePicker
                            selected={dataChecking(this.state, field.key, 'value') ? new Date(this.state[field.key].value) : null}
                            onChange={(value) => this.handleTextChange(value, field)}
                        />
                    </div>
                );
            case 'hidden':
                return null;
            case 'textbox':
                return (
                    <div className="input-container input-type-textbox">
                        <input
                            className="default-input-textbox"
                            placeholder={field.placeholder}
                            value={dataChecking(this.state, field.key, 'value') || ''}
                            onChange={(value) => this.handleTextChange(value, field)}
                        />
                    </div>
                );
            case 'textarea':
                return (
                    <div className="input-container input-type-textarea">
                        <textarea
                            className="default-input-textarea"
                            placeholder={field.placeholder}
                            value={dataChecking(this.state, field.key, 'value') || ''}
                            onChange={(value) => this.handleTextChange(value, field)}
                        />
                    </div>
                );
            case 'selection':
                return (
                    <div className="input-container input-type-selection">
                        <Select
                            style={{ cursor: 'pointer' }}
                            value={this.state[field.key]}
                            default={itemsData[0]}
                            closeMenuOnSelect={true}
                            components={makeAnimated()}
                            isMulti={field.isMulti || false}
                            onChange={(value) => this.handleTextChange(value, field)}
                            options={itemsData || []}
                        />
                    </div>
                );
            default:
                return (
                    <div className="input-container input-type-default">
                        <input
                            className="default-input-type"
                            placeholder={field.placeholder}
                            value={dataChecking(this.state, field.key, 'value')}
                            onChange={(value) => this.handleTextChange(value, field)}
                        />
                    </div>
                );
        }
    }

    renderField(field) {
        return (
            field.type !== 'hidden' ?
                <div className={`field-input input-${field.type}`}>
                    <span className="field-label">{`${field.label}:`}</span>
                    {
                        field.mandatory ?
                            <span className="mandatory-indicator">*<span className="mandatory-text hidden">required</span></span>
                            :
                            null
                    }
                    {
                        field.info ?
                            <span className="field-info">
                                <i className="info-icon fas fa-exclamation-circle" aria-hidden="true"></i>
                                <div className="info-content" dangerouslySetInnerHTML={{ __html: field.info }}></div>
                            </span>
                            :
                            null
                    }
                    {
                        field.hint ?
                            <span className="field-hint">
                                <div className="hint-content" dangerouslySetInnerHTML={{ __html: field.hint }}></div>
                            </span>
                            :
                            null
                    }
                    { this.renderInput(field) }
                </div>
                :
                null
        );
    }

    render() {
        const getModalWidth = (style) => {
            if (this.state.showModal) {
                return this.state.formWidth || '';
            }

            return (style && style.width) || '2rem';
        };

        return (
            <div className={`FormButton-component ${this.props.formType === 'attach' ? 'attach' : 'popout'}`}>
                {
                    this.props.formType === 'attach' ?
                        null
                        :
                        <div
                            onClick={() => {
                                this.setState({ showModal: true });
                                this.initializedFormData(this.state, this.state.formSettingKey);
                            }}
                        >
                            {this.props.children}
                        </div>
                }
                <div
                    id="page-action-modal"
                    style={{
                        ...this.props.style,
                        maxHeight: `${this.state.showModal ? this.state.maxFormHeight : ''}`,
                        width: `${getModalWidth(this.props.style)}`,
                    }}
                    className={`gamicenter-button page-action-modal ${this.state.showModal ? 'triggered' : ''}`}
                >
                    <div className="sticky-container">
                        <div style={{ position: 'relative' }}>
                            {
                                this.state.showModal ?
                                    <div
                                        className="modal-close-button"
                                        onClick={() => { this.setState({ showModal: false }); }}
                                    >
                                        <i className="fas fa-window-close text-secondary-color bigger"></i>
                                    </div>
                                    :
                                    null
                            }
                            {
                                this.state.showModal ?
                                    <div className="become-title">
                                        <span className="text-capitalize">{ this.props.formType === 'attach' ? this.props.children : this.state.formTitle}</span>
                                        <div className="title-underline" />
                                    </div>
                                    :
                                    <div className="default-button-text button-text text-capitalize" onClick={() => this.setState({ showModal: true })}>{this.props.children}</div>
                            }
                        </div>
                    </div>
                    <div className="page-action-modal-toggle">
                        {
                            this.state.formFields ?
                                <div className="modal-form-fields-container">
                                    {
                                        this.state.formFields.map((field, index) => (
                                            <div
                                                key={index}
                                                className="modal-form-field"
                                            >
                                                <span style={{ color: 'red' }}>{dataChecking(this.state, field.key, 'error')}</span>
                                                { this.renderField(field) }
                                            </div>
                                        ))
                                    }
                                    <div className="submit-button">
                                        <hr />
                                        <div
                                            className="gamicenter-button smaller"
                                            onClick={() => {
                                                this.onSubmit();
                                            }}
                                        >
                                            {
                                                this.state.firing ?
                                                    <span>loading...</span>
                                                    :
                                                    <span>Submit</span>
                                            }
                                        </div>
                                    </div>
                                </div>
                                :
                                null
                        }
                    </div>
                </div>
                <div id="page-action-modal-wrapper" className={`page-action-modal-wrapper ${this.state.showModal ? 'triggered' : ''}`}></div>
            </div>
        );
    }
}

FormButton.propTypes = {
    // dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({});

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'formButton', reducer });
const withSaga = injectSaga({ key: 'formButton', saga });

export default compose(
    withReducer,
    withSaga,
    withConnect,
)(FormButton);
