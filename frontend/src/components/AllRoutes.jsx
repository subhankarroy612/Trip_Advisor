import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import Trips from '../pages/Trips'
import SinglePlace from './SinglePlace'
import SingleTour from './SingleTour'

export default function AllRoutes() {
    return (
        <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/trips' element={<Trips />}></Route>
            <Route path='/singlePlace/:id' element={<SinglePlace />}></Route>
            <Route path='/singleTour/:id' element={<SingleTour />}></Route>
        </Routes>
    )
}
