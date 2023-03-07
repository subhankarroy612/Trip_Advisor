import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import SinglePlace from './SinglePlace'

export default function AllRoutes() {
    return (
        <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/singlePlace/:id' element={<SinglePlace />}></Route>
        </Routes>
    )
}
