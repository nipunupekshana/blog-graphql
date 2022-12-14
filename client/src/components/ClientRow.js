import { useMutation } from '@apollo/client';
import {FaTrash} from 'react-icons/fa'
import {DELETE_CLIENT} from "../mutations/ClientMutations"
import {GET_CLIENTS} from "../queries/clientQueries"

export default function ClientRow({client}) {
    const [deleteClient,{loading}] = useMutation(DELETE_CLIENT,{
        variables:{id:client.id},
        update(cache,{
            data: {
                deleteClient
            }
            }
        ){
            const {clients} = cache.readQuery({query:GET_CLIENTS});
            cache.writeQuery({
                query:GET_CLIENTS,
                data:{
                    clients:clients.filter(client => client.id !== deleteClient.id)
                }
            })
        }
    });
  return (
    <tr key={client.id}>
      <td>{client.name}</td>
      <td>{client.email}</td>
      <td>{client.phone}</td>
      <td>
        <button className="btn btn-danger btn-sm" disabled={loading} onClick={deleteClient}><FaTrash/></button>
      </td>
    </tr>
  );
}
