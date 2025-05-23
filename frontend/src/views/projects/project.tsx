import { useProject } from "../../api";

export const Project = () => {
  const project = useProject();
  console.log(project);

  if (!project.data) {
    return <div>Loading...</div>;
  }

  const { data: projectData } = project;
  const getFormattedDate = (date: string) => {
    return date.split("T")[0].split("-").reverse().join(".");
  };

  return (
    <div>
      <p> {projectData.id} </p>
      <p> {projectData.title} </p>
      <p> {projectData.description} </p>
      <p> {getFormattedDate(projectData.createdAt)} </p>
    </div>
  );
};
