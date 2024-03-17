import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AuthLayout from '../Layouts/AuthLayout'
import PlanLayout from '../Layouts/PlanLayout'
import PrivateLayout from '../Layouts/PrivateLayout'
import useRoutes from '../hooks/useRoute'

const Routing = ({ baseData, ...props }) => {

    const { authRoutes, privateRoute, plainRoutes } = useRoutes();

    return (
        <BrowserRouter>
            <Routes {...props}>
                <Route element={<AuthLayout />}>
                    {authRoutes().map(({ id: key, ...otherData }) => (
                        <Route index key={`auth_${key}`} {...otherData} />
                    ))}
                </Route>
                <Route element={<PlanLayout />}>
                    {plainRoutes().map(({ id: key, ...otherData }) => (
                        <Route index key={`plan_${key}`} {...otherData} />
                    ))}
                </Route>
                <Route element={<PrivateLayout />}>
                    {privateRoute().map(({ id: key, ...otherData }) => (
                        <Route index key={`private_${key}`} {...otherData} />
                    ))}
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Routing