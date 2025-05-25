import { useQuery } from '@tanstack/react-query';
import { UserSchema, type User } from '../../schemas';
import { http } from '../http';
import { userQueryKeys } from './user-query-key';

const getUsersFn = async () => {
  const data = await http.get<User[]>('/users');
  return UserSchema.array().parse(data);
};

export const useUsers = () => {
  return useQuery<User[]>({
    queryKey: userQueryKeys.all,
    queryFn: getUsersFn,
  });
};
