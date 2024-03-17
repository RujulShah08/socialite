import React, { useCallback, useEffect } from 'react'
import { Field, Form, Formik } from "formik";
import { NavLink, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import * as Yup from 'yup';
import Authsidebar from '../../../componants/authsidebar'
import { useDispatch, useSelector } from 'react-redux';
import { otpVerificationRedux } from '../../../store/actions/userAction';

function OtpVerification() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const validationSchema = useCallback(() => {
        return Yup.object().shape({
            otp_code: Yup.string()
                .required('Otp Code is required')
                .matches(/^\d{4}$/, 'Otp Code must be exactly 4 digits'),
        });
    }, []);

    const handleOtpVerification = useCallback(
        (values) => {
            dispatch(otpVerificationRedux(values));
        },
        []
    );
    useEffect(() => {
        if (!localStorage.getItem('email')) {
            navigate("/login");
        }
    }, []);
    return (
        <>
            <Helmet>
                <title>Socialite | Otp Verification</title>
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
                            <h2 className="text-2xl font-semibold mb-1.5"> Verified Your Otp Code </h2>
                            <p className="text-sm text-gray-700 font-normal">If you already have an account, <NavLink to="/login" className="text-blue-700">Login here!</NavLink></p>
                        </div>
                        <Formik
                            initialValues={{
                                otp_code: "",
                            }}
                            validationSchema={validationSchema}
                            onSubmit={handleOtpVerification}
                        >
                            {(formik) => {
                                return (
                                    <Form className="space-y-7 text-sm text-black font-medium dark:text-white" uk-scrollspy="target: > *; cls: uk-animation-scale-up; delay: 100 ;repeat: true">
                                        <div>
                                            <label htmlFor="otp_code" className>Otp Code</label>
                                            <div className="mt-2.5">
                                                <Field id="otp_code" name="otp_code" type="number" autoFocus placeholder="Otp Code" required="" className="!w-full !rounded-lg !bg-transparent !shadow-sm !border-slate-200 dark:!border-slate-800 dark:!bg-white/5" />
                                                {formik.errors.otp_code && formik.touched.otp_code ? (
                                                    <div className="error">
                                                        {formik.errors.otp_code}
                                                    </div>
                                                ) : null}
                                            </div>
                                        </div>
                                        <div>
                                            <button type="submit" className="button bg-primary text-white w-full">Verify OTP</button>
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

export default OtpVerification