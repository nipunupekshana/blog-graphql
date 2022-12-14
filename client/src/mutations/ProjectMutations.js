
import { gql } from "@apollo/client";

const DELETE_PROJECT = gql`
  mutation deleteClient($id: ID!) {
    deleteProject(id: $id) {
      id
      name
      email
      phone
    }
  }
`;

const ADD_PROJECT = gql`
mutation addProject($name: String!,$description: String!,$status: String! $clientId: ID!){
addProject(name: $name, description: $description, status: $status, clientId: $clientId){
    id,
    name,
    description,
    status,
    client
  }
}
`;

export { DELETE_CLIENT, ADD_CLIENT };
