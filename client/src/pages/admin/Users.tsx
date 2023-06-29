import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { updateUser } from "../../services/userServices";
import { user } from "../../utils/interfaces";

function Users() {
  const users = useSelector((state: RootState) => state.user.users);

  const disabledUser = async (user: user) => {
    console.log(user);
    const updatedUser = { ...user, active: !user.active };
    const disabled = await updateUser(user.id, updatedUser);
    console.log(disabled);
  };

  return (
    <table className="user-table">
      <thead>
        <tr>
          <th className="user-table-th">ID</th>
          <th className="user-table-th">Nombre</th>
          <th className="user-table-th">Email</th>
          <th className="user-table-th">Action</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td className="user-table-td">{user.id}</td>
            <td className="user-table-td">{user.fullName}</td>
            <td className="user-table-td">{user.email}</td>
            <td className="user-table-td">
              <button onClick={() => disabledUser(user)}>
                {user.active ? "Desactivar" : "Activar"}
              </button>
              
              <button>Editar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Users;
