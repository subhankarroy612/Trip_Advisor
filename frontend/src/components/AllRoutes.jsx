import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Basket from '../pages/Basket'
import Home from '../pages/Home'
import Trips from '../pages/Trips'
import SinglePlace from './SinglePlace'
import SingleTour from './SingleTour'

export default function AllRoutes() {
    return (
        <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/trips' element={<Trips />}></Route>
            <Route path='/basket' element={<Basket />}></Route>
            <Route path='/singlePlace/:id' element={<SinglePlace />}></Route>
            <Route path='/singleTour/:id/:uniId' element={<SingleTour />}></Route>
        </Routes>
    )
}
