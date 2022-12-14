import Spinner from "./Spinner";
import { useQuery } from "@apollo/client";
import { GET_PROJECTS } from "../queries/projectQuries";
import ProjectCard from "./ProjectCard";

export default function Projects() {
  const { loading, error, data } = useQuery(GET_PROJECTS);
  console.log(`error`, error);
  if (loading) return <Spinner />;
  if (error) return <div>Error</div>;
  else
    return (
      <>
        <div className="row mt-4">
          {data.projects.length > 0 ? (
            data.projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))
          ) : (
            <div>No projects</div>
          )}
        </div >
      </>
    );
}
