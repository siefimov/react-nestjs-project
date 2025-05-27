import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { API_ROUTES, APP_ROUTES } from '../../constants';
import {
  type AuthRegisterDto,
  type AuthResponseDto,
  AuthResponseSchema,
} from '../../schemas';
import { http } from '../http';
import { authQueryKeys } from './auth-query-keys';
import { useAuthStore } from '../../store/auth-store';

const registerUserFn = async (
  newUser: AuthRegisterDto,
): Promise<AuthResponseDto> => {
  const response = await http.post<AuthResponseDto>(
    API_ROUTES.REGISTER,
    newUser,
  );
  return AuthResponseSchema.parse(response);
};

export const useRegisterUser = (reset: () => void) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const setUser = useAuthStore(state => state.setUser);

  return useMutation({
    mutationFn: registerUserFn,
    onSuccess: data => {
      localStorage.setItem('token', data.access_token);

      setUser(data.user);

      queryClient.invalidateQueries({ queryKey: authQueryKeys.all });

      if (reset) {
        reset();
      }
      toast.success('Registration successful!');

      navigate(APP_ROUTES.PROJECTS);
    },
    onError: () => {
      toast.error('Registration failed!');
    },
  });
};
