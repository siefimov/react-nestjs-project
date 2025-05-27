import { useQuery } from '@tanstack/react-query';
import { UserSchema, type User } from '../../schemas';
import { http } from '../http';
import { userQueryKeys } from './user-query-key';
import { API_ROUTES } from '../../constants';

const getUsersFn = async () => {
  const data = await http.get<User[]>(API_ROUTES.USERS, { withAuth: true });
  return UserSchema.array().parse(data);
};

export const useUsers = () => {
  return useQuery<User[]>({
    queryKey: userQueryKeys.all,
    queryFn: getUsersFn,
  });
};
