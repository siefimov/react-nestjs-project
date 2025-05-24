import { useMemo } from 'react';
import type { ProjectWithOwner } from '../../../schemas';

export function useSortedProjects(projects: ProjectWithOwner[]) {
  return useMemo(() => {
    return projects
      .slice()
      .sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      );
  }, [projects]);
}
