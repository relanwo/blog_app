/* eslint-disable no-unused-vars */
import { Routes, Route, Link, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect, useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import style from './sign-up.module.scss';
import { Button, Form, Input, message, Space, Title, Checkbox, Divider } from 'antd';

function SignIn() {
	return (
		<Form className={style['form']} layout="vertical">
			<p className={style['title']}>Create new account</p>
			<Form.Item
				className={style['wrapper']}
				name="username"
				label="Username"
				rules={[
					{ required: false },
					{ type: 'url', warningOnly: true },
					{ type: 'string', min: 6 },
				]}
			>
				<Input className={style['input']} placeholder="Username" />
			</Form.Item>
			<Form.Item
				className={style['wrapper']}
				name="email"
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
				className={style['wrapper']}
				name="password"
				label="Password"
				rules={[
					{ required: false },
					{ type: 'url', warningOnly: true },
					{ type: 'string', min: 6 },
				]}
			>
				<Input className={style['input']} placeholder="Password" />
			</Form.Item>
			<Form.Item
				className={style['wrapper']}
				name="repaet password"
				label="Repeat Password"
				rules={[
					{ required: false },
					{ type: 'url', warningOnly: true },
					{ type: 'string', min: 6 },
				]}
			>
				<Input className={style['input']} placeholder="Password" />
			</Form.Item>
      <Divider className={style['divider']}/>
			<Checkbox className={style['checkbox']} defaultChecked>
				I agree to the processing of my personal information
			</Checkbox>
			<Button type="primary" htmlType="submit" className={style['button']}>
				Create
			</Button>
			<div className={style['underbutton-text']}>
				Already have an account? <Link href="/sign-in">Sign In</Link>.
			</div>
		</Form>
	);
}

export default SignIn;
