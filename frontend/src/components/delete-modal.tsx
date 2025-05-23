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
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0,0,0,0.3)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
      }}
    >
      <div
        style={{
          background: '#fff',
          padding: '2rem',
          borderRadius: '8px',
          minWidth: '300px',
          textAlign: 'center',
        }}
      >
        <h3>Delete Project</h3>
        <p>
          Are you sure you want to delete project with id <b>{id}</b>?
        </p>
        <div style={{ marginTop: '1rem' }}>
          <button
            onClick={cancelAction}
            disabled={isLoading}
            style={{ marginRight: '1rem' }}
          >
            Cancel
          </button>
          <button
            onClick={() => deleteAction(id)}
            disabled={isLoading}
            style={{ background: 'red', color: '#fff' }}
          >
            {isLoading ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
};
