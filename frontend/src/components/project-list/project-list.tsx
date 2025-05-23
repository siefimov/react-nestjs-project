import { useState } from 'react';
import { Link } from 'react-router';
import type { Project, EditableProjectField } from '../../types';
import { APP_ROUTES, EDITABLE_PROJECT_FIELDS } from '../../constants';
import { AiOutlineDelete, AiOutlineEdit } from '../icons';
import { getFormattedDate } from '../../utils';
import { useDeleteProject, useEditProject } from '../../api';
import { DeleteModal } from '../delete-modal';
import { ProjectFieldInlineEdit } from './project-filed-inline-edit';

type Props = {
  projects: Project[];
};

type EditingState = {
  id: number | null;
  field: EditableProjectField | null;
  value: string;
};

export const ProjectList: React.FC<Props> = ({ projects }) => {
  const [deletedId, setDeletedId] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editing, setEditing] = useState<EditingState>({
    id: null,
    field: null,
    value: '',
  });

  const showDeleteModal = (id: number) => {
    setDeletedId(id);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const deleteProjectMutation = useDeleteProject({
    closeModal: handleCloseModal,
  });
  const editProjectMutation = useEditProject();

  const handleDeleteProject = async (id: number) => {
    deleteProjectMutation.mutateAsync(id);
  };

  const handleEditClick = (
    project: Project,
    field: 'title' | 'description',
  ) => {
    setEditing({
      id: project.id,
      field,
      value: project[field] ?? '',
    });
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditing(prev => ({ ...prev, value: e.target.value }));
  };

  const handleEditSubmit = (project: Project) => {
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
  };

  return (
    <>
      <DeleteModal
        id={deletedId}
        deleteAction={handleDeleteProject}
        cancelAction={handleCloseModal}
        isLoading={deleteProjectMutation.isPending}
        isModalOpen={isModalOpen}
      />
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Description</th>
            <th>Owner</th>
            <th>Owner ID</th>
            <th>Project details</th>
            <th>Created</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {projects &&
            projects.map((project: Project, i) => (
              <tr key={project.id}>
                <td>{i + 1}</td>
                <td>
                  <ProjectFieldInlineEdit
                    value={project.title}
                    isEditing={
                      editing.id === project.id &&
                      editing.field === EDITABLE_PROJECT_FIELDS.TITLE
                    }
                    onStartEdit={() =>
                      handleEditClick(project, EDITABLE_PROJECT_FIELDS.TITLE)
                    }
                    onChange={handleEditChange}
                    onBlur={() => handleEditSubmit(project)}
                    onKeyDown={e => {
                      if (e.key === 'Enter') handleEditSubmit(project);
                      if (e.key === 'Escape')
                        setEditing({ id: null, field: null, value: '' });
                    }}
                    ariaLabel="Edit project title"
                    placeholder="add title..."
                  />
                </td>
                <td>
                  <ProjectFieldInlineEdit
                    value={project.description}
                    isEditing={
                      editing.id === project.id &&
                      editing.field === EDITABLE_PROJECT_FIELDS.DESCRIPTION
                    }
                    onStartEdit={() =>
                      handleEditClick(
                        project,
                        EDITABLE_PROJECT_FIELDS.DESCRIPTION,
                      )
                    }
                    onChange={handleEditChange}
                    onBlur={() => handleEditSubmit(project)}
                    onKeyDown={e => {
                      if (e.key === 'Enter') handleEditSubmit(project);
                      if (e.key === 'Escape')
                        setEditing({ id: null, field: null, value: '' });
                    }}
                    ariaLabel="Edit project description"
                    placeholder="add description..."
                  />
                </td>
                <td>{project.owner?.name ?? '-'}</td>
                <td>{project.owner?.id ?? '-'}</td>
                <td>
                  <Link to={APP_ROUTES.PROJECT(project.id)}>
                    project details
                  </Link>
                </td>
                <td>{getFormattedDate(project.createdAt)}</td>
                <td>
                  <Link to={APP_ROUTES.EDIT(project.id)}>
                    <AiOutlineEdit />
                  </Link>
                  <button onClick={() => showDeleteModal(project.id)}>
                    <AiOutlineDelete />
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
};
