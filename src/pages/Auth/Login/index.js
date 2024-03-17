import React, { useCallback } from 'react'
import { Field, Form, Formik } from "formik";
import { NavLink, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import * as Yup from 'yup';
import Authsidebar from '../../../componants/authsidebar'
import { loginRedux } from '../../../store/actions/userAction';
import { useDispatch } from 'react-redux';

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const validationSchema = useCallback(() => {
        return Yup.object().shape({
            emailmobile: Yup.string().required('Email or Mobile is required').test(
                'is-email-or-mobile',
                'Invalid email or mobile format',
                function (value) {
                    // Check if it's a valid email or a 10-digit number for a mobile
                    const isEmail = Yup.string().email().isValidSync(value);
                    const isMobile = /^\d{10}$/.test(value);

                    return isEmail || isMobile;
                }
            ),

            password: Yup.string()
                .required('Password is required')
                .min(6, 'Password must be at least 6 characters long')
                .matches(/^(?=.*\d)(?=.*[\W_]).*$/, 'Password must contain at least one number and one special character'),
        });
    }, []);

    const handleSignin = useCallback(
        (values) => {
            dispatch(loginRedux(values)).then((result) => {
                if (result?.payload?.code == 401) {
                    navigate('/otp-verification');
                }
            });
        },
        []
    );
    return (
        <>
            <Helmet>
                <title>Socialite | Login</title>
            </Helmet>
            <div className="sm:flex">
                <div className="relative lg:w-[580px] md:w-96 w-full p-10 min-h-screen bg-white shadow-xl flex items-center pt-10 dark:bg-slate-900 z-10">
                    <div className="w-full lg:max-w-sm mx-auto space-y-10" uk-scrollspy="target: > *; cls: uk-animation-scale-up; delay: 100 ;repeat: true">
                        <NavLink> <img src="assets/images/logo.png" className="w-28 absolute top-10 left-10 dark:hidden" alt='' /></NavLink>
                        <NavLink> <img src="assets/images/logo-light.png" className="w-28 absolute top-10 left-10 hidden dark:!block" alt='' /></NavLink>
                        <div className="hidden">
                            <img className="w-12" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt='' />
                        </div>
                        <div>
                            <h2 className="text-2xl font-semibold mb-1.5"> Sign in to your account </h2>
                            <p className="text-sm text-gray-700 font-normal">If you haven’t signed up yet. <NavLink to="/register" className="text-blue-700">Register here!</NavLink></p>
                        </div>
                        <Formik
                            initialValues={{
                                emailmobile: "",
                                password: "",
                            }}
                            validationSchema={validationSchema}
                            onSubmit={handleSignin}
                        >
                            {(formik) => {
                                return (
                                    <Form className="space-y-7 text-sm text-black font-medium dark:text-white" uk-scrollspy="target: > *; cls: uk-animation-scale-up; delay: 100 ;repeat: true">
                                        <div>
                                            <label htmlFor="email" className>Email address Or Mobile Number</label>
                                            <div className="mt-2.5">
                                                <Field id="email" name="emailmobile" type="text" autoFocus placeholder="Email or Mobile" required="" className="!w-full !rounded-lg !bg-transparent !shadow-sm !border-slate-200 dark:!border-slate-800 dark:!bg-white/5" />
                                                {formik.errors.emailmobile && formik.touched.emailmobile ? (
                                                    <div className="error">
                                                        {formik.errors.emailmobile}
                                                    </div>
                                                ) : null}
                                            </div>
                                        </div>
                                        <div>
                                            <label htmlFor="password" className>Password</label>
                                            <div className="mt-2.5">
                                                <Field id="password" name="password" type="password" placeholder="***" className="!w-full !rounded-lg !bg-transparent !shadow-sm !border-slate-200 dark:!border-slate-800 dark:!bg-white/5" />
                                                {formik.errors.password && formik.touched.password ? (
                                                    <div className="error">
                                                        {formik.errors.password}
                                                    </div>
                                                ) : null}
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2.5">
                                                <Field id="rememberme" name="rememberme" type="checkbox" />
                                                <label htmlFor="rememberme" className="font-normal">Remember me</label>
                                            </div>
                                            <NavLink className="text-blue-700">Forgot password </NavLink>
                                        </div>
                                        <div>
                                            <button type="submit" className="button bg-primary text-white w-full">Sign in</button>
                                        </div>
                                        <div className="text-center flex items-center gap-6">
                                            <hr className="flex-1 border-slate-200 dark:border-slate-800" />
                                            Or continue with
                                            <hr className="flex-1 border-slate-200 dark:border-slate-800" />
                                        </div>
                                        <div className="flex gap-2" uk-scrollspy="target: > *; cls: uk-animation-scale-up; delay: 400 ;repeat: true">
                                            <NavLink className="button flex-1 flex items-center gap-2 bg-primary text-white text-sm"> <ion-icon name="logo-facebook" className="text-lg" /> facebook</NavLink>
                                            <NavLink className="button flex-1 flex items-center gap-2 bg-sky-600 text-white text-sm"> <ion-icon name="logo-twitter" /> twitter</NavLink>
                                            <NavLink className="button flex-1 flex items-center gap-2 bg-black text-white text-sm"> <ion-icon name="logo-github" /> github</NavLink>
                                        </div>
                                    </Form>
                                );
                            }}
                        </Formik>
                    </div>
                </div>
                <Authsidebar />
            </div>
        </>
    )
}

export default Login