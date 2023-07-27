import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { signIn } from "../../slices/userSlice";
import { useSelector } from "react-redux";
import Loading from "../../components/Loading/Loading";
import Error from "../../components/Error/Error";
import Input from "../../components/Input/Input";

const schema = yup.object({
  email: yup
    .string()
    .required("Email is required !!!")
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Email have to be an email !!!"),
  password: yup
    .string()
    .required("Password is required !!!")
    .min(6, "Minimum is 6 characters")
    .max(10, "Maximum is 10 characters"),
});

export default function SignIn() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onTouched",
    resolver: yupResolver(schema),
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isLoading, error } = useSelector((state) => state.userReducer);

  const onSubmit = (values) => {
    dispatch(signIn(values));
  };

  const onError = (errors) => {
    console.log(errors);
  };

  if (user) navigate("/");

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <section className="bg-gray-900">
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div className="w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-gray-900 border-gray-700">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight  md:text-2xl text-white">
                  Sign in to your account
                </h1>
                {error && <Error error={error} />}
                <form
                  onSubmit={handleSubmit(onSubmit, onError)}
                  className="space-y-4 md:space-y-6"
                >
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium  text-white"
                    >
                      Your email
                    </label>
                    <Input control={control} name="email" />
                    {errors.email && (
                      <p className="text-red-600 font-medium mt-2">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium  text-white"
                    >
                      Password
                    </label>
                    <Input control={control} name="password" />
                    {errors.password && (
                      <p className="text-red-600 font-medium mt-2">
                        {errors.password.message}
                      </p>
                    )}
                  </div>
                  <button
                    type="submit"
                    className="w-full text-white border-2 border-blue-600 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-all bg-blue-600 hover:bg-transparent "
                  >
                    Sign In
                  </button>
                  <p className="text-sm font-light  text-gray-400">
                    Don’t have an account yet?{" "}
                    <NavLink
                      to="/register"
                      className="font-medium text-primary-600 hover:underline text-primary-500"
                    >
                      Sign Up
                    </NavLink>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
