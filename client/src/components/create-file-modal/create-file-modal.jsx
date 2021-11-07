import React from 'react';
import './create-file-modal.scss';
import UploadImg from './../../assets/images/upload.png';
import DraftImg from './../../assets/images/imgTest.png';

function CreateFileModal(props) {
    return (
        <div className="create-file-modal">
            <div className="create-file-modal__upload">
                <div className="upload-label">
                    <img src={UploadImg} alt="" />
                    <p>Drag & Drop your files here or Click to browser files</p>
                </div>
                <input type="file" name="" id="" />
            </div>
            <div className="create-file-modal__preview">
                <div className="preview-title">Ready to upload</div>
                <div className="preview-list">
                    <div className="preview-item">
                        <img src={DraftImg} alt="" />
                        <span>
                            <i className="fas fa-times"></i>
                        </span>
                    </div>
                    <div className="preview-item">
                        <img src={DraftImg} alt="" />
                        <span>
                            <i className="fas fa-times"></i>
                        </span>
                    </div>
                    <div className="preview-item">
                        <img src={DraftImg} alt="" />
                        <span>
                            <i className="fas fa-times"></i>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateFileModal;