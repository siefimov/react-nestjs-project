export const projectQueryKeys = {
  all: ["projects"] as const,
  details: () => [...projectQueryKeys.all, "detail"] as const,
  detail: (id: number) => [...projectQueryKeys.details(), id] as const,
};
