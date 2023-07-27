import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { apiSignUp } from "../../apis/userAPI";
import Error from "../../components/Error/Error";
import Input from "../../components/Input/Input";

// Định nghĩa các xác thực cho từng input
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
  name: yup.string().required("Name is required !!!"),
  phoneNumber: yup
    .string()
    .matches(
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
      "Phone number must be number !!!"
    )
    .required("Phone number is required !!!"),
});

export default function Register() {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      name: "",
      phoneNumber: "",
    },
    mode: "onTouched",
    resolver: yupResolver(schema),
  });

  const onSubmit = async (values) => {
    try {
      const data = await apiSignUp(values);
      if (data) {
        navigate("/login");
        return data.content;
      }
    } catch (error) {
      setError(error?.response?.data?.message);
    }
  };

  const onError = (errors) => {
    console.log(errors);
  };

  return (
    <section className="bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight  md:text-2xl text-white">
              Register new account
            </h1>
            {error && <Error error={error} />}
            <form
              onSubmit={handleSubmit(onSubmit, onError)}
              className="space-y-4 md:space-y-6"
            >
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-white"
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
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium  text-white"
                >
                  Name
                </label>
                <Input control={control} name="name" />
                {errors.name && (
                  <p className="text-red-600 font-medium mt-2">
                    {errors.name.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="phoneNumber"
                  className="block mb-2 text-sm font-medium  text-white"
                >
                  Phone Number
                </label>
                <Input control={control} name="phoneNumber" />
                {errors.phoneNumber && (
                  <p className="text-red-600 font-medium mt-2">
                    {errors.phoneNumber.message}
                  </p>
                )}
              </div>
              <button
                type="submit"
                className="w-full text-white border-2 border-blue-600 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-all bg-blue-600 hover:bg-transparent "
              >
                Sign Up
              </button>
              <p className="text-sm font-light  text-gray-400">
                Already have an account ?{" "}
                <NavLink
                  to="/login"
                  className="font-medium text-primary-600 hover:underline text-primary-500"
                >
                  Sign In
                </NavLink>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
