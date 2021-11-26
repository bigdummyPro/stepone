import React, { useEffect, useRef, useState } from 'react';
import './create-file-modal.scss';
import UploadImg from './../../assets/images/upload.png';
import PlayIcon from '../../assets/images/play-icon.png';
import MP3Img from '../../assets/images/mp3.png';
import { convertSize } from '../../utils/convert-size';

function CreateFileModal(props) {
    const [fileList, setFileList] = useState([]);
    const uploadWrapper = useRef(null);


    const onDragEnter = () => uploadWrapper.current.classList.add('--active');
    const onDragLeave = () => uploadWrapper.current.classList.remove('--active');
    const onDrop = () => uploadWrapper.current.classList.remove('--active');

    const onDropFile = (e) => {
        const newFiles = e.target.files;
        const newFilesUrl = Array.from(newFiles).map((newFile)=>{
            return {file: newFile, preview: URL.createObjectURL(newFile)}
        })
        if(newFilesUrl){
            const storageList = [...fileList, ...newFilesUrl];
            setFileList(storageList);
            e.target.value = null;
        }
    }
    const removeFile = (file) => {
        const storageList = [...fileList];
        storageList.splice(storageList.findIndex(stLi => stLi.preview === file), 1);
        setFileList(storageList);
        URL.revokeObjectURL(file);
    }
    const checkFileType = (file) => {
        if(file.type === 'video/mp4'){
            return 0
        }
        else if(file.type === 'image/jpeg' || file.type === 'image/png'){
            return 1
        }
        else if(file.type === 'audio/mpeg'){
            return 2
        }
        else return null
    }
    const previewItemRender = (fiLi, index)=> {
        const {file} = fiLi;
        const checkFileTypeNum = checkFileType(file);
        if(checkFileTypeNum === 0){
            return <div className="preview-item" key={index}>
                        <video src={fiLi.preview}></video>
                        <span 
                            className="preview-item__remove"
                            onClick={()=>removeFile(fiLi)}
                        >
                            <i className="fas fa-times"></i>
                        </span>
                        <div className="preview-item__play">
                            <img src={PlayIcon} alt="" />
                        </div>
                    </div>
        }
        else if(checkFileTypeNum === 1){
            return <div className="preview-item" key={index}>
                        <img src={fiLi.preview} alt="" />
                        <span 
                            className="preview-item__remove"
                            onClick={()=>removeFile(fiLi)}
                        >
                            <i className="fas fa-times"></i>
                        </span>
                    </div>
        }
        else if(checkFileTypeNum === 2){
            return <div className="preview-item --audio" key={index}>
                        <img src={MP3Img} alt="" />
                        <div className="audio-description">
                            <span className="audio-description__name">
                                {file.name}
                            </span>
                            <span className="audio-description__size">
                                {convertSize(file.size)}
                            </span>
                        </div>
                        <span 
                            className="preview-item__remove"
                            onClick={()=>removeFile(fiLi)}
                        >
                            <i className="fas fa-times"></i>
                        </span>
                    </div>
        }
    }
    useEffect(()=>{
        setFileList([]);//remove files when fileModalType changed 
    },[props.fileModalType])
    return (
        <div className="create-file-modal">
            <div 
                className="create-file-modal__upload" 
                ref={uploadWrapper}
                onDragEnter={onDragEnter}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
            >
                <div className="upload-label">
                    <img src={UploadImg} alt="" />
                    {
                        props.fileModalType === 0 && <p>Drag & Drop your Videos or Images here or Click to browser files</p>
                    }
                    {
                        props.fileModalType === 1 && <p>Drag & Drop your Audio here or Click to browser files</p>
                    }
                </div>
                {
                    props.fileModalType === 0 && <input type="file" onChange={onDropFile} multiple accept="video/*, image/*"/>
                }
                {
                    props.fileModalType === 1 && <input type="file" onChange={onDropFile} multiple accept="audio/*"/>
                }
                <span className="upload-close" onClick={props.onClose}>
                    <i className="fas fa-times"></i>
                </span>
            </div>
            {
                fileList.length > 0 ?
                    <div className="create-file-modal__preview">
                        <div className="preview-title">Ready to upload</div>
                        <div className={`preview-list ${props.fileModalType === 1 ? '--audio' : ''}`}>
                            {
                                fileList.map((fiLi, index)=>( 
                                    previewItemRender(fiLi, index)
                                ))
                            }
                        </div>
                    </div> : null
            }
        </div>
    );
}

export default CreateFileModal;