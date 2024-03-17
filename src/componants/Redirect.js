import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Redirect = () => {
    const navigate = useNavigate();
    const token = useSelector(({ user }) => user?.data?.data?.device_info?.token);

    useEffect(() => {
        if (token) {
            navigate("/");
        } else {
            navigate("/login");
        }
    }, [navigate, token]);
};

export default Redirect;
