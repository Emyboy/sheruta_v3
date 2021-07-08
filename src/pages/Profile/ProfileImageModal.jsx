import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { connect } from 'react-redux'
import { Modal } from 'react-bootstrap'
import Cropper from './Cropper';

const ProfileImageModal = ({
    show,
    handleClose
}) => {

    const [state, setState] = useState({
        imageFile: null,
        display: 'crop'
    })

    const onDrop = useCallback(acceptedFiles => {
        // Do something with the files
        setState({ ...state, imageFile: acceptedFiles[0], display: 'crop' })
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Body>
                {state.display === 'preview' ? <div className="d-user-avater">
                    <img src={URL.createObjectURL(state.imageFile)} className="img-fluid avater" alt="" />
                </div> : null}
                {state.display === 'upload' ? <div {...getRootProps()} className='text-center link'>
                    <input {...getInputProps()} />
                    {
                        isDragActive ?
                            <p>Drop the files here ...</p> :
                            <p><i className='fa fa-file' style={{ fontSize: '70px' }}></i><br />Drag 'n' drop some files here, or click to select files</p>
                    }
                </div> : null}

                {
                    state.display === 'crop' ? <Cropper imgFile={state.imageFile} handleClose={handleClose} /> : null
                }
            </Modal.Body>
        </Modal >
    )
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileImageModal)
