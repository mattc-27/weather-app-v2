import React, { useState, useEffect, useContext } from 'react';
import Layout from './components/Layout';
import { WeatherProvider } from './weatherContext';
import {
    createBrowserRouter,
    Routes,
    Route,
    BrowserRouter,
    RouterProvider
} from 'react-router-dom';

import './style.css';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
    }])

export default function App() {

    return (
        <WeatherProvider>
            <RouterProvider router={router} />
        </WeatherProvider>
    );
}