import { LOGIN, LOGOUT } from "./auth.actionTypes"

const initState = {
    isAuth: !!localStorage.getItem('tripAdvisor'),
    token: localStorage.getItem('tripAdvisor') || '',
    open: ''
}

export const authReducer = (state = initState, action) => {

    switch (action.type) {
        case LOGIN:
            localStorage.setItem('tripAdvisor', action.payload)
            return {
                ...state,
                isAuth: true,
                token: action.payload
            }
        case LOGOUT:
            localStorage.removeItem('tripAdvisor')
            return {
                ...state,
                isAuth: false,
                token: ''
            }
        case 'storeModal':
            return {
                ...state, open: action.payload
            }
        default:
            return state
    }

}