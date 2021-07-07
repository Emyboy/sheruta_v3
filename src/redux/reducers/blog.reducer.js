import { GET_ALL_BLOG_SUCCESS, GET_ALL_BLOG_ERROR, BLOG_LOADING } from '../actions';

const initialState = {
    blogLoading: true,
    blog: [],
    blogError: false
}

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case BLOG_LOADING:
            return {
                blogLoading: true,
                blog: [],
                blogError: false
            }
    case GET_ALL_BLOG_SUCCESS:
        return {
            blogLoading: false,
            blog: payload,
            blogError: false
        }
    case GET_ALL_BLOG_ERROR:
        return {
            blogLoading: false,
            blog: [],
            blogError: payload
        }

    default:
        return state
    }
}
