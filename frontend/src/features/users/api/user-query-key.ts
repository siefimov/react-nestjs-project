export const userQueryKeys = {
  all: ['users'] as const,
  details: () => [...userQueryKeys.all, 'user'] as const,
  detail: (id: number) => [...userQueryKeys.details(), id] as const,
};
