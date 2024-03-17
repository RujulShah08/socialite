import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import withAuthRoutes from "../hoc/withAuthRoutes";
// import Section from "../components/website/commen/section";

const AuthLayout = ({ isLoggedIn, ...props }) => {
    const WithAuthOutlet = withAuthRoutes(Outlet, Navigate);
    return (
        <>
            {/* <Section /> */}
            <WithAuthOutlet {...props} replace {...{ to: "/redirect" }} />
        </>
    );
};
export default AuthLayout;
