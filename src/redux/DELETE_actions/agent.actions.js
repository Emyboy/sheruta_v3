import { notification } from 'antd';
import Axios from 'axios';
import { v4 as uuid } from 'uuid'
import {
    SET_AGENT_PROPERTIES,
    AGENT_LOADING,
    SET_AGENT_LIST,
    UPDATE_AGENT_PROGRESS, LISTING_LOADING, UPLOAD_LOADING, LISTING_STATUS
} from '.';
import { storage } from '../../Firebase';
import $ from 'jquery'
import Cookies from 'js-cookie';

export const getAllAgents = () => dispatch => {
    dispatch({ type: AGENT_LOADING, payload: true });
    Axios(`${process.env.REACT_APP_API_URL}/agent/all`)
        .then(agents => {
            dispatch({ type: SET_AGENT_LIST, payload: agents.data.list })
            dispatch({ type: AGENT_LOADING, payload: false });
        })
        .catch(err => {
            notification.error({ message: 'Agent List Failed' })
        })
};

export const addNewProperty = data => dispatch => {
    dispatch({ type: LISTING_LOADING, payload: true });
    dispatch({ type: LISTING_STATUS, payload: 'loading' })
    const id = uuid();
    const image_urls = {};
    const list = [];

    data.image_files.map((val, i) => {
        const uploadTask = storage.child(`properties/${data.user_id}/${id}/image_${i + 1}`).put(val)
        uploadTask.on('state_changed', (snapshot) => {
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            dispatch({ type: UPDATE_AGENT_PROGRESS, payload: progress })
        }, (error) => {
            // Handle unsuccessful uploads
            notification.error({ message: 'Error Uploading Image(s) ' });
            dispatch({ type: LISTING_LOADING, payload: false });
        }, () => {
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                list.push(downloadURL);
                list.map(val => {
                    image_urls[`image_url_${i + 1}`] = val;
                });
                notification.success({ message: `uploaded ${i+1} image(s)`,
            duration: 1 });
                dispatch({ type: UPDATE_AGENT_PROGRESS, payload: 0 });
                if (list.length === data.image_files.length) {
                    Axios(`${process.env.REACT_APP_API_URL}/property`, {
                        method: 'POST',
                        data: { ...data, uuid: id, image_urls },
                        headers: { 
                            authorization: Cookies.get('token')
                        }
                    })
                        .then(res => {
                            // TODO: Delete trails from firebase
                            if(res.data){
                                dispatch({ type: LISTING_STATUS, payload: 'success' })
                                setTimeout(() => {
                                    dispatch({ type: LISTING_LOADING, payload: false });
                                }, 5000);
                            }else {
                                dispatch({ type: LISTING_STATUS, payload: 'error' })
                                setTimeout(() => {
                                    dispatch({ type: LISTING_LOADING, payload: false });
                                }, 5000);
                            }
                            // if (res.data.name){
                            //     dispatch({ type: LISTING_STATUS, payload: 'error' })
                            // };
                            // if(res.data === 200){
                            //     dispatch({ type: LISTING_STATUS, payload: 'success' })
                            // }
                            // setTimeout(() => {
                            //     dispatch({ type: LISTING_LOADING, payload: false });
                            // }, 5000);
                        })
                        .catch(err => {
                            dispatch({ type: LISTING_STATUS, payload: 'error' })
                            dispatch({ type: LISTING_LOADING, payload: false });
                        })
                }
            }).catch(err => {
                dispatch({ type: LISTING_LOADING, payload: true });
                dispatch({ type: UPDATE_AGENT_PROGRESS, payload: 0 });
            });
        });
    })
};


export const getAgentsProperties = agent_id => dispatch => {
    Axios(`${process.env.REACT_APP_API_URL}/property/${agent_id}`)
        .then(res => {
            dispatch({ type: SET_AGENT_PROPERTIES, payload: res.data })
        })
        .catch(err => {
            dispatch({ type: SET_AGENT_PROPERTIES, payload: [] })
        })
}

export const deleteApartment = data => dispatch => {
    dispatch({ type: 'DELETE_LOADING', payload: true })
    Axios(`${process.env.REACT_APP_API_URL}/property/${data.uuid}`, {
        method: 'DELETE'
    })
        .then(res => {
            if(res.data[0].id){
                localStorage.setItem('url', '/property/'+res.data[0].id +'/'+res.data[0].agent_id)
                notification.success({
                    message: "Deleted"
                });
                $(`#${data.uuid}`).css("background-color", "pink");
                setTimeout(() => {
                    $(`#${data.uuid}`).fadeOut(1000);
                }, 2000);
            }else {
                notification.error({
                    message: "Request Error"
                });
            }
        })
        .catch(err => {
            notification.error({
                message: "Bad Request"
            })
        })
}
