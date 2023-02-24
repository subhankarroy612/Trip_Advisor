import { LOGIN } from "./auth.actionTypes"

const initState = {
    isAuth: false,
    token: localStorage.getItem('tripAdvisor') || ''
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
        default:
            return state
    }

}