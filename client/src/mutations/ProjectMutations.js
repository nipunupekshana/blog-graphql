
import { gql } from "@apollo/client";

const DELETE_PROJECT = gql`
  mutation deleteProject($id: ID!) {
    deleteProject(id: $id) {
      id,
      name,
      description,
      status,
      client {
        id,
        name,
        email,
        phone
      }
    }
  }
`;

const ADD_PROJECT = gql`
mutation addProject($name: String!,$description: String!,$status: ProjectStatus! $clientId: ID!){
addProject(name: $name, description: $description, status: $status, clientId: $clientId){
    id,
    name,
    description,
    status,
    client {
      id,
      name,
      email,
      phone
    }
  }
}
`;

export { DELETE_PROJECT, ADD_PROJECT };
