import { useState } from "react"
import { FaList } from "react-icons/fa"
import { useMutation, useQuery } from "@apollo/client"
import { ADD_PROJECT } from "../components/mutations/peojectMutations"
import { GET_PROJECTS } from "./queries/projectQueries";
import { GET_CLIENTS } from "./queries/clientQuery";


function AddProjectModal() {
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [status, setStatus] = useState("new");
    const [clientId, setClientId] = useState("");

    const [addProject] = useMutation(ADD_PROJECT, {
        variables: { name, description, status,clientId},
        update(cache, { data: { addProject } }) {
            const { projects } = cache.readQuery({ query: GET_PROJECTS });
            cache.writeQuery({
                query: GET_PROJECTS,
                data: { projects: { ...projects, addProject } }
            })
        }
    })
    const { loading, error, data} = useQuery(GET_CLIENTS);
    console.log(data);
   
    const handleSubmit = (e) => {
        e.preventDefault();
        if (name && description && status) {
            addProject({ variables: { name, description, status,clientId } });
            setName('')
            setStatus('')
            setDescription("")
        }
    }

    return (
        <>
            <button type="button" className="btn btn-primary d-flex mb-2" data-bs-toggle="modal" data-bs-target="#exampleModal1">
                <FaList className="icon mt-1 mr-1" /> <div>Add Project</div>
            </button>
            <div className="modal fade" id="exampleModal1" tabindex="-1" aria-labelledby="exampleModalLabe2" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">ADD NEW PROJECT</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleSubmit}>
                                <div className='mb-3'>
                                    <label className='form-label'>Name</label>
                                    <input
                                        type='text'
                                        className='form-control'
                                        id='name'
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                                <div className='mb-3'>
                                    <label className='form-label'>Dscription</label>
                                    <textarea
                                        type='text'
                                        className='form-control'
                                        id='description'
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    ></textarea>
                                </div>
                                <div className='mb-3'>
                                    <label className='form-label'>Status</label>
                                    <select
                                        type='text'
                                        className='form-control'
                                        id='status'
                                        value={status}
                                        onChange={(e) => setStatus(e.target.value)}
                                    >
                                        <option value="new">not Started</option>
                                        <option value="progress">in progress</option>
                                        <option value="completed">completed</option>
                                    </select>
                                    <div className='mb-3'>
                                        <label className='form-label'>Client</label>
                                        <select
                                            id='clientId'
                                            className='form-select'
                                            value={clientId}
                                            onChange={(e) => setClientId(e.target.value)}
                                        >
                                            <option value=''>Select Client</option>
                                            {data!==undefined?data.clients.map((client) => (
                                                <option key={client.id} value={client.id}>
                                                    {client.name}
                                                </option>
                                            )):<div>No Clients</div>}
                                        </select>
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-secondary" data-bs-dismiss="modal">Add</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddProjectModal