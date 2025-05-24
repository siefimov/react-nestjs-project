// hooks/useProjectEditing.ts
import { useState, useCallback } from 'react';
import type { EditableProjectField } from '../../../types';
import type { ProjectWithOwner } from '../../../schemas';
import { useEditProject } from '../../../api';

type EditingState = {
  id: number | null;
  field: EditableProjectField | null;
  value: string;
};

type UseProjectEditingResult = {
  editing: EditingState;
  startEdit: (project: ProjectWithOwner, field: EditableProjectField) => void;
  handleEditChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleEditSubmit: (project: ProjectWithOwner) => void;
  resetEditing: () => void;
};

export const useProjectEditing = (): UseProjectEditingResult => {
  const [editing, setEditing] = useState<EditingState>({
    id: null,
    field: null,
    value: '',
  });
  const editProjectMutation = useEditProject();

  const startEdit = useCallback(
    (project: ProjectWithOwner, field: EditableProjectField) => {
      setEditing({ id: project.id, field, value: project[field] ?? '' });
    },
    [setEditing],
  );

  const handleEditChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setEditing(prev => ({ ...prev, value: e.target.value }));
    },
    [setEditing],
  );

  const handleEditSubmit = useCallback(
    (project: ProjectWithOwner) => {
      if (
        editing.id === project.id &&
        editing.field &&
        editing.value.trim() !== project[editing.field]
      ) {
        editProjectMutation.mutate({
          id: project.id,
          [editing.field]: editing.value,
        });
      }
      setEditing({ id: null, field: null, value: '' });
    },
    [editing, editProjectMutation, setEditing],
  );

  const resetEditing = useCallback(() => {
    setEditing({ id: null, field: null, value: '' });
  }, [setEditing]);

  return {
    editing,
    startEdit,
    handleEditChange,
    handleEditSubmit,
    resetEditing,
  };
};
