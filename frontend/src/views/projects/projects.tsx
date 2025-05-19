import { Link } from 'react-router';
import { useProjects } from '../../api';
import { ProjectList } from '../../components';
import { APP_ROUTES } from '../../constants';

export const Projects = () => {
  const projects = useProjects();

  return (
    <div>
      <div>
        <h2>List of Projects</h2>
        <Link to={APP_ROUTES.CREATE}>+ New</Link>
      </div>
      {projects.isSuccess && (
        <div>
          <ProjectList projects={projects.data} />
        </div>
      )}
    </div>
  );
};
