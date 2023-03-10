
const initState = {
    basketCount: 0
}

export const homeReducer = (state = initState, action) => {
    switch (action.type) {

        case 'basketCount':
            return {
                ...state, basketCount: action.payload
            }
        case 'incBasketCount':
            return {
                ...state, basketCount: state.basketCount + 1
            }
        case 'decBasketCount':
            return {
                ...state, basketCount: state.basketCount - 1
            }
        default:
            return state
    }
}