/* eslint-disable no-unused-vars */
import { Routes, Route, Link, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect, useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import style from './Profile.module.scss';
import { Button, Form, Input, message, Space, Title, Checkbox, Divider, Alert } from 'antd';
import { useForm } from "react-hook-form";
import { setUser, removeUser, postUser, updateUser } from '../../store/user-slice'

const Profile = () => {
  const dispatch = useDispatch();
  const { username, email, image, error } = useSelector((state) => state.user);
  // const { status, error } = useSelector((state) => state.user);
  console.log('error', error)

  const { 
    register, //для регистрации полей формы
    handleSubmit, // обёртка над нашим хэндлером отправки формы
    watch, // отслеживает изменения
    reset, //очистит поля ввода после отправки
    formState: { errors, isValid } // объект со всякими свойствами
   } = useForm({
    mode: "onChange"
   });

  const onSubmit = data => {
    // alert(JSON.stringify(data))
    // const {rep_password, ...clearData} = data
    dispatch(updateUser(data))
    // dispatch(postUser(JSON.stringify(clearData)))
    console.log(data)
    reset()
  };

  return(
    <>
    <form 
      onSubmit={handleSubmit(onSubmit)}
      className={style['form']}
      >
    <p className={style['title']}>Edit Profile</p>
    <label className={style['wrapper']}>
      Username
        <input
          {...register("username", {
            required: "Username field can't be blank"
          })}
          className={style['input']} 
          // placeholder={username}
          defaultValue={username}
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
          className={style['input']} 
          // placeholder={email}
          defaultValue={email}
          />
      </label>
      <div>
        {errors.email && <p className={style['error']}>{errors.email.message || "Some error"}</p>}
      </div>

      <label className={style['wrapper']}>
      New password
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
          className={style['input']} placeholder="New password"
        />
      </label>
      <div>
        {errors.password && <p className={style['error']}>{errors.password.message || "Some error"}</p>}
      </div>

      <label className={style['wrapper']}>
      Avatar image (url)
        <input
          {...register("avatar_image", {
            // required: "Password field can't be blank",
            pattern: {
              // eslint-disable-next-line no-useless-escape
              value: /^((http|https|ftp):\/\/)?(([A-Z0-9][A-Z0-9_-]*)(\.[A-Z0-9][A-Z0-9_-]*)+)/i,
              message: "Image URL is not valid"
            }
          })}
          className={style['input']} placeholder="Avatar image (url)"
        />
      </label>
      <div>
        {errors.avatar_image && <p className={style['error']}>{errors.avatar_image.message || "Some error"}</p>}
      </div>

      <button className={style['button']}
        type="submit"
        // disabled={!isValid}
        >
        Save
      </button>
      {error!==null && <Alert className={'error'} message={error} type="error" showIcon />}
      {/* {status === 'fullfiled' &&} */}
    </form>
  </>
  )
}

export default Profile