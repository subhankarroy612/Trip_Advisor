import axios from 'axios'
import { Url } from '../../components/Url'
import { LOGIN } from './auth.actionTypes'

export const register = (data) => async (dispatch) => {
    try {
        await axios.post(Url + '/auth/register', data)
        return true
    } catch (e) {
        console.log(e.message);
        return false
    }
}

export const login = (data) => async (dispatch) => {
    try {
        const res = await axios.post(Url + '/auth/login', data);

        dispatch({ type: LOGIN, payload: res.data.token })
        return true
    } catch (e) {
        console.log(e.message);
        return false
    }
}