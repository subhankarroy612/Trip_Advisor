import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { authReducer } from "./authReducer/auth.Reducer";
import thunk from 'redux-thunk'
import { homeReducer } from "./homeReducer/home.Reducer";


const rootReducer = combineReducers({
    auth: authReducer,
    home: homeReducer
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))