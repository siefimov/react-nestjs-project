import { Link } from 'react-router';
import type { Project } from '../../types';
import { APP_ROUTES } from '../../constants';
import { AiOutlineDelete, AiOutlineEdit } from '../icons';
import { getFormattedDate } from '../../utils';
import { useDeleteProject } from '../../api';
import { useState } from 'react';
import { DeleteModal } from '../delete-modal';

type Props = {
  projects: Project[];
};

export const ProjectList: React.FC<Props> = ({ projects }) => {
  const [deletedId, setDeletedId] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const showDeleteModal = (id: number) => {
    setDeletedId(id);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const deleteMutation = useDeleteProject({ closeModal: handleCloseModal });

  const handleDeleteProject = async (id: number) => {
    deleteMutation.mutateAsync(id);
  };

  return (
    <>
      <DeleteModal
        id={deletedId}
        deleteAction={handleDeleteProject}
        cancelAction={handleCloseModal}
        isLoading={deleteMutation.isPending}
        isModalOpen={isModalOpen}
      />
      <table>
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
            projects.map((project: Project, i) => (
              <tr key={project.id}>
                <td>{i + 1}</td>
                <td>{project.title}</td>
                <td>{project.description}</td>
                <td>{project.owner.name}</td>
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
