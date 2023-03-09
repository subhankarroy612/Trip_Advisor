import axios from 'axios'
import { Url } from '../../components/Url';

export const getP1 = () => async (dispatch) => {
    try {
        let res = await axios(Url + '/getData/places')
        return res.data
    } catch (e) {
        console.log(e.message);
    }
}


export const getSinglePlace = (id) => async (dispatch) => {
    try {
        let res = await axios(Url + '/getData/singlePlace/' + id)
        return res.data
    } catch (e) {
        console.log(e.message);
    }
}

export const getT1 = () => async (dispatch) => {
    try {
        let res = await axios(Url + '/getData/tour')
        return res.data
    } catch (e) {
        console.log(e.message);

    }
}

export const getSingleTour = (id) => async (dispatch) => {
    try {
        let res = await axios(Url + '/getData/singleTour/' + id)
        return res.data
    } catch (e) {
        console.log(e.message);
    }
}

export const addToTrips = (id, token) => async (dispatch) => {
    try {
        await axios.post(Url + '/trip', {
            productId: id
        }, {
            headers: {
                token
            }
        })
        return true
    } catch (e) {
        return false
    }
}

export const getTripsData = (token) => async (dispatch) => {
    try {
        let res = await axios(Url + '/trip', {
            headers: {
                token
            }
        })
        return (res.data);
    } catch (e) {
        console.log(e.message);
    }
}

export const deleteTrip = (id, token) => async (dispatch) => {
    try {
        await axios.delete(Url + '/trip/' + id, {
            headers: {
                token
            }
        })
        return true
    } catch (e) {
        return false
    }
}

export const addToBaskets = (id, pax, token) => async (dispatch) => {
    try {
        await axios.post(Url + '/basket', {
            productId: id,
            pax
        }, {
            headers: {
                token
            }
        })
        return true
    } catch (e) {
        console.log(e.message);
        return false
    }
}

export const getBasketData = (token) => async (dispatch) => {
    try {
        let res = await axios(Url + '/basket', {
            headers: {
                token
            }
        })
        return (res.data);
    } catch (e) {
        console.log(e.message);
    }
}

export const deleteBasket = (id, token) => async (dispatch) => {
    try {
        await axios.delete(Url + '/basket/' + id, {
            headers: {
                token
            }
        })
        return true
    } catch (e) {
        return false
    }
}