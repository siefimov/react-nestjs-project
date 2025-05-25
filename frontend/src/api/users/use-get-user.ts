import { useQuery } from '@tanstack/react-query';
import { userQueryKeys } from './user-query-key';
import { http } from '../http';
import { UserSchema, type User } from '../../schemas';

export const useUser = (id: number) => {
  const getUserFn = async () => {
    const response = await http.get<User>(`/users/${id}`);
    return UserSchema.parse(response);
  };

  return useQuery({
    queryKey: userQueryKeys.detail(Number(id)),
    queryFn: getUserFn,
  });
};
