import React, { PureComponent } from 'react'
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import imageCompression from 'browser-image-compression';
import { v4 as uuidv4 } from 'uuid';
import { storage } from '../../Firebase';
import firebase from 'firebase';
import { notification } from 'antd';
import axios from 'axios';
import { Spinner } from 'react-activity'
import { connect } from 'react-redux';
import { getUser } from '../../redux/strapi_actions/auth.actions'

const state = JSON.parse(localStorage.getItem('state'));

class CustomImage extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            src: null,
            crop: {
                unit: '%',
                width: 100,
                aspect: this.props.aspect || 4 / 4,
            },
            confirm: false,
            blob: null,
            confirmed: false,
            croped: false,
            loading: false
        };

        this.onSelectFile = this.onSelectFile.bind(this);
        this.onImageLoaded = this.onImageLoaded.bind(this);
        this.onCropComplete = this.onCropComplete.bind(this);
        this.onCropChange = this.onCropChange.bind(this);
        this.makeClientCrop = this.makeClientCrop.bind(this);
        this.getCroppedImg = this.getCroppedImg.bind(this);
        this.handleConfirm = this.handleConfirm.bind(this);
        this.sendToDb = this.sendToDb.bind(this);
    }

    onSelectFile(e) {
        if (e.target.files && e.target.files.length > 0) {
            this.setState({ confirm: false });
            const reader = new FileReader();
            reader.addEventListener('load', () =>
                this.setState({ src: reader.result })
            );
            reader.readAsDataURL(e.target.files[0]);
        }
    }

    componentDidUpdate(prevProps) {
        if (
            prevProps.aspect !== this.props.aspect
        ) {
            this.setState({ aspect: this.props.aspect });
        }
    }

    sendToDb(imageUrl) {
        this.setState({ loading: true })
        axios(process.env.REACT_APP_API_URL + `/users-permissions/auth/local/edit/${state.auth.user.user.id}`, {
            method: 'POST',
            data: {
                avatar_url: imageUrl
            },
            headers: {
                Authorization: 'Bearer ' + state.auth.user.jwt
            },
        })
            .then(res => {
                this.props.getUser();

                this.setState({ loading: false })
                notification.success({ message: 'Image Updated' })
                this.props.handleClose();

            })
            .catch(err => {
                notification.error({ message: 'Upload Error, Please try again' })
                this.setState({ loading: false })
            })
    }

    componentDidMount() {
        this.setState({ aspect: this.props.aspect });
    }

    // If you setState the crop in here you should return false.
    onImageLoaded(image) {
        this.imageRef = image;
    }

    onCropComplete(crop) {
        this.makeClientCrop(crop);
        this.setState({ croped: true })
    }

    onCropChange(crop, percentCrop) {
        // You could also use percentCrop:
        // this.setState({ crop: percentCrop });
        this.setState({ crop });
    }

    async makeClientCrop(crop) {
        if (this.imageRef && crop.width && crop.height) {
            const croppedImageUrl = await this.getCroppedImg(
                this.imageRef,
                crop,
                'newPhoto.jpeg'
            );
            this.setState({ croppedImageUrl });
        }
    }

    getCroppedImg(image, crop, fileName) {
        const canvas = document.createElement('canvas');
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext('2d');

        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height
        );
        // this.fullQuality = canvas.toDataURL('image/jpeg', 1.0);
        // console.log(this.fullQuality)

        return new Promise((resolve, reject) => {
            canvas.toBlob((blob) => {
                if (!blob) {
                    //reject(new Error('Canvas is empty'));
                    console.error('Canvas is empty');
                    return;
                }
                // console.log('CONVERTED BLOB ---', blob)
                // console.log('CONVERTED file ---', this.fileUrl)
                blob.name = fileName;
                this.setState({ blob });
                // console.log(blob)
                window.URL.revokeObjectURL(this.fileUrl);
                this.fileUrl = window.URL.createObjectURL(blob);
                resolve(this.fileUrl);
            }, 'image/jpeg');
        });
    }

    async handleConfirm() {
        const options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 1600,
            maxIteration: 3,
            //useWebWorker: true
        };
        const compressedFile = await imageCompression(this.state.blob, options);
        this.setState({ confirm: true, confirmed: true, src: false });
        // getCroppedImage(compressedFile);
    }



    handleImageUpload() {
        console.log('BLOB ---', this.state.blob)
        this.setState({ loading: true })
        var uploadTask = storage.child(`images/profile/${state.auth.user.user.id}/image_0`).put(this.state.blob);
        uploadTask.on('state_changed',
            (snapshot) => {
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case firebase.storage.TaskState.PAUSED: // or 'paused'
                        console.log('Upload is paused');
                        break;
                    case firebase.storage.TaskState.RUNNING: // or 'running'
                        console.log('Upload is running');
                        break;
                }
            },
            (error) => {
                // Handle unsuccessful uploads
                notification.error({ message: 'Upload Error' });
                this.setState({ loading: false })
            },
            () => {
                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                    this.sendToDb(downloadURL)
                });
            }
        );
    }

    render() {
        const { crop, croppedImageUrl, src } = this.state;

        return (
            <div>
                <div className="button-wrap">
                    {
                        !this.state.blob ? <div className='text-center'>
                            <label className="new-button" style={{ fontSize: '30px' }} for="upload">
                                Choose Image
                    </label><br />
                            <input
                                id="upload"
                                type="file"
                                accept="image/*"
                                onChange={this.onSelectFile}
                            />
                        </div> : null
                    }
                    {/* {croppedImageUrl && !this.state.confirmed(
                        <button
                            className="confirm-btn"
                            onClick={this.handleConfirm}
                        >
                            Confirm
                        </button>
                    )} */}
                </div>
                {src && !this.state.confirm && (
                    <ReactCrop
                        src={src}
                        crop={crop}
                        ruleOfThirds
                        onImageLoaded={this.onImageLoaded}
                        onComplete={this.onCropComplete}
                        onChange={this.onCropChange}
                    // style={{ height: '90%', width: '90%' }}
                    />
                )}
                {
                    this.state.blob && this.state.confirmed ? <div className='text-center mt-3'>
                        <img src={URL.createObjectURL(this.state.blob)} style={{ borderRadius: '15px' }} /><br />
                        <button disabled={this.state.loading} className='btn btn-success rounded mt-3' onClick={() => this.handleImageUpload()}>
                            {!this.state.loading ? 'Upload' : <Spinner color='white' />}
                        </button>
                    </div> : null
                }
                <div className='text-center'>
                    {
                        this.state.src ? <button
                            className="confirm-btn btn btn-theme"
                            onClick={this.handleConfirm}
                        >
                            Crop
                        </button> : null
                    }
                </div>
                {/* {this.state.croppedImageUrl &&
                    <img src={this.state.croppedImageUrl}></img>
                } */}
            </div>
        );
    }
}

const map_dispatch_to_props = {
    getUser
}

export default connect(
    null,
    map_dispatch_to_props
)(CustomImage);
