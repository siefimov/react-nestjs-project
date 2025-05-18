import { RoutingProvider } from "./routing-provider";
import { ReactQueryProvider } from "./react-query-provider";

export const AppProvider = () => {
  return (
    <ReactQueryProvider>
      <RoutingProvider />
    </ReactQueryProvider>
  );
};
