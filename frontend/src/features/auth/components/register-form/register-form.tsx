import { Link } from 'react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  useRegisterUser,
  AuthRegisterSchema,
  type AuthRegisterDto,
} from '@/features/auth';
import { APP_ROUTES } from '@/shared/constants';
import styles from './register-form.module.scss';

export const RegisterForm: React.FC = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthRegisterDto>({
    resolver: zodResolver(AuthRegisterSchema),
  });
  const { mutate, isPending, error } = useRegisterUser(reset);

  const onSubmit = (data: AuthRegisterDto) => mutate(data);

  return (
    <div className={styles['register-wrapper']}>
      <form
        className={styles['register-form']}
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className={styles['register-form__title']}>Register</h2>
        <div className={styles['register-form__field']}>
          <input
            {...register('name')}
            placeholder="Name"
            className={styles['register-form__input']}
            autoFocus
          />
          {errors.name && (
            <div className={styles['register-form__error']}>
              {errors.name.message}
            </div>
          )}
        </div>
        <div className={styles['register-form__field']}>
          <input
            {...register('email')}
            type="email"
            placeholder="Email"
            className={styles['register-form__input']}
          />
          {errors.email && (
            <div className={styles['register-form__error']}>
              {errors.email.message}
            </div>
          )}
        </div>
        <div className={styles['register-form__field']}>
          <input
            {...register('password')}
            type="password"
            placeholder="Password"
            className={styles['register-form__input']}
          />
          {errors.password && (
            <div className={styles['register-form__error']}>
              {errors.password.message}
            </div>
          )}
        </div>
        <button
          type="submit"
          className={styles['register-form__button']}
          disabled={isPending}
        >
          Register
        </button>
        {error && (
          <div className={styles['register-form__error']}>{error.message}</div>
        )}
        <div className={styles['register-form__footer']}>
          <span>Already have an account?</span>
          <Link to={APP_ROUTES.LOGIN} className={styles['register-form__link']}>
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};
