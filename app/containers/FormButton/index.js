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
// import papaparse from 'papaparse';

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
        const { targetForm, formId } = this.props;
        const targetFormName = targetForm || formId;
        let tempObj = {};

        if (formId && dataChecking(formSetting, targetFormName)) {
            tempObj.formTitle = dataChecking(formSetting[targetFormName], 'title');
            tempObj.formFields = dataChecking(formSetting[targetFormName], 'fields');
            tempObj.formHeight = dataChecking(formSetting[targetFormName], 'formHeight');
            tempObj.formWidth = dataChecking(formSetting[targetFormName], 'formWidth');
            tempObj.formOnSubmit = dataChecking(formSetting[targetFormName], 'onSubmit');
            tempObj = this.initializedFormData(tempObj, targetFormName);
        }
        this.setState(tempObj);
    }

    componentWillReceiveProps(nextProps) {
        const { formbutton } = nextProps;
        const comingformId = nextProps.formId.split('__#__')[0];
        // if (nextProps.formId && dataChecking(formSetting, comingformId)) {
        //     const tempObj = {
        //         showModal: false,
        //         formFields: dataChecking(formSetting[comingformId], 'fields'),
        //         formHeight: dataChecking(formSetting[comingformId], 'formHeight'),
        //         formWidth: dataChecking(formSetting[comingformId], 'formWidth'),
        //         formOnSubmit: dataChecking(formSetting[comingformId], 'onSubmit'),
        //     };

        //     if (dataChecking(formSetting[comingformId], 'fields')) {
        //         formSetting[comingformId].fields.forEach((field) => {
        //             tempObj[field.key] = {
        //                 value: field.type === 'boolean' ? field.default || false : '',
        //             };
        //         });
        //     }

        //     this.setState(tempObj);
        // }

        if (formbutton.firing !== this.props.formbutton.firing) {
            let tempObj = { firing: formbutton.firing };

            if (!formbutton.firing && formbutton.fireApiReturnedData && formbutton.fireApiReturnedData !== this.props.formbutton.fireApiReturnedData) {
                if (dataChecking(formbutton, 'fireApiReturnedData', 'message', 'content')) {
                    NotificationManager.success(formbutton.fireApiReturnedData.message.content, formbutton.fireApiReturnedData.message.title, 3000, () => {
                        if (dataChecking(formSetting[comingformId], 'successCallback')) {
                            formSetting[comingformId].successCallback();
                        }
                    });

                    tempObj = this.initializedFormData(tempObj, nextProps.formId); // hmm... apparently form get reset after submit anyways
                    if (formbutton.getListApi) {
                        this.props.dispatch(tableListingActions.getList({ api: formbutton.getListApi }));
                    }
                }
                tempObj.showModal = false;
                if (this.props.formId === 'create_partner') { // wonder why upload will be trigerred as well
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
            // papaparse.parse(target.files[0], {
            //     skipEmptyLines: true,
            //     complete: (results) => {
            //         obj[field.key] = {
            //             fileName: target.files[0].name,
            //             file: target.files[0],
            //             loading: false,
            //             data: results.data,
            //         };
            //         this.setState(obj);
            //     },
            // });

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

    initializedFormData(objPassed, targetFormName) {
        const { initialData } = this.props;
        const tempObj = objPassed;

        if (dataChecking(formSetting, targetFormName, 'fields')) {
            formSetting[targetFormName].fields.forEach((field) => {
                let value = field.type === 'boolean' ? field.default || false : '';
                if (initialData && initialData[field.key] && initialData && initialData[field.key] !== null) {
                    value = initialData[field.key];
                }
                tempObj[field.key] = {
                    value,
                };
                if (field.type === 'selection' && typeof field.defaultIndex === 'number') {
                    tempObj[field.key] = dataChecking(field, 'items', field.defaultIndex);
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
        switch (field.type) {
            case 'image':
                return (
                    <div>
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
                                    <i className="fas fa-cloud-upload-alt"></i> Upload
                                </button>
                                <input id={`${this.props.formId}-${field.key}-uploader`} className="upload-input" type="file" onChange={(event) => { this.onSelectImage(event, field); }}></input>
                            </div>
                        </div>
                    </div>
                );
            case 'file': // file type cannot be use together with other field, it need to be unique content during ajax call
                return (
                    <div>
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
                                            // <img
                                            //     className="previewer-image previewer-placeholder"
                                            //     width="70%"
                                            //     src={require('../../Resources/arrow_up_upload-512.png')}
                                            //     alt="upload placeholder"
                                            //     srcSet="https://via.placeholder.com/150/55F?text=small 756w, https://via.placeholder.com/150/F55?text=big 1280w"
                                            //     // onLoad={this.onLoad}
                                            // />
                                            <picture>
                                                <source media="(min-width: 650px)" srcSet="https://via.placeholder.com/150/F55?text=big" />
                                                <img src="https://via.placeholder.com/150/55F?text=small" alt="Flowers" />
                                            </picture>
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
                    <Switch
                        className="switch-button px-1"
                        onChange={(event) => {
                            this.handleTextChange(event, field);
                        }}
                        checked={this.state[field.key].value || false}
                    />
                );
            case 'datetime':
                return (
                    <DatePicker
                        showTimeSelect={true}
                        timeFormat="HH:mm"
                        dateFormat="dd/MM/yyyy  HH:mm"
                        selected={dataChecking(this.state, field.key, 'value') ? new Date(this.state[field.key].value) : null}
                        onChange={(value) => this.handleTextChange(value, field)}
                    />
                );
            case 'date':
                return (
                    <DatePicker
                        selected={dataChecking(this.state, field.key, 'value') ? new Date(this.state[field.key].value) : null}
                        onChange={(value) => this.handleTextChange(value, field)}
                    />
                );
            case 'hidden':
                return null;
            case 'textbox':
                return (
                    <div>
                        <input
                            className="default-input-textbox"
                            placeholder={field.placeholder}
                            value={dataChecking(this.state, field.key, 'value')}
                            onChange={(value) => this.handleTextChange(value, field)}
                        />
                    </div>
                );
            case 'textarea':
                return (
                    <div>
                        <textarea
                            className="default-input-textarea"
                            placeholder={field.placeholder}
                            value={dataChecking(this.state, field.key, 'value')}
                            onChange={(value) => this.handleTextChange(value, field)}
                        />
                    </div>
                );
            case 'selection':
                return (
                    <Select
                        style={{ cursor: 'pointer' }}
                        value={this.state[field.key]}
                        default={field.items[0]}
                        closeMenuOnSelect={true}
                        components={makeAnimated()}
                        isMulti={field.isMulti || false}
                        onChange={(value) => this.handleTextChange(value, field)}
                        options={field.items || []}
                    />
                );
            default:
                return (
                    <div>
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
            <div className={`FormButton-component ${this.props.formType === 'attach' ? 'attach' : ''}`}>
                {
                    this.props.formType === 'attach' ?
                        null
                        :
                        <div onClick={() => this.setState({ showModal: true })}>
                            {this.props.children}
                        </div>
                }
                <div
                    id="page-action-modal"
                    style={{
                        ...this.props.style,
                        maxHeight: `${this.state.showModal ? this.state.formHeight : '45px'}`,
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
                                    <div style={{ textAlign: 'center' }}>
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
