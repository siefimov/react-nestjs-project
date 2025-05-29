import { useNavigate } from 'react-router';
import { APP_ROUTES } from '@/shared/constants';
import { useAuthStore } from '@/features';
import styles from './header.module.scss';

export const Header: React.FC = () => {
  const { user, logout } = useAuthStore(state => state);
  const navigte = useNavigate();

  const handleLogout = () => {
    logout();
    navigte(APP_ROUTES.LOGIN);
  };

  return (
    <header className={styles['header']}>
      <h1 className={styles['header__title']}>Mini Project Management App</h1>
      {user && (
        <div className={styles['header__user-block']}>
          <span className={styles['header__name']}>Welcome, {user.name}!</span>
          <button className={styles['header__logout']} onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
    </header>
  );
};
