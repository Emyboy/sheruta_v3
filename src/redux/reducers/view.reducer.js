import { 
    TOGGLE_LIGHT_BOX, 
    TOGGLE_NAVBAR, 
    DETAIL_LOADING,
    TOGGLE_ADD_NUMBER, SET_DASHBOARD_VIEW
} from "../actions"

const initialState = {
    showLightBox: false,
    showNavbar: false,
    imageViewerIndex: 0,
    detailLoading: false,
    showAddNumber: true,
    currentDashboardView: 'listings',
    typeOptions: [
        { key: 'Houses', value: 'house' },
        { key: 'Lands', value: 'land' },
        { key: 'Self Contain', value: 'flat-apartment/self-contain' },
        { key: 'Shop', value: 'commercial-property/shop' },
        { key: 'Office Spaces', value: 'commercial-property/office-space' },
        { key: 'Flats and Apartments', value: 'flat-apartment' },
        { key: 'Semi Detached Bungalow', value: 'house/semi-detached-bungalow' },
        { key: 'Semi Detached Duplex', value: 'house/semi-detached-duplex' },
        { key: 'Co-working Space', value: 'co-working-space' },
        { key: 'Detached Bungalow', value: 'house/detached-bungalow' },
        { key: 'Warehouse', value: 'commercial-property/warehouse' },
        { key: 'Shop In A Mall', value: 'commercial-property/shop-in-a-mall' },
        { key: 'Mini Flats', value: 'flat-apartment/mini-flat' },
        { key: 'Detached Duplex', value: 'house/detached-duplex' },
        { key: 'Terraced Bungalow', value: 'house/terraced-bungalow' },
        { key: 'Commercial Properties', value: 'commercial-property' },
        { key: 'Terraced Duplex', value: 'house/terraced-duplex' },
    ]
}

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case TOGGLE_LIGHT_BOX:
            return {
                ...state,
                showLightBox: payload.lightBoxState,
                imageViewerIndex: payload.index
            }
        case TOGGLE_NAVBAR: 
            return {
                ...state,
                showNavbar: payload
            }
        case DETAIL_LOADING:
            return {
                ...state,
                detailLoading: !state.detailLoading
            }
        case TOGGLE_ADD_NUMBER:
            return {
                ...state,
                showAddNumber: !state.showAddNumber
            }
        case SET_DASHBOARD_VIEW:
            return {
                ...state,
                currentDashboardView: payload
            }
        default:
            return state
    }
}
