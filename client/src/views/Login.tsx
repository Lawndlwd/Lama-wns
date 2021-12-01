/* eslint-disable no-buffer-constructor */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable no-console */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { Redirect } from "react-router-dom";
import { Input } from "../components/Input";
import { useLoginMutation } from "../graphql/generated/graphql";
import userContext from "../store/userContext";
import { decode } from "../utils/decodeJWT";

type FormValues = {
  name: string;
  email: string;
  password: string;
  password_repeat: string;
};

export type ClassParams = {
  redirect: string;
};

export const Login = (): JSX.Element => {
  const { user, updateUser } = useContext(userContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ mode: "onTouched" });

  const [loginUser] = useLoginMutation();

  const onSubmit = handleSubmit(async (data) => {
    try {
      const respondeLogin = await loginUser({
        variables: {
          data: {
            email: data.email,
            password: data.password,
          },
        },
      });
      const { user: resUser } = decode(
        respondeLogin.data?.Login.accessToken as string
      );

      const { name, email, _id } = resUser;
      updateUser({
        accessToken: respondeLogin.data?.Login.accessToken as string,
        email,
        name,
        _id,
      });
      localStorage.setItem(
        "user",
        JSON.stringify({
          accessToken: respondeLogin.data?.Login.accessToken as string,
          email,
          name,
          _id,
        })
      );
      console.log(resUser);
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <div className="w-11/12 max-w-xs mx-auto mt-5">
      {user && user.accessToken && <Redirect to="/" />}
      <form
        onSubmit={onSubmit}
        className="mx-auto flex flex-col justify-center items-center bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
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
        <button type="submit" className="btn btn-primary">
          submit
        </button>
      </form>
    </div>
  );
};
