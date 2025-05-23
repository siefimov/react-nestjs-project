import styles from './delete-modal.module.scss';

type Props = {
  id: number;
  isModalOpen: boolean;
  isLoading: boolean;
  cancelAction: () => void;
  deleteAction: (id: number) => Promise<void>;
};

export const DeleteModal: React.FC<Props> = ({
  id,
  isLoading,
  isModalOpen,
  cancelAction,
  deleteAction,
}) => {
  if (!isModalOpen) return null;

  return (
    <div className={styles['delete-modal__backdrop']}>
      <div className={styles['delete-modal__content']}>
        <h3 className={styles['delete-modal__title']}>Delete Project</h3>
        <p>
          Are you sure you want to delete project with id <b>{id}</b>?
        </p>
        <div className={styles['delete-modal__actions']}>
          <button
            onClick={cancelAction}
            disabled={isLoading}
            className={styles['delete-modal__cancel']}
          >
            Cancel
          </button>
          <button
            onClick={() => deleteAction(id)}
            disabled={isLoading}
            className={styles['delete-modal__delete']}
          >
            {isLoading ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
};
