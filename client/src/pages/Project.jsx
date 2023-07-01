import {Link,useParams} from "react-router-dom"
import Spinner from "../components/Spinner"
import { GET_PROJECT } from "../components/queries/projectQueries"
import {useQuery} from "@apollo/client"
import ClientInfo from "../components/ClientInfo";
import DeleteProject from "../components/DeleteProject";
import UpdateProject from "../components/UpdateProject"

function Project() {
   const {id}  =  useParams();

   const {data,loading,error} = useQuery(GET_PROJECT,
     {variables:{id}}
    );
   if(loading) return <Spinner/>;
   if(error) return <div>Error</div>;
  console.log(data.project)
  return (
    <>{!loading && !error && (<>
      <div className="mx-auto w-75 card p-5">
        <Link to="/"className="btn btn-light btn-sm w-25 d-inline ms-auto">
          Back
        </Link>
        <h1>{data.project.name}</h1>
        <p>{data.project.description}</p>
        <h5 className="mt-5"><strong>Project Statuts</strong></h5>
        <p className="lead">{data.project.status}</p>
        {data.project.client && <ClientInfo client={data.project.client} />}
        {<DeleteProject projectId={id}/>}
        <UpdateProject project={data.project}/>
      </div>
    </>)}
    </>
  )
}

export default Project