

export const setGroupState = newState => dispatch => {
    return dispatch({
        type: 'SET_GROUP_STATE',
        payload: newState
    })
}
