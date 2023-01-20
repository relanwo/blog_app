/* eslint-disable no-unused-vars */
import { Routes, Route, Link, Redirect } from 'react-router-dom';
import Post from '../post/post';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect, useMemo } from 'react';
import ReactMarkdown from 'react-markdown'
import style from './sign-in.module.scss';
import { Button, Form, Input, message, Space, Title } from 'antd';


function SignIn() {
	return (
    <Form 
      className={style['form']}
      layout="vertical">
      <p className={style['title']}>Sign In</p>
      <Form.Item className={style['wrapper']}
        name="email"
        label="Email address"
        rules={[{ required: false }, { type: 'url', warningOnly: true }, { type: 'string', min: 6 }]}
      >
        <Input className={style['input']} placeholder="Email address" />
      </Form.Item>
      <Form.Item className={style['wrapper']}
        name="password"
        label="Password"
        rules={[{ required: false }, { type: 'url', warningOnly: true }, { type: 'string', min: 6 }]}
      >
        <Input className={style['input']} placeholder="Password" />
      </Form.Item>
          <Button type="primary" htmlType="submit" className={style['button']}>
          Login
          </Button>
          <div className={style['underbutton-text']}>Don’t have an account? <Link href="/sign-up">Sign Up</Link>.</div>
    </Form>
  )
}

export default SignIn;