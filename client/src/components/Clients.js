import {useQuery} from "@apollo/client"
import {GET_CLIENTS} from "../queries/clientQueries"
import ClientRow from "./ClientRow";
import Spinner from "./Spinner";




export default function Clients() {
  const {loading,error,data} = useQuery(GET_CLIENTS);
    if(loading) return <Spinner/>;
    if(error) return `Error! ${error.message}`;
    return (
      <>  
        { !loading && !error && (
          <table className="table table-hove mt-3">
            <thead>
              <tr className="font-weight-bold">
                <td>Name</td>
                <td>Email</td>
                <td>Phone</td>
                <td></td>
              </tr>
              </thead>
              <tbody>
                {data.clients.map(client => (
                  <ClientRow key={client.id} client={client}/>
                ))}
              </tbody>
            </table>
        )
        }
      </>
    );
    
}
