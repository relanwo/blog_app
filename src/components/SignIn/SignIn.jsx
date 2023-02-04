import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import style from './SignIn.module.scss';
import {  Alert } from 'antd';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import {loginUser} from '../../store/user-slice'

function SignIn() {
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.user);

  const navigate = useNavigate();

  const { 
    register, 
    handleSubmit,
    formState: { errors }
   } = useForm({
    mode: "onChange"
   });

  const onSubmit = async (data) => {
    await dispatch(loginUser(data)).then(() => {
      navigate(`/articles`)
    });
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
              required: "Password field can't be blank"
            })}
            className={style['input']} placeholder="Password"
            style={{border: errors.password ? '1px solid red' : '' }}
          />
        </label>
        <div>
          {errors.password && <p className={style['error']}>{errors.password.message}</p>}
        </div>

        <button className={style['button']}
          type="submit"
        >Login</button>
        <div className={style['underbutton-text']}>
          Don’t have an account? <Link className={style['link']} to="/sign-up">Sign Up</Link>.
        </div>

      {error!==null && <Alert className={'error'} message={error} type="error" showIcon />}

      </form>
    </>
	);
}

export default SignIn;
