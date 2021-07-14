import axios from "axios"



export const notifyEmy = ({
    heading,
    body
}) => {
    axios(process.env.REACT_APP_API_URL + '/user-feedbacks/notify/emy', {
        method: 'POST',
        data: {
            heading,
            body
        }
    })
        .then(res => {
            console.log('notified emy')
        })
        .catch(err => {
        })
}
