import React, { useCallback, useState } from 'react';
import { ProjectListItem } from './components';
import { useDeleteProject } from '../../api';
import { DeleteModal } from '../delete-modal';
import styles from './project-list.module.scss';
import type { ProjectWithOwnerDto } from '../../schemas';
import { useSortedProjects } from './hooks/use-sorted-list';
import { useProjectEditing } from './hooks';

type Props = {
  projects: ProjectWithOwnerDto[];
};

export const ProjectList: React.FC<Props> = React.memo(({ projects }) => {
  const [deletedId, setDeletedId] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const {
    editing,
    handleEditChange,
    handleEditSubmit,
    resetEditing,
    startEdit,
  } = useProjectEditing();

  const sortedProjects = useSortedProjects(projects);

  const showDeleteModal = useCallback(
    (id: number) => {
      setDeletedId(id);
      setIsModalOpen(true);
    },
    [setDeletedId, setIsModalOpen],
  );

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, [setIsModalOpen]);

  const deleteProjectMutation = useDeleteProject({
    closeModal: handleCloseModal,
  });

  const handleDeleteProject = useCallback(
    async (id: number) => {
      deleteProjectMutation.mutateAsync(id);
    },
    [deleteProjectMutation],
  );

  return (
    <>
      <DeleteModal
        id={deletedId}
        deleteAction={handleDeleteProject}
        cancelAction={handleCloseModal}
        isLoading={deleteProjectMutation.isPending}
        isModalOpen={isModalOpen}
      />
      <div className={styles['project-list']}>
        <table className={styles['project-list__table']}>
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Description</th>
              <th>Owner</th>
              <th>Project details</th>
              <th>Created</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {projects &&
              sortedProjects.map((project: ProjectWithOwnerDto, i) => (
                <ProjectListItem
                  key={project.id}
                  project={project}
                  index={i}
                  editing={editing}
                  startEdit={startEdit}
                  handleEditChange={handleEditChange}
                  handleEditSubmit={handleEditSubmit}
                  resetEditing={resetEditing}
                  showDeleteModal={showDeleteModal}
                />
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
});
