import { useCallback, useMemo } from "react";
import { URLS } from "../utils/url";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import OtpVerification from "../pages/Auth/OtpVerification";
import Home from "../pages/Home";
import Messages from "../pages/messages";
import Error from "../componants/Error";
import Redirect from "../componants/Redirect";

function useRoutes() {
    const routes = useMemo(() => {
        return [
            {
                id: "error_page",
                path: URLS.ERROR.url,
                name: URLS.ERROR.name,
                hasPlanLayout: true,
                element: <Error />,
                exact: true,
            },
            {
                id: "login_page",
                path: URLS.LOGIN.url,
                name: URLS.LOGIN.name,
                isAuth: true,
                element: <Login />,
                exact: true,
            },
            {
                id: "register_page",
                path: URLS.REGISTER.url,
                name: URLS.REGISTER.name,
                isAuth: true,
                element: <Register />,
                exact: true,
            },
            {
                id: "otp_verification_page",
                path: URLS.OtpVerification.url,
                name: URLS.OtpVerification.name,
                isAuth: true,
                element: <OtpVerification />,
                exact: true,
            },
            {
                id: "home_page",
                path: URLS.HOME.url,
                name: URLS.HOME.name,
                element: <Home />,
                isPrivate: true,
                exact: true,
            },
            {
                id: "messages_page",
                path: URLS.MESSAGES.url,
                name: URLS.MESSAGES.name,
                element: <Messages />,
                isPrivate: true,
                exact: true,
            },
            {
                id: "redirect_page",
                path: URLS.REDIRECT.url,
                name: URLS.REDIRECT.name,
                element: <Redirect />,
                isPrivate: true,
                exact: true,
            },
        ];
    }, []);

    const authRoutes = useCallback(() => {
        return routes.filter((val) => val.isAuth);
    }, [routes]);

    const plainRoutes = useCallback(() => {
        return routes.filter((val) => val.hasPlanLayout);
    }, [routes]);

    const privateRoute = useCallback(() => {
        return routes.filter((val) => val.isPrivate);
    }, [routes]);

    return {
        // routes,
        authRoutes,
        privateRoute,
        plainRoutes,
    };
}

export default useRoutes;
