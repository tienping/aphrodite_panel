/**
 *
 * FormButton
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import { dataChecking, getXdp } from 'globalUtils';
import Switch from 'react-switch';
import formSetting from 'utils/globalFormSetting';
import tableSetting from 'utils/globalTableSetting';
// import papaparse from 'papaparse';

import makeSelectFormButton from './selectors';
import reducer from './reducer';
import saga from './saga';
import * as actions from './actions';
import * as tableListingActions from './../TableListingPage/actions';
import './style.scss';

export class FormButton extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
        };

        if (this.props.formId && dataChecking(formSetting, this.props.formId)) {
            this.state.formFields = dataChecking(formSetting[this.props.formId], 'fields');
            this.state.formHeight = dataChecking(formSetting[this.props.formId], 'formHeight');
            this.state.formWidth = dataChecking(formSetting[this.props.formId], 'formWidth');
            this.state.formOnSubmit = dataChecking(formSetting[this.props.formId], 'onSubmit');

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
        const { formbutton } = nextProps;
        if (nextProps.formId && dataChecking(formSetting, nextProps.formId) && nextProps.formId !== this.props.formId) {
            const tempObj = {
                showModal: false,
                formFields: dataChecking(formSetting[nextProps.formId], 'fields'),
                formHeight: dataChecking(formSetting[nextProps.formId], 'formHeight'),
                formWidth: dataChecking(formSetting[nextProps.formId], 'formWidth'),
                formOnSubmit: dataChecking(formSetting[nextProps.formId], 'onSubmit'),
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

        if (formbutton.firing !== this.props.formbutton.firing) {
            const tempObj = { firing: formbutton.firing };

            if (!formbutton.firing && formbutton.fireApiReturnedData !== this.props.formbutton.fireApiReturnedData) {
                alert(formbutton.fireApiReturnedData.message.content);
                tempObj.showModal = false;
                if (this.props.formId === 'create_partner') { // wonder why upload will be trigerred as well
                    this.props.dispatch(tableListingActions.getList({ api: tableSetting[this.props.pageType].api }));
                }
            }

            this.setState(tempObj);
        }

        if (formbutton.error && formbutton.error !== this.props.formbutton.error) {
            alert(formbutton.error.message);
            console.log(formbutton.error);
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
            this.state.formOnSubmit(this, actions, this.state, this.state.formFields);
        }
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
                    <div className="gamicenter-imageUploader pt-1">
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
                        <div className="upload-action pt-1">
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
                            </div>
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
                        checked={this.state[field.key].value || false}
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
                                zIndex: 100,
                                top: '.5rem',
                                right: '.5rem',
                                cursor: 'pointer',
                                borderRadius: 100,
                                position: 'absolute',
                                backgroundColor: 'rgba(0,0,0,0.3)',
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
                                    this.state.formFields ?
                                        <div>
                                            {
                                                this.state.formFields.map((field, index) => (
                                                    <div
                                                        key={index}
                                                        className="create-modal-form-field"
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

const mapStateToProps = createStructuredSelector({
    formbutton: makeSelectFormButton(),
});

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
