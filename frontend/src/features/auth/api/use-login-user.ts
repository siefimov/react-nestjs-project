import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { API_ROUTES, APP_ROUTES } from '@/shared/constants';
import { http } from '@/shared/lib/api';
import { authQueryKeys } from './auth-query-keys';
import {
  AuthResponseSchema,
  type AuthResponseDto,
  type AuthLoginDto,
  useAuthStore,
} from '@/features/auth';

const loginUserFn = async (data: AuthLoginDto): Promise<AuthResponseDto> => {
  const response = await http.post<AuthResponseDto>(API_ROUTES.LOGIN, data);
  return AuthResponseSchema.parse(response);
};

export const useLoginUser = (reset: () => void) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const setUser = useAuthStore(state => state.setUser);

  return useMutation({
    mutationFn: loginUserFn,
    onSuccess: data => {
      localStorage.setItem('token', data.access_token);

      setUser(data.user);

      queryClient.invalidateQueries({ queryKey: authQueryKeys.all });

      if (reset) {
        reset();
      }

      toast.success('Login successful!');

      navigate(APP_ROUTES.PROJECTS);
    },
    onError: () => {
      toast.error('Login failed!');
    },
  });
};
