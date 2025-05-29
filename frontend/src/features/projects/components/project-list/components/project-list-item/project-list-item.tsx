import { memo } from 'react';
import { Link } from 'react-router';
import {
  type ProjectWithOwnerDto,
  type EditableProjectField,
  EDITABLE_PROJECT_FIELDS,
  ProjectFieldEditable,
} from '@/features/projects';
import { AiOutlineDelete } from '@/shared/components';
import { APP_ROUTES } from '@/shared/constants';
import { getFormattedDate } from '@/shared/utils';
import styles from './project-list-item.module.scss';

type Props = {
  project: ProjectWithOwnerDto;
  index: number;
  editing: {
    id: number | null;
    field: EditableProjectField | null;
    value: string;
  };
  startEdit: (
    project: ProjectWithOwnerDto,
    field: EditableProjectField,
  ) => void;
  handleEditChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleEditSubmit: (project: ProjectWithOwnerDto) => void;
  resetEditing: () => void;
  showDeleteModal: (id: number) => void;
};

export const ProjectListItem: React.FC<Props> = memo(
  ({
    project,
    index,
    editing,
    startEdit,
    handleEditChange,
    handleEditSubmit,
    resetEditing,
    showDeleteModal,
  }) => {
    const isEditingTitle =
      editing.id === project.id &&
      editing.field === EDITABLE_PROJECT_FIELDS.TITLE;
    const isEditingDescription =
      editing.id === project.id &&
      editing.field === EDITABLE_PROJECT_FIELDS.DESCRIPTION;

    return (
      <tr key={project.id}>
        <td>{index + 1}</td>
        <td>
          <ProjectFieldEditable
            value={isEditingTitle ? editing.value : project.title}
            isEditing={isEditingTitle}
            onStartEdit={() =>
              startEdit(project, EDITABLE_PROJECT_FIELDS.TITLE)
            }
            onChange={handleEditChange}
            onBlur={() => {
              if (isEditingTitle) handleEditSubmit(project);
            }}
            onKeyDown={e => {
              if (e.key === 'Enter' && isEditingTitle)
                handleEditSubmit(project);
              if (e.key === 'Escape') resetEditing();
            }}
            ariaLabel="Edit project title"
            placeholder="add title..."
          />
        </td>
        <td>
          <ProjectFieldEditable
            value={isEditingDescription ? editing.value : project.description}
            isEditing={isEditingDescription}
            onStartEdit={() =>
              startEdit(project, EDITABLE_PROJECT_FIELDS.DESCRIPTION)
            }
            onChange={handleEditChange}
            onBlur={() => {
              if (isEditingDescription) handleEditSubmit(project);
            }}
            onKeyDown={e => {
              if (e.key === 'Enter' && isEditingDescription)
                handleEditSubmit(project);
              if (e.key === 'Escape') resetEditing();
            }}
            ariaLabel="Edit project description"
            placeholder="add description..."
          />
        </td>
        <td>{project.owner?.name ?? '-'}</td>
        <td>
          <Link
            to={APP_ROUTES.PROJECT(project.id)}
            className={styles['project-list__link']}
            state={{ projectOwner: project.owner?.name }}
          >
            project details
          </Link>
        </td>
        <td>{getFormattedDate(project.createdAt)}</td>
        <td>
          <span className={styles['project-list__actions']}>
            <button
              className={styles['project-list__icon-btn']}
              onClick={() => showDeleteModal(project.id)}
              aria-label="Delete"
            >
              <AiOutlineDelete />
            </button>
          </span>
        </td>
      </tr>
    );
  },
);
