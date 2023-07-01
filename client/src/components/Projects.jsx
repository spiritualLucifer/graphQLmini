import { GET_PROJECTS } from "./queries/projectQueries"
import { useQuery } from "@apollo/client"
import Spinner from "./Spinner"
import ProjectCart from "./ProjectCart";

function Projects() {
    const { loading, error, data } = useQuery(GET_PROJECTS);

    if (loading) return <Spinner />;
    if (error) return <p>Somthing went wrong</p>

    return (
        <>{data.projects.length > 0 ? (<div className="row mt-4">
               {data.projects.map((project)=>
                  <ProjectCart key={project.id} project={project}/>
               )}
        </div>) : <p>No Projects Found</p>}</>
    )
}

export default Projects