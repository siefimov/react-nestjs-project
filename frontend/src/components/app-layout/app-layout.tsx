import { Outlet } from 'react-router';
import styles from './app-layout.module.scss';

export const AppLayout = () => {
  return (
    <div className={styles['app-layout']}>
      <h1 className={styles['app-layout__title']}>
        Mini Project Management App
      </h1>
      <Outlet />
    </div>
  );
};
