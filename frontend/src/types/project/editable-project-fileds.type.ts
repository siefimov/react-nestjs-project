import type { EDITABLE_PROJECT_FIELDS } from '../../constants';

export type EditableProjectField =
  (typeof EDITABLE_PROJECT_FIELDS)[keyof typeof EDITABLE_PROJECT_FIELDS];
