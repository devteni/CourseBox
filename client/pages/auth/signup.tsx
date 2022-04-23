import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Link from 'next/link';
import { useRouter } from "next/router";
import * as yup from 'yup';
import { Form, Field, Formik } from 'formik';
import { useAppSelector, useAppDispatch } from "../../hooks";
import { reset, signUp } from "../../slices/auth/auth";

const SignUpSchema = yup.object().shape({
  firstName: yup.string().required('Firstname is required'),
  lastName: yup.string().required('Lastname is required'),
  email: yup.string().email().required('Email is required'),
  school: yup.string().required('School is required'),
  department: yup.string().required('Department is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password is too short - 6 chars minimum'),
});

// declare initial values for state
const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  school: '',
  department: '',
  password: '',
  role: 'student'
};

const Signup: NextPage = () => {
  const [err, setErr] = useState('');
  const router = useRouter();
  const validBtn =
    'text-white p-4 font-bold tracking-tighter bg-blue-700 w-full mt-6 outline-none appearance-none border-none focus:ring-4 focus:ring-gray-400';
  const disabledBtn =
    'text-white p-4 font-bold tracking-tighter bg-gray-500 w-full mt-6 outline-none appearance-none border-none focus:ring-4 focus:ring-gray-400';
  
  const dispatch = useAppDispatch();

  const { user, isLoading, isError, isSuccess, message } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if(isError) setErr(message);
    if(isSuccess && user) router.push('/app/')
    dispatch(reset())
  }, [isError, isSuccess, dispatch, user, message, router]);
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={SignUpSchema}
      onSubmit={async(values) => {
        dispatch(signUp(values));
      }}
    >
      {(formik) => {
        let {
          values,
          handleChange,
          handleBlur,
          isValid,
          dirty,
          errors,
          touched,
        } = formik;

        return (
          <div className="lg:w-1/2 lg:mx-auto mx-2 my-16 border-2 py-6 px-4">
            <>
              <h1 className="text-xl lg:text-2xl text-left">
                Welcome to <span className="text-[#0070f3]">
                  <Link href="/">
                    <a className="hover:underline text-blue-700 cursor-pointer">CourseBox</a>
                  </Link>
                  </span>
              </h1>
              <p className="text-gray-500 text-left">
                Manage your learning at a go!
              </p>

              <div className="md:flex-1 flex-auto flex-wrap mt-6">
                <Form
                  className="p-2 w-auto"
                >
                  <>
                      {
                        err ? (
                            <span className="p-3 text-black bg-gray-300 shadow-lg rounded-lg opacity-1 mx-14 lg:m-[230px]">
                              {err}
                            </span> ) : null
                      }
                    </>
                  <div className="grid gap-2 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2">
                    <div className="w-full mt-4">
                      <label
                        htmlFor="firstName"
                        className="px-5 pt-1.5 rounded-sm text-sm tracking-tighter"
                      >
                        Firstname
                      </label>
                      <Field
                        id="firstName"
                        type="text"
                        name="firstName"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.firstName}
                        className="py-3 px-5 w-full border-solid border-2 rounded-sm outline-none appearance-none focus:ring-1 focus:border-blue-700"
                        required
                      />
                      {errors.firstName && touched.firstName ? (
                        <div className="text-rose-900">{errors.firstName}</div>
                      ) : null}
                    </div>
                    <div className="w-full mt-4">
                      <label
                        htmlFor="lastName"
                        className="px-5 py-1.5 rounded-sm text-sm tracking-tighter"
                      >
                        Lastname
                      </label>
                      <Field
                        id="lastName"
                        type="text"
                        name="lastName"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.lastName}
                        className="py-3 px-5 w-full border-solid border-2 rounded-sm outline-none appearance-none focus:ring-1 focus:border-blue-700"
                        required
                      />
                      {errors.lastName && touched.lastName ? (
                        <div className="text-rose-900">{errors.lastName}</div>
                      ) : null}
                    </div>
                  </div>
                  <div className="w-full mt-4">
                    <label
                      htmlFor="email"
                      className="px-5 py-1.5 text-sm tracking-tighter"
                    >
                      Email address
                    </label>
                    <Field
                      id="email"
                      type="email"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="py-3 px-5 w-full border-solid border-2 rounded-sm outline-none appearance-none focus:ring-1 focus:border-blue-700"
                      required
                    />
                    {errors.email && touched.email ? (
                      <div className="text-rose-900">{errors.email}</div>
                    ) : null}
                  </div>
                  <div className="grid gap-2 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2">
                    <div className="w-full mt-4">
                      <label
                        htmlFor="school"
                        className="px-5 pt-1.5 rounded-sm text-sm tracking-tighter"
                      >
                        School
                      </label>
                      <Field
                        id="school"
                        type="text"
                        name="school"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.school}
                        className="py-3 px-5 w-full border-solid border-2 rounded-sm outline-none appearance-none focus:ring-1 focus:border-blue-700"
                        required
                      />
                      {errors.school && touched.school ? (
                        <div className="text-rose-900">{errors.school}</div>
                      ) : null}
                    </div>
                    <div className="w-full mt-4">
                      <label
                        htmlFor="department"
                        className="px-5 py-1.5 rounded-sm text-sm tracking-tighter"
                      >
                        Department
                      </label>
                      <Field
                        id="department"
                        type="text"
                        name="department"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.department}
                        className="py-3 px-5 w-full border-solid border-2 rounded-sm outline-none appearance-none focus:ring-1 focus:border-blue-700"
                        required
                      />
                      {errors.department && touched.department ? (
                        <div className="text-rose-900">{errors.department}</div>
                      ) : null}
                    </div>
                  </div>
                  <div className="w-full mt-4">
                    <label
                      htmlFor="password"
                      className="px-5 py-1.5 text-sm tracking-tighter"
                    >
                      Password
                    </label>
                    <Field
                      id="password"
                      type="password"
                      name="password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="py-3 px-5 w-full border-solid border-2 rounded-sm outline-none appearance-none focus:ring-1 focus:border-blue-700"
                      required
                    />
                    {errors.password && touched.password ? (
                      <div className="text-rose-900">{errors.password}</div>
                    ) : null}
                  </div>
                  <p className="m-2">
                    <input type="checkbox" />{' '}
                    <span>
                      By clicking this link you agree to our terms of services
                    </span>
                  </p>
                  <button
                    type="submit"
                    className={!(dirty && isValid) ? disabledBtn : validBtn}
                    disabled={!(dirty && isValid)}
                  >
                    Sign up
                  </button>
                  <>
                    <p className="text-right text-sm m-2 p-2">
                      Don&apos;at have an account?{' '}
                      <Link href="/auth/login">
                          <a className="underline text-blue-700">Log in</a>
                      </Link>
                    </p>
                  </>
                </Form>
              </div>
            </>
          </div>
        );
      }}
    </Formik>
  );
};

export default Signup;