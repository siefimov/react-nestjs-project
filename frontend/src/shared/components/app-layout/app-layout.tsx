import { Outlet } from 'react-router';
import { useAuthInit } from '@/features';
import { Header } from '@/shared/components';
import styles from './app-layout.module.scss';

export const AppLayout = () => {
  useAuthInit();

  return (
    <div className={styles['app-layout']}>
      <Header />
      <Outlet />
    </div>
  );
};
