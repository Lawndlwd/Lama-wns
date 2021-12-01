/* eslint-disable no-buffer-constructor */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable no-console */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useContext, useRef } from "react";
import { useForm } from "react-hook-form";
import { Redirect } from "react-router-dom";
import { Input } from "../components/Input";
import { useRegisterMutation } from "../graphql/generated/graphql";
import userContext from "../store/userContext";
import { decode } from "../utils/decodeJWT";

type FormValues = {
  name: string;
  email: string;
  password: string;
  password_repeat: string;
};

export const Register = (): JSX.Element => {
  // const [user, userSet] = useGlobalValue();
  const { user, updateUser } = useContext(userContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormValues>({ mode: "onTouched" });

  const password = useRef({});
  password.current = watch("password", "");

  const [registerUser] = useRegisterMutation();

  const onSubmit = handleSubmit(async (data) => {
    console.log(errors, data);
    try {
      const respondeRegister = await registerUser({
        variables: {
          data: {
            name: data.name,
            email: data.email,
            password: data.password,
          },
        },
      });
      const { user: resUser } = decode(
        respondeRegister.data?.Register.accessToken as string
      );

      const { name, email, _id } = resUser;
      updateUser({
        accessToken: respondeRegister.data?.Register.accessToken as string,
        email,
        name,
        _id,
      });
      localStorage.setItem(
        "user",
        JSON.stringify({
          accessToken: respondeRegister.data?.Register.accessToken as string,
          email,
          name,
          _id,
        })
      );
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <div className="w-11/12 mx-auto max-w-xs mt-5">
      {" "}
      {user && user.accessToken && <Redirect to="/" />}
      <form
        onSubmit={onSubmit}
        className="mx-auto flex flex-col justify-center items-center bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className=" w-auto">
          <Input
            label="Name"
            placeHolder="Jane"
            inputName="name"
            type="text"
            error={errors.name}
            register={register("name", {
              required: "Name is required",
            })}
          />
          <Input
            label="E-mail"
            inputName="email"
            placeHolder="Jane@mail.com"
            type="email"
            error={errors.email}
            register={register("email", {
              required: "email is required",
              pattern: {
                value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                message: "invalid email address",
              },
            })}
          />
          <Input
            label="Password"
            inputName="password"
            placeHolder="********"
            type="password"
            error={errors.password}
            register={register("password", {
              required: "password is required",
              minLength: 8,
              maxLength: 32,
              pattern: {
                value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
                message: "invalid password",
              },
            })}
          />
          <Input
            label="Repeat password"
            placeHolder="********"
            type="password"
            error={errors.password_repeat}
            inputName="password_repeat"
            register={register("password_repeat", {
              validate: (value) =>
                value === password.current || "The passwords do not match",
            })}
          />
          <div className="w-full mx-auto mt-5">
            <button className="btn btn-primary" type="submit">
              submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
