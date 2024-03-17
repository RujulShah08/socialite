import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import withAuthenticated from "../hoc/withAuthenticated";
import Header from "../componants/header";
import Sidebar from "../componants/sidebar";
// import Footer from "../components/website/commen/footer";

const PrivateLayout = ({ ...props }) => (
    <section {...props}>
        <Header />
        <Sidebar />
        <WithAuthenticatedOutlet {...props} replace {...{ to: "/login" }} />
        {/* <Footer /> */}
    </section>
);
export default PrivateLayout;
const WithAuthenticatedOutlet = withAuthenticated(Outlet, Navigate);
