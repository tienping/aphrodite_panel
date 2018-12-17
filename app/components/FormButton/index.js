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
        pictures: [],
    }

    onSelectImage = (event) => {
        const { target } = event;
        if (target.files && target.files[0]) {
            const reader = new FileReader();

            reader.onload = (e) => {
                this.setState({
                    pictureObj: {
                        info: target.files[0],
                        url: e.target.result,
                    },
                });
            };

            reader.readAsDataURL(target.files[0]);
        } else {
            this.setState({
                pictureObj: {},
            });
        }
    }

    onUnselectImage = (event, inputId) => {
        const inputEl = document.getElementById(inputId);
        inputEl.value = '';

        this.setState({
            pictureObj: {},
        });
    }

    renderInput(field) {
        switch (field.type) {
            case 'image':
                return (
                    <div className="gamicenter-imageUploader">
                        <div className="image-preview">
                            <span
                                onClick={() => {
                                    const inputEl = document.getElementById(`${this.props.pageId}-${field.key}-uploader`);
                                    inputEl.click();
                                }}
                            >
                                <img
                                    className="previewer-image"
                                    style={{ maxHeight: '150px', maxWidth: '80%' }}
                                    width={dataChecking(this.state, 'pictureObj', 'url') ? '' : '30%'}
                                    src={dataChecking(this.state, 'pictureObj', 'url') || require('../../Resources/arrow_up_upload-512.png')}
                                    alt="preview upload"
                                />
                            </span>
                            {
                                dataChecking(this.state, 'pictureObj', 'url') ?
                                    <span
                                        className="close-btn"
                                        onClick={(event) => {
                                            this.onUnselectImage(event, `${this.props.pageId}-${field.key}-uploader`);
                                        }}
                                    >
                                        <img alt="unselect-upload" width="18px" src={require('../../Resources/ic-close.png')} />
                                    </span>
                                    :
                                    null
                            }
                        </div>
                        <input id={`${this.props.pageId}-${field.key}-uploader`} type="file" onChange={this.onSelectImage}></input>
                    </div>
                    // <ImageUploader
                    //     className="formButton-imageUploader"
                    //     withIcon={false}
                    //     buttonText="Choose images"
                    //     onChange={this.onSelectImage}
                    //     maxFileSize={5242880}
                    //     withPreview={true}
                    //     label={field.formLabel || 'Max file size: 5mb [ jpg or png]'}
                    //     imgExtension={['.jpg', '.png']}
                    //     fileSizeError="File size is too big"
                    // />
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
                    style={{ ...this.props.style, height: `${this.state.showModal ? this.props.formHeight : '45px'}` }}
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
                                    this.props.formConfig ?
                                        <div>
                                            {
                                                this.props.formConfig.map((field, index) => (
                                                    <div
                                                        key={index}
                                                        className="create-modal-form-field"
                                                    >
                                                        <span style={{ color: 'red' }}>{dataChecking(this.props.formFields, field.key, 'error')}</span>
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
