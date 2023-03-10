import { Alert } from 'antd';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import style from './Profile.module.scss';
import { updateUser } from '../../store/user-slice';

function Profile() {
  const dispatch = useDispatch();
  const { username, email, error } = useSelector((state) => state.user);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
  });

  const onSubmit = (data) => {
    dispatch(updateUser(data));
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={style.form}
    >
      <p className={style.title}>Edit Profile</p>
      <label className={style.wrapper}>
        Username
        <input
          {...register('username', {
            required: 'Username field can\'t be blank',
          })}
          className={style.input}
          defaultValue={username}
          style={{ border: errors.username ? '1px solid red' : '' }}
        />
      </label>
      <div>
        {errors.username && <p className={style.error}>{errors.username.message || 'Some error'}</p>}
      </div>

      <label className={style.wrapper}>
        Email address
        <input
          {...register('email', {
            required: 'Email field can\'t be blank',
            pattern: {
              // eslint-disable-next-line no-useless-escape
              value: /^((([0-9A-Za-z]{1}[-0-9A-z\.]{1,}[0-9A-Za-z]{1})|([0-9А-Яа-я]{1}[-0-9А-я\.]{1,}[0-9А-Яа-я]{1}))@([-A-Za-z]{1,}\.){1,2}[-A-Za-z]{2,})$/u,
              message: 'Email is not valid',
            },
          })}
          className={style.input}
          defaultValue={email}
          style={{ border: errors.email ? '1px solid red' : '' }}
        />
      </label>
      <div>
        {errors.email && <p className={style.error}>{errors.email.message || 'Some error'}</p>}
      </div>

      <label className={style.wrapper}>
        New password
        <input
          {...register('password', {
            required: 'Password field can\'t be blank',
            minLength: {
              value: 6,
              message: 'Your password needs to be at least 6 characters.',
            },
            maxLength: {
              value: 40,
              message: 'Your password can\'t be more than 40 characters.',
            },
          })}
          className={style.input}
          placeholder="New password"
          style={{ border: errors.password ? '1px solid red' : '' }}
        />
      </label>
      <div>
        {errors.password && <p className={style.error}>{errors.password.message || 'Some error'}</p>}
      </div>

      <label className={style.wrapper}>
        Avatar image (url)
        <input
          {...register('image', {
            pattern: {
              value: /^((http|https|ftp):\/\/)?(([A-Z0-9][A-Z0-9_-]*)(\.[A-Z0-9][A-Z0-9_-]*)+)/i,
              message: 'Image URL is not valid',
            },
          })}
          className={style.input}
          placeholder="Avatar image (url)"
          style={{ border: errors.image ? '1px solid red' : '' }}
        />
      </label>
      <div>
        {errors.image && <p className={style.error}>{errors.image.message || 'Some error'}</p>}
      </div>

      <button
        className={style.button}
        type="submit"
      >
        Save
      </button>
      {error !== null && <Alert className="error" message={error} type="error" showIcon />}
    </form>
  );
}

export default Profile;
