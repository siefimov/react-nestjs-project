import { RoutingProvider } from './routing-provider';
import { ReactQueryProvider } from './react-query-provider';
import { ToastContainer } from 'react-toastify';

export const AppProvider = () => {
  return (
    <ReactQueryProvider>
      <RoutingProvider />
      <ToastContainer position="top-right" autoClose={3000} />
    </ReactQueryProvider>
  );
};
