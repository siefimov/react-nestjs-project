import { Outlet } from 'react-router';
import { useAuthInit } from '../../api';
import styles from './app-layout.module.scss';
import { Header } from '../header';

export const AppLayout = () => {
  useAuthInit();

  return (
    <div className={styles['app-layout']}>
      <Header />
      <Outlet />
    </div>
  );
};
