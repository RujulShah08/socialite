import React from 'react';
import { Outlet } from 'react-router-dom';

const PlanLayout = ({ ...props }) => {
    return (
        <Outlet {...props} />
    )
};

export default PlanLayout;
