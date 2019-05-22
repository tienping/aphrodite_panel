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
import { withRouter } from 'react-router-dom';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import { dataChecking, Events } from 'globalUtils';
import Switch from 'react-switch';
import formSetting from 'configs/formSetting';
import globalScope from 'globalScope';

import { FilePond, registerPlugin } from 'assets/react-filepond.js';
import 'filepond/dist/filepond.min.css';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import FilePondPluginImageResize from 'filepond-plugin-image-resize';
import FilePondPluginImageTransform from 'filepond-plugin-image-transform';
import FilePondPluginFileEncode from 'filepond-plugin-file-encode';

import * as GDPActions from 'containers/GlobalDataProcessor/actions';

// import makeSelectFormButton from './selectors';
import reducer from './reducer';
import saga from './saga';
import './style.scss';

registerPlugin(FilePondPluginImageResize, FilePondPluginImageTransform, FilePondPluginFileEncode, FilePondPluginImagePreview);

export class FormButton extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            formLoading: false,
            uploadingImage: false,
        };

        Events.listen('updateFormState', 'form-button-updateFormState', (params) => { this.onUpdateState(params); });
    }

    componentWillMount() {
        const { formSettingKey, formId } = this.props;
        const tempObj = {};

        tempObj.routeParams = dataChecking(this.props, 'match', 'params');

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
        const newState = {};

        if (formbutton.firing !== this.props.formbutton.firing) {
            if (!formbutton.firing && formbutton.fireApiReturnedData && formbutton.fireApiReturnedData !== this.props.formbutton.fireApiReturnedData) {
                const params = { ...this.state };
                const pageType = formbutton.pageType || this.props.pageType || '';

                if (dataChecking(formbutton, 'fireApiReturnedData', 'message', 'content')) {
                    NotificationManager.success(formbutton.fireApiReturnedData.message.content, formbutton.fireApiReturnedData.message.title, 3000, () => {
                        if (dataChecking(formSetting[comingformId], 'successCallback')) {
                            formSetting[comingformId].successCallback();
                        }
                    });
                }
                params.firing = formbutton.firing;
                params.pageType = pageType;
                params.fireApiReturnedData = formbutton.fireApiReturnedData;
                this.onCompleting({}, params);
            }
        }

        if (formbutton.fireApiError && formbutton.fireApiError !== this.props.formbutton.fireApiError && formbutton.fireApiError.message) {
            NotificationManager.error(formbutton.fireApiError.message, 'Error!! (click to dismiss)', 5000, () => {
                // alert(JSON.stringify(formbutton.fireApiError).replace('\"', '"'));
            });
            console.log(formbutton.fireApiError);
        }

        if (formbutton.toggleModal !== this.props.toggleModal) {
            newState.showModal = formbutton.toggleModal;
        }
        // if (formbutton.toggleModal !== this.props.toggleModal) {
        //     let newState = {};
        //     if (formbutton.toggleModal && formbutton.resetOnClose) {
        //         newState = this.initializedFormData({}, this.state.formSettingKey);
        //     }
        //     newState.showModal = formbutton.toggleModal;
        //     this.setState(newState);
        // }

        if (formbutton.onSuccessCallback && formbutton.onSuccessCallback !== this.props.onSuccessCallback) {
            newState.onSuccessCallback = formbutton.onSuccessCallback;
        }

        if (formbutton.onFailureCallback && formbutton.onFailureCallback !== this.props.onFailureCallback) {
            newState.onFailureCallback = formbutton.onFailureCallback;
        }

        if (formbutton.resetOnClose && !this.state.resetOnClose) {
            newState.resetOnClose = formbutton.resetOnClose;
        }

        this.setState(newState);
    }

    onCompleting = (stateToBe, params) => {
        let newState = { ...stateToBe };
        newState.showModal = false;
        if (this.state.resetOnClose) {
            newState = this.initializedFormData(newState, this.state.formSettingKey);
        }

        this.setState(newState);
        if (this.props.onModalComplete && this.props.onModalComplete.constructor === Function) {
            this.props.onModalComplete(params);
        }
        if (this.state.onSuccessCallback && this.state.onSuccessCallback.constructor === Function) {
            this.state.onSuccessCallback(params);
        }
    }

    onCancelling = (stateToBe, params) => {
        let newState = { ...stateToBe };
        newState.showModal = false;
        if (this.state.resetOnClose) {
            newState = this.initializedFormData(newState, this.state.formSettingKey);
        }

        this.setState(newState);
        if (this.props.onModalCancel && this.props.onModalCancel.constructor === Function) {
            this.props.onModalCancel(newState);
        }

        if (this.state.onFailureCallback && this.state.onFailureCallback.constructor === Function) {
            this.state.onFailureCallback(params);
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

    onUpdateState = ({ stateName, value }) => {
        const obj = {};
        obj[stateName] = value;
        this.setState(obj);
    }

    onSubmit = () => {
        if (this.state.formOnSubmit) {
            this.state.formOnSubmit(this, GDPActions, this.state, this.state.formFields, this.props.tableScope);
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
                } else if (field.type === 'image' && value) {
                    tempObj[field.key].current = value;
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
                this.props.dispatch(GDPActions.getDataKeyValue(field));
            }
        }

        switch (field.type) {
            case 'imagelink':
                return (
                    <div className="input-container input-type-imagelink pb-2">
                        {
                            dataChecking(this.state, field.key) &&
                                <div className="imagelink-previewer">
                                    {
                                        dataChecking(this.state, field.key, 'value', 'length') ?
                                            this.state[field.key].value.map((imagelink, index) => (
                                                <div className="imagelink-previewer-item" key={index}>
                                                    <div className="imagelink-previewer-inner-div" key={index}>
                                                        <div className="mobile-graphic-previewer">
                                                            {
                                                                dataChecking(imagelink, 'preview', 'mobile') ?
                                                                    <img
                                                                        width="100px"
                                                                        src={imagelink.preview.mobile}
                                                                        alt="current-mobile-graphic-previewer"
                                                                    />
                                                                    :
                                                                    <div className="no-image-placeholder">
                                                                        <div className="middle-align">No Image</div>
                                                                    </div>
                                                            }
                                                            <div className="smaller pt-half">Mobile Image</div>
                                                        </div>
                                                        <div className="desktop-graphic-previewer">
                                                            {
                                                                dataChecking(imagelink, 'preview', 'desktop') ?
                                                                    <img
                                                                        width="100px"
                                                                        src={imagelink.preview.desktop}
                                                                        alt="current-desktop-graphic-previewer"
                                                                    />
                                                                    :
                                                                    <div className="no-image-placeholder">
                                                                        <div className="middle-align">No Image</div>
                                                                    </div>
                                                            }
                                                            <div className="smaller pt-half">Desktop Image</div>
                                                        </div>
                                                    </div>
                                                </div>
                                        ))
                                        :
                                        null
                                    }
                                </div>
                        }
                        {
                            !dataChecking(this.state, field.key, 'value') || field.allowMultiple ?
                                <div
                                    className="my-custom-button smaller invert"
                                    onClick={() => {
                                        this.setState({ showingUtilModal: true });
                                        this.props.dispatch(GDPActions.toggleUtilFormButton(
                                            'formButton_util_create_imagelink',
                                            true, // toggle status
                                            (response) => {
                                                const newState = {};
                                                newState.showingUtilModal = false;

                                                const imagelinkData = {
                                                    data: response.fireApiReturnedData,
                                                    preview: {
                                                        desktop: dataChecking(response, 'desktop', 'value', 'location'),
                                                        mobile: dataChecking(response, 'mobile', 'value', 'location'),
                                                    },
                                                };

                                                if (field.allowMultiple) {
                                                    const arr = (this.state[field.key] && this.state[field.key].value && this.state[field.key].value.length) ?
                                                        [...this.state[field.key].value] : [];
                                                    arr.push(imagelinkData);
                                                    newState[field.key] = {
                                                        value: arr,
                                                    };
                                                } else {
                                                    newState[field.key] = {
                                                        value: [imagelinkData],
                                                    };
                                                }

                                                this.setState(newState);
                                            },
                                            () => {
                                                this.setState({ showingUtilModal: false });
                                            },
                                            true, // resetOnClose
                                        ));
                                    }}
                                >Add Imagelink</div>
                                :
                                null
                        }
                    </div>
                );
            case 'image':
                if (!this.state.showModal) {
                    return null;
                }
                return (
                    <div className="input-container input-type-image">
                        {
                            dataChecking(this.state, field.key, 'current') &&
                                <div className="current-image-previewer">
                                    <img
                                        width="100px"
                                        src={this.state[field.key].current}
                                        alt="current-graphic-previewer"
                                    />
                                    <i className="fas fa-long-arrow-alt-left px-1"></i>
                                    <span className="pr-1">current image</span>
                                </div>
                        }
                        <div className="my-custom-imageUploader">
                            <FilePond
                                id="my-custom-imageUploader"
                                name="file"
                                files={dataChecking(this.state, field.key, 'uploadingFile')}
                                allowImageResize={true}
                                imageResizeTargetWidth={200}
                                imageResizeUpscale={false}
                                onupdatefiles={(fileItems) => {
                                    const obj = {};
                                    obj[field.key] = { uploadingFile: fileItems.map(
                                        (fileItem) => fileItem.file
                                    ) };
                                    obj.uploadingImage = !!fileItems.length;
                                    this.setState(obj);
                                }}
                                onpreparefile={(file, output) => {
                                    const obj = {};
                                    obj[field.key] = this.state[field.key] || {};

                                    if (field.uploadByFeatherSocket) {
                                        if (field.requireBase64) {
                                            const reader = new FileReader();
                                            reader.readAsDataURL(output);
                                            reader.onload = () => {
                                                obj[field.key].value = reader.result;
                                                obj.uploadingImage = false;
                                                this.setState(obj);
                                            };
                                            reader.onerror = (error) => {
                                                console.log('Convert file to base64 error: ', error);
                                            };
                                        } else {
                                            obj[field.key].value = obj[field.key].uploadingFile[0];
                                            obj.uploadingImage = false;
                                        }
                                    }

                                    this.setState(obj);
                                }}
                                allowMultiple={false}
                                server={field.uploadByFeatherSocket ? null : {
                                    process: {
                                        headers: {
                                            'hertoken': globalScope.token,
                                        },
                                        onload: (responseString) => {
                                            try {
                                                const response = JSON.parse(responseString);
                                                const obj = {};
                                                obj[field.key] = { ...this.state[field.key] };
                                                obj[field.key].value = response.data[0];
                                                this.setState(obj);
                                            } catch (error) {
                                                console.warn('Invalid JSON from server', error);
                                            }
                                            this.setState({
                                                uploadingImage: false,
                                            });
                                        },
                                        onerror: (error) => {
                                            console.warn('Upload image failed', error);
                                            this.setState({
                                                uploadingImage: false,
                                            });
                                        },
                                        onabort: (error) => {
                                            console.warn('Upload image aborted', error);
                                            this.setState({
                                                uploadingImage: false,
                                            });
                                        },
                                        url: field.serverUrl,
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
                        <div className="my-custom-imageUploader">
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
                                    className="upload-button my-custom-button"
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
                            timeIntervals={1}
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
                            placeholder={field.placeholder || (field.doc && field.doc.description)}
                            value={dataChecking(this.state, field.key, 'value') || ''}
                            onChange={(value) => this.handleTextChange(value, field)}
                        />
                    </div>
                );
            case 'json':
            case 'textarea':
                return (
                    <div className="input-container input-type-textarea">
                        <textarea
                            className="default-input-textarea"
                            placeholder={field.placeholder || (field.doc && field.doc.description)}
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

        if (this.state.showingUtilModal) {
            return null;
        }

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
                    className={`my-custom-button page-action-modal ${this.state.showModal ? 'triggered' : ''}`}
                >
                    <div className="sticky-container">
                        <div style={{ position: 'relative' }}>
                            {
                                this.state.showModal ?
                                    <div
                                        className="modal-close-button"
                                        onClick={() => { this.onCancelling({}); }}
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
                                            className={`my-custom-button smaller ${this.state.uploadingImage ? 'button-disabled' : ''}`}
                                            onClick={() => {
                                                if (this.state.uploadingImage) {
                                                    alert('Please be patient until the image upload process to complete.');
                                                } else {
                                                    this.onSubmit();
                                                }
                                            }}
                                        >
                                            {
                                                this.state.firing ?
                                                    <span>loading...</span>
                                                    :
                                                    <span>{`${this.props.submitButtonText || 'Submit'}`}</span>
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
    withRouter,
)(FormButton);
