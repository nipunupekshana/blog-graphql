import { useMutation } from "@apollo/client";
import { FaTrash } from "react-icons/fa";
import { DELETE_PROJECT } from "../mutations/ProjectMutations";
import { GET_PROJECTS } from "../queries/projectQuries";

export default function ProjectCard({ project }) {
  const [deleteProject, { loading }] = useMutation(DELETE_PROJECT, {
    variables: { id: project.id },
    update(cache, { data: { deleteProject } }) {
      const { projects } = cache.readQuery({ query: GET_PROJECTS });
      cache.writeQuery({
        query: GET_PROJECTS,
        data: {
          projects: projects.filter(
            (projectData) => projectData.id !== project.id
          ),
        },
      });
    },
  });
  return (
    <div className="col-md-4">
      <div className="card mb-3">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="card-title">{project.name}</h5>
            <a className="btn btn-light" href={`/projects/${project.id}`}>
              View
            </a>
          </div>
          <p className="small">
            Status: <strong>{project.status}</strong>
          </p>
          <div className="d-flex justify-content-end align-items-center">
            <button
              className="btn btn-danger btn-sm"
              disabled={loading}
              onClick={deleteProject}
            >
              <FaTrash />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
