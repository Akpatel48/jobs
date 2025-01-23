import React from 'react';
// import 'react-dropzone-uploader/dist/styles.css'
import Dropzone from 'react-dropzone-uploader'
import { getDroppedOrSelectedFiles } from 'html5-file-selector'

const FileUploadComponent = ({onChange}) => {
    const fileParams = ({ meta }) => {
        return { url: 'https://httpbin.org/post' }
    }
    const onFileChange = ({ meta, file }, status) => {
        console.log(file)
        onChange(file) 
        // console.log(status, meta, file) 
    }
    const onSubmit = (files, allFiles) => {
        allFiles.forEach(f => f.remove())
    }
    const getFilesFromEvent = e => {
        return new Promise(resolve => {
            getDroppedOrSelectedFiles(e).then(chosenFiles => {
                resolve(chosenFiles.map(f => f.fileObject))
            })
        })
    }
    const selectFileInput = ({ accept, onFiles, files, getFilesFromEvent }) => {
        const textMsg = files.length > 0 ? 'Upload Again' : 'Upload Files'
        return (
            <label htmlFor='fileupload' className="btn btn-danger mt-4">
                {textMsg}
                <input
                    style={{ display: 'none' }}
                    type="file"
                    accept={accept}
                    multiple
                    onChange={e => {
                        getFilesFromEvent(e).then(chosenFiles => {
                            onFiles(chosenFiles)
                        })
                    }}
                />
            </label>
        )
    }
    return (
        <Dropzone
            // onSubmit={onSubmit}
            onChangeStatus={onFileChange}
            // onChangeStatus={(e)=>onChange(e?.file)}
            // InputComponent={selectFileInput}
            // getUploadParams={fileParams}
            // getFilesFromEvent={getFilesFromEvent}
            accept="image/*,audio/*,video/*,application/pdf"
            maxFiles={5}
            inputContent="Drop A File"
            styles={{
                dropzone: { width: "100%", height: 100, overflowY:"hidden",overflowX:"hidden" },
                dropzoneActive: { borderColor: 'green' },
            }}            
        />
    );
};
export default FileUploadComponent;