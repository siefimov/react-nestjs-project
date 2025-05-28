import { Link } from 'react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLoginUser } from '../../api/auth/use-login-user';
import { AuthLoginSchema, type AuthLoginDto } from '../../schemas';
import { APP_ROUTES } from '../../constants';
import styles from './login-form.module.scss';

export const LoginForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AuthLoginDto>({
    resolver: zodResolver(AuthLoginSchema),
  });
  const { mutate, isPending, error } = useLoginUser(reset);

  const onSubmit = (data: AuthLoginDto) => mutate(data);

  return (
   <div className={styles['login-wrapper']}>
      <form className={styles['login-form']} onSubmit={handleSubmit(onSubmit)}>
        <h2 className={styles['login-form__title']}>Login</h2>
        <div className={styles['login-form__field']}>
          <input
            {...register('email')}
            type="email"
            placeholder="Email"
            className={styles['login-form__input']}
            autoFocus
          />
          {errors.email && (
            <div className={styles['login-form__error']}>
              {errors.email.message}
            </div>
          )}
        </div>
        <div className={styles['login-form__field']}>
          <input
            {...register('password')}
            type="password"
            placeholder="Password"
            className={styles['login-form__input']}
          />
          {errors.password && (
            <div className={styles['login-form__error']}>
              {errors.password.message}
            </div>
          )}
        </div>
        <button
          type="submit"
          className={styles['login-form__button']}
          disabled={isPending}
        >
          Login
        </button>
        {error && (
          <div className={styles['login-form__error']}>{error.message}</div>
        )}
        <div className={styles['login-form__footer']}>
          <span>Don't have an account?</span>
          <Link to={APP_ROUTES.REGISTER} className={styles['login-form__link']}>
            Register
          </Link>
        </div>
      </form>
   </div>
  );
};
