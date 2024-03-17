import React, { useCallback } from 'react'
import { Field, Form, Formik } from "formik";
import { NavLink, useNavigate } from 'react-router-dom'
import Helmet from 'react-helmet';
import Authsidebar from '../../../componants/authsidebar'
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { registerRedux } from '../../../store/actions/userAction';

function Signup() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const validationSchema = useCallback(() => {
        return Yup.object().shape({
            first_name: Yup.string().required('First name is required'),
            last_name: Yup.string().required('Last name is required'),
            email: Yup.string().email().required(),
            password: Yup.string()
                .required('Password is required')
                .min(6, 'Password must be at least 6 characters long')
                .matches(/^(?=.*\d)(?=.*[\W_]).*$/, 'Password must contain at least one number and one special character'),
            confirm_password: Yup.string()
                .oneOf([Yup.ref('password'), null], 'Passwords must match')
                .required('Confirm Password is required'),
            mobile: Yup.string()
                .required('Mobile Number is required')
                .matches(/^\d{10}$/, 'Mobile Number must be 10 digits long'),
            dob: Yup.string().required('Birth Date is required'),
        });
    }, []);

    const handleRegister = useCallback(
        (values) => {
            dispatch(registerRedux(values)).then((result) => {
                if (result.payload.code == 200) {
                    navigate('/otp-verification');
                }
            });
        },
        []
    )
    return (
        <>
            <Helmet>
                <title>Socialite | Register</title>
            </Helmet>
            <div className="sm:flex">
                <div className="relative lg:w-[580px] md:w-96 w-full p-10 min-h-screen bg-white shadow-xl flex items-center pt-10 dark:bg-slate-900 z-10">
                    <div className="w-full lg:max-w-sm mx-auto space-y-10" uk-scrollspy="target: > *; cls: uk-animation-scale-up; delay: 100 ;repeat: true">
                        <NavLink> <img src="assets/images/logo.png" className="w-28 absolute top-10 left-10 dark:hidden" alt='' /></NavLink>
                        <NavLink> <img src="assets/images/logo-light.png" className="w-28 absolute top-10 left-10 hidden dark:!block" alt='' /></NavLink>
                        <div className="hidden">
                            <img className="w-12" src="assets/images/logo-icon.png" alt='' />
                        </div>
                        <div>
                            <h2 className="text-2xl font-semibold mb-1.5"> Sign up to get started </h2>
                            <p className="text-sm text-gray-700 font-normal">If you already have an account, <NavLink to="/login" className="text-blue-700">Login here!</NavLink></p>
                        </div>
                        <Formik
                            initialValues={{
                                first_name: "",
                                last_name: "",
                                email: "",
                                password: "",
                                confirm_password: "",
                                mobile: "",
                                dob: "",
                            }}
                            validationSchema={validationSchema}
                            onSubmit={handleRegister}
                        >
                            {(formik) => {
                                return (
                                    <Form method="#" action="#" className="space-y-7 text-sm text-black font-medium dark:text-white" uk-scrollspy="target: > *; cls: uk-animation-scale-up; delay: 100 ;repeat: true">
                                        <div className="grid grid-cols-2 gap-4 gap-y-7">
                                            <div>
                                                <label htmlFor="first_name" className>First name</label>
                                                <div className="mt-2.5">
                                                    <Field id="first_name" name="first_name" type="text" autoFocus placeholder="First name" required="" className="!w-full !rounded-lg !bg-transparent !shadow-sm !border-slate-200 dark:!border-slate-800 dark:!bg-white/5" />
                                                    {formik.errors.first_name && formik.touched.first_name ? (
                                                        <div className="error">
                                                            {formik.errors.first_name}
                                                        </div>
                                                    ) : null}
                                                </div>
                                            </div>
                                            <div>
                                                <label htmlFor="last_name" className>Last name</label>
                                                <div className="mt-2.5">
                                                    <Field id='last_name' name="last_name" type="text" placeholder="Last name" required="" className="!w-full !rounded-lg !bg-transparent !shadow-sm !border-slate-200 dark:!border-slate-800 dark:!bg-white/5" />
                                                    {formik.errors.last_name && formik.touched.last_name ? (
                                                        <div className="error">
                                                            {formik.errors.last_name}
                                                        </div>
                                                    ) : null}
                                                </div>
                                            </div>
                                            <div className="col-span-2">
                                                <label htmlFor="email" className>Email address</label>
                                                <div className="mt-2.5">
                                                    <Field id="email" name="email" type="email" placeholder="Email" required="" className="!w-full !rounded-lg !bg-transparent !shadow-sm !border-slate-200 dark:!border-slate-800 dark:!bg-white/5" />
                                                    {formik.errors.email && formik.touched.email ? (
                                                        <div className="error">
                                                            {formik.errors.email}
                                                        </div>
                                                    ) : null}
                                                </div>
                                            </div>
                                            <div>
                                                <label htmlFor="password" className>Password</label>
                                                <div className="mt-2.5">
                                                    <Field id="password" name="password" type="password" placeholder="***" className="!w-full !rounded-lg !bg-transparent !shadow-sm !border-slate-200 dark:!border-slate-800 dark:!bg-white/5" />
                                                </div>
                                                {formik.errors.password && formik.touched.password ? (
                                                    <div className="error">
                                                        {formik.errors.password}
                                                    </div>
                                                ) : null}
                                            </div>
                                            <div>
                                                <label htmlFor="confirm_password" className>Confirm Password</label>
                                                <div className="mt-2.5">
                                                    <Field id="confirm_password" name="confirm_password" type="password" placeholder="***" className="!w-full !rounded-lg !bg-transparent !shadow-sm !border-slate-200 dark:!border-slate-800 dark:!bg-white/5" />
                                                </div>
                                                {formik.errors.confirm_password && formik.touched.confirm_password ? (
                                                    <div className="error">
                                                        {formik.errors.confirm_password}
                                                    </div>
                                                ) : null}
                                            </div>
                                            <div>
                                                <label htmlFor="dob" className>Birth date</label>
                                                <div className="mt-2.5">
                                                    <Field id="dob" name="dob" type="date" className="!w-full !rounded-lg !bg-transparent !shadow-sm !border-slate-200 dark:!border-slate-800 dark:!bg-white/5" />
                                                </div>
                                                {formik.errors.dob && formik.touched.dob ? (
                                                    <div className="error">
                                                        {formik.errors.dob}
                                                    </div>
                                                ) : null}
                                            </div>
                                            <div>
                                                <label htmlFor="mobile" className>Mobile Number</label>
                                                <div className="mt-2.5">
                                                    <Field id="mobile" name="mobile" type="number" placeholder="Mobile" className="!w-full !rounded-lg !bg-transparent !shadow-sm !border-slate-200 dark:!border-slate-800 dark:!bg-white/5" />
                                                </div>
                                                {formik.errors.mobile && formik.touched.mobile ? (
                                                    <div className="error">
                                                        {formik.errors.mobile}
                                                    </div>
                                                ) : null}
                                            </div>
                                            <div className="col-span-2">
                                                <label className="inline-flex items-center" id="rememberme">
                                                    <Field type="checkbox" id="accept-terms" className="!rounded-md accent-red-800" />
                                                    <span className="ml-2">you agree to our <NavLink className="text-blue-700 hover:underline">terms of use </NavLink> </span>
                                                </label>
                                            </div>
                                            <div className="col-span-2">
                                                <button type="submit" className="button bg-primary text-white w-full">Get Started</button>
                                            </div>
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
                                )
                            }}
                        </Formik>
                    </div>
                </div>
                <Authsidebar />
            </div>
        </>
    )
}

export default Signup