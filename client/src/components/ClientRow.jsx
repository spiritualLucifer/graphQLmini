import { FaTrash } from "react-icons/fa";
import { useMutation } from "@apollo/client";
import { DELETE_CLIENT } from "./mutations/ClientMutation";
import { GET_CLIENTS } from "./queries/clientQuery";

function ClientRow({ client }) {
  const [deleteClient] = useMutation(DELETE_CLIENT, {
    variables: { id: client.id },
    update(cache, { data: { deleteClient: deletedClient } }) {
      const { clients } = cache.readQuery({ query: GET_CLIENTS });
      cache.writeQuery({
        query: GET_CLIENTS,
        data: {
          clients: clients.filter((client) => client.id !== deletedClient.id),
        },
      });
    },
  });

  const handleDelete = () => {
    deleteClient(client.id);
  };

  return (
    <>
      <tr>
        <td>{client.name}</td>
        <td>{client.email}</td>
        <td>{client.phone}</td>
        <td>
          <button className="btn btn-danger btn-sm" onClick={handleDelete}>
            <FaTrash />
          </button>
        </td>
      </tr>
    </>
  );
}

export default ClientRow;
