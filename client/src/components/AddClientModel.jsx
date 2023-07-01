import { useState } from "react"
import { FaUser } from "react-icons/fa"
import { useMutation } from "@apollo/client"
import {ADD_CLIENT} from "./mutations/ClientMutation"
import { GET_CLIENTS } from "./queries/clientQuery"


function AddClientModel() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("");
    const [addClient]  = useMutation(ADD_CLIENT,{
        variables:{name,email,phone},
        update(cache,{data : {addClient}}){
           const {clients} = cache.readQuery({query:GET_CLIENTS});
           cache.writeQuery({
              query:GET_CLIENTS,
              data:{clients:{...clients,addClient}}
           })
        }
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        if(name && email && phone){ 
            addClient({variables:{name,email,phone}});
        }
    }

    return (
        <>
            <button type="button" className="btn btn-primary d-flex mb-2" data-bs-toggle="modal" data-bs-target="#exampleModal">
                <FaUser className="icon mt-1 mr-1" /> <div>Add Client</div>
            </button>
            <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
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
                                    <label className='form-label'>Email</label>
                                    <input
                                        type='email'
                                        className='form-control'
                                        id='email'
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className='mb-3'>
                                    <label className='form-label'>Phone</label>
                                    <input
                                        type='text'
                                        className='form-control'
                                        id='phone'
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                    />
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

export default AddClientModel