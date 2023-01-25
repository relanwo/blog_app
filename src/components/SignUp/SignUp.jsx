/* eslint-disable no-unused-vars */
import { Routes, Route, Link, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect, useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import style from './SignUp.module.scss';
import { Button, Form, Input, message, Space, Title, Checkbox, Divider, Alert } from 'antd';
import { useForm } from "react-hook-form";
import { setUser, removeUser, postUser } from '../../store/user-slice'

function SignUp() {
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.user);

  const { 
    register, //для регистрации полей формы
    handleSubmit, // обёртка над нашим хэндлером отправки формы
    watch, // отслеживает изменения
    reset, //очистит поля ввода после отправки
    formState: { errors, isValid } // объект со всякими свойствами
   } = useForm({
    mode: "onChange",
    defaultValues: { checkbox: true }
   });

  const onSubmit = data => {
    // alert(JSON.stringify(data))
    const {rep_password, ...clearData} = data
    dispatch(postUser(clearData))
    // dispatch(postUser(JSON.stringify(clearData)))
    reset()
  };

  // console.log(watch('password') === watch('rep_password'))

	return (
    <>
      <form 
        onSubmit={handleSubmit(onSubmit)}
        className={style['form']}
      >
      <p className={style['title']}>Create new account</p>
      <label className={style['wrapper']}>
        Username
          <input
            {...register("username", {
              required: "Username field can't be blank",
              minLength: {
                value: 3,
                message: "Your username needs to be at least 3 characters."
              },
              maxLength: {
                value: 20,
                message: "Your username can't be more than 20 characters."
              }
            })}
            className={style['input']} placeholder="Username"
            style={{border: errors.username ? '1px solid red' : '' }}
          />
        </label>
        <div>
          {errors.username && <p className={style['error']}>{errors.username.message || "Some error"}</p>}
        </div>

        <label className={style['wrapper']}>
          Email address
          <input
            {...register("email", {
              required: "Email field can't be blank",
              pattern: {
                // eslint-disable-next-line no-useless-escape
                value: /^((([0-9A-Za-z]{1}[-0-9A-z\.]{1,}[0-9A-Za-z]{1})|([0-9А-Яа-я]{1}[-0-9А-я\.]{1,}[0-9А-Яа-я]{1}))@([-A-Za-z]{1,}\.){1,2}[-A-Za-z]{2,})$/u,
                message: "Email is not valid"
              }
            })}
            className={style['input']} placeholder="Email address"
            style={{border: errors.email ? '1px solid red' : '' }}
          />
        </label>
        <div>
          {errors.email && <p className={style['error']}>{errors.email.message || "Some error"}</p>}
        </div>

        <label className={style['wrapper']}>
          Password
          <input
            {...register("password", {
              required: "Password field can't be blank",
              minLength: {
                value: 6,
                message: "Your password needs to be at least 6 characters."
              },
              maxLength: {
                value: 40,
                message: "Your password can't be more than 40 characters."
              }
            })}
            className={style['input']} placeholder="Password"
            style={{border: errors.password ? '1px solid red' : '' }}
          />
        </label>
        <div>
          {errors.password && <p className={style['error']}>{errors.password.message || "Some error"}</p>}
        </div>

        <label className={style['wrapper']}>
          Repeat Password
          <input
            {...register("rep_password", {
              required: "Password field can't be blank",
            })}
            className={style['input']} placeholder="Password"
            style={{border: watch('password') !== watch('rep_password') ? '1px solid red' : '' }}
          />
        </label>
        <div>
          {watch('password') !== watch('rep_password') && <p className={style['error']}>Passwords must match</p>}
        </div>

        <Divider className={style['divider']}/>

        <label
          // for='check'
          className={style['checkbox']} 
          {...register("checkbox", {
            // required: "Password field can't be blank",
          })}
        >
          <input type="checkbox" 
          // id="check"
          // defaultChecked 
          />
          I agree to the processing of my personal information
        </label>

        <button className={style['button']}
          type="submit"
          // disabled={!isValid}
        >
          Create
        </button>

        <div className={style['underbutton-text']}>
		 		  Already have an account? <Link className={style['link']} to="/sign-in">Sign In</Link>.
		 	  </div>

      {error!==null && <Alert className={'error'} message={error} type="error" showIcon />}

      </form>
    </>
	);
}

export default SignUp;
