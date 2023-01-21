/* eslint-disable no-useless-escape */
/* eslint-disable no-unused-vars */
import { Routes, Route, Link, Redirect } from 'react-router-dom';
import Post from '../Post/Post';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect, useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import style from './SignIn.module.scss';
import { Button, Form, Input, message, Space, Title } from 'antd';
import { useForm } from "react-hook-form";

function SignIn() {
  // const { register, handleSubmit } = useForm();
  const { 
    register, //для регистрации полей формы
    handleSubmit, // обёртка над нашим хэндлером отправки формы
    watch, 
    reset, //очистит поля ввода после отправки
    formState: { errors, isValid } // объект со всякими свойствами
   } = useForm({
    mode: "onChange"
   });

  const onSubmit = data => {
    alert(JSON.stringify(data))
    reset()
  };

	return (
    <>
      <form 
        onSubmit={handleSubmit(onSubmit)}
        className={style['form']}
      >
      <p className={style['title']}>Sign In</p>
        <label className={style['wrapper']}>
          Email address
          <input
            {...register("email", {
              required: "Email field can't be blank",
              pattern: {
                value: /^((([0-9A-Za-z]{1}[-0-9A-z\.]{1,}[0-9A-Za-z]{1})|([0-9А-Яа-я]{1}[-0-9А-я\.]{1,}[0-9А-Яа-я]{1}))@([-A-Za-z]{1,}\.){1,2}[-A-Za-z]{2,})$/u,
                message: "Email is not valid"
              }
            })}
            className={style[`${errors ? 'input-error': 'input'}`]} placeholder="Email address"
          />
        </label>
        <div>
          {errors.email && <p className={style['error']}>{errors.email.message || "Some error"}</p>}
        </div>

        <label className={style['wrapper']}>
          Password
          <input
            {...register("password", {
              required: "Password field can't be blank"
            })}
            className={style[`${errors ? 'input-error': 'input'}`]} placeholder="Password"
          />
        </label>
        <div>
          {errors.password && <p className={style['error']}>{errors.password.message}</p>}
        </div>

        <button className={style['button']}
          type="submit"
          // disabled={!isValid}
        >Login</button>
        <div className={style['underbutton-text']}>
          Don’t have an account? <Link className={style['link']} to="/sign-up">Sign Up</Link>.
        </div>
      </form>
    </>
		// <Form 
    //   onSubmit={handleSubmit(onSubmit)}
    //   className={style['form']} layout="vertical">
		// 	<p className={style['title']}>Sign In</p>
		// 	<Form.Item
    //     {...register("email")}
    //     //, { required: true }
		// 		className={style['wrapper']}
		// 		name="Email"
		// 		label="Email address"
		// 		rules={[
		// 			// { required: true },
		// 			// { type: 'url', warningOnly: true },
		// 			{ type: 'string' },
		// 		]}
		// 	>
		// 		<Input className={style['input']} placeholder="Email address" />
		// 	</Form.Item>
		// 	<Form.Item
    //     {...register("password", { required: true })}
		// 		className={style['wrapper']}
		// 		name="Password"
		// 		label="Password"
		// 		rules={[
		// 			// { required: true },
		// 			// { type: 'url', warningOnly: true },
		// 			{ type: 'string', min: 6, max: 40 },
		// 		]}
		// 	>
		// 		<Input className={style['input']} placeholder="Password" />
		// 	</Form.Item>
		// 	<Button type="primary" htmlType="submit" className={style['button']}
    //     // onSubmit={handleSubmit((data) => console.log(JSON.stringify(data)))}
    //     >
		// 		Login
		// 	</Button>
		// 	<div className={style['underbutton-text']}>
		// 		Don’t have an account? <Link to="/sign-up">Sign Up</Link>.
		// 	</div>
		// </Form>
	);
}

export default SignIn;
