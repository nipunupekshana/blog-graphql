import {useQuery} from "@apollo/client"
import {Link,useParams} from "react-router-dom"
import {GET_PROJECT} from "../queries/projectQuries"
import Spinner from "../components/Spinner"
import ClientInfo from "../components/ClientInfo"
export default function Project(props) {

    const {loading,error,data} = useQuery(GET_PROJECT,{variables:{id: useParams().id}})
  return (
    <div>
        {loading && <Spinner/>}
        {error && <div>Error</div>}
        {data && (
            <div className="mx-auto w-75 card p-5">
                <Link to="/" className="btn btn-light btn sm w-25 d-inline ms-auto">Back</Link>
                <h1>{data.project.name}</h1>
                <p>{data.project.description}</p>
                <p>{data.project.status}</p>
                <ClientInfo client={data.project.client}/>
            </div>
        )}
    </div>
  )
}
