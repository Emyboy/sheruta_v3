/* eslint-disable array-callback-return */
import {
    FEATURE_LOADING,
    FEATURE_SUCCESS,
    FEATURE_ERROR,
    FEATURE_MESSAGE,
    FEATURE_IMAGE_DONE,
} from '.';

import firebase from 'firebase';
import { storage } from '../../Firebase';
import Axios from 'axios';
import { notification } from 'antd';

const date = new Date();

const featureLoading = () => {
    return {
        type: FEATURE_LOADING
    }
}

const featureError = err => {
    return {
        type: FEATURE_ERROR,
        payload: err
    }
}

const featureSuccess = data => {
    return {
        type: FEATURE_SUCCESS,
        payload: data
    }
};

const changeMessages = message => {
    return {
        type: FEATURE_MESSAGE,
        payload: message
    }
}

const imageDone = urls => {
    return {
        type: FEATURE_IMAGE_DONE,
        payload: urls
    }
}

export const UploadToDatabase = data => dispatch => {
    delete data.showAmenities;
    delete data.showModal;
    dispatch(featureLoading());
    return Axios(`${process.env.REACT_APP_BASE_URL}/featured`, {
        method: 'POST',
        data
    })
        .then(res => {
            if (res.data.status !== 200) {
                dispatch(featureError(res.data.error));
                if (res.data.error.column) {
                    notification.error({ message: `${res.data.error.column} is Empty` })
                } else {
                    notification.error({ message: 'Upload Error!!' })
                }
            } else {
                dispatch(featureSuccess(res.data))
                notification.success({ message: 'Upload Success' })
            }
        })
        .catch(err => {
            dispatch(featureError(err));
            notification.error({ message: 'Upload Error!!' })
            notification.error({ message: 'Please Try Again' })
            console.log(err)
        })
}

export const handdleImageUpload = (data, email, apartmentData) => dispatch => {
    dispatch(featureLoading());
    let links = [];
    if (data.length === 4) {
        console.log('sending images', data);
        data.map((val, i) => {
            console.log(val);
            const image = storage.ref(`featured/${email}/${`${date}`}/${val.name}`).put(val)
            image.on('state_changed', function (snapshot) {
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case firebase.storage.TaskState.PAUSED: // or 'paused'
                        console.log('Upload is paused');
                        break;
                    case firebase.storage.TaskState.RUNNING: // or 'running'
                        console.log('Upload is running');
                        break;
                    default:
                        break;
                }
            }, function (error) {
                notification.error({ message: 'Error Uploading Images' })
            }, function () {
                dispatch(changeMessages('Uploading Images'))
                image.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                    console.log('File available at', downloadURL);
                    links.push(downloadURL);
                    if (links.length === 4) {
                        dispatch({ type: FEATURE_IMAGE_DONE, payload: links });
                        console.log('upload done', links);
                        dispatch(changeMessages('Image Upload Done.!!'))
                        dispatch(imageDone(links));
                        dispatch(UploadToDatabase(apartmentData, links));
                        notification.success({ message: 'Images Uploaded' });
                    }
                });
            });
        })
    } else {
        notification.error({ message: 'Images Not Compelete' });
    }
    return links;
}
