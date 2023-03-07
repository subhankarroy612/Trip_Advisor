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