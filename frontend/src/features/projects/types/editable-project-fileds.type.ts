import type { EDITABLE_PROJECT_FIELDS } from '@/features/projects';

export type EditableProjectField =
  (typeof EDITABLE_PROJECT_FIELDS)[keyof typeof EDITABLE_PROJECT_FIELDS];
