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
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);

	return (
		<Form 
      onSubmit={handleSubmit(onSubmit)}
      className={style['form']} layout="vertical">
			<p className={style['title']}>Sign In</p>
			<Form.Item
        {...register("email", { required: true })}
				className={style['wrapper']}
				name="Email"
				label="Email address"
				rules={[
					{ required: false },
					{ type: 'url', warningOnly: true },
					{ type: 'string', min: 6 },
				]}
			>
				<Input className={style['input']} placeholder="Email address" />
			</Form.Item>
			<Form.Item
        {...register("password", { required: true })}
				className={style['wrapper']}
				name="Password"
				label="Password"
				rules={[
					{ required: false },
					{ type: 'url', warningOnly: true },
					{ type: 'string', min: 6 },
				]}
			>
				<Input className={style['input']} placeholder="Password" />
			</Form.Item>
			<Button type="primary" htmlType="submit" className={style['button']}
        // onSubmit={handleSubmit((data) => console.log(JSON.stringify(data)))}
        >
				Login
			</Button>
			<div className={style['underbutton-text']}>
				Don’t have an account? <Link to="/sign-up">Sign Up</Link>.
			</div>
		</Form>
	);
}

export default SignIn;
