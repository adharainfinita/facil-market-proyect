import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { updateUser } from "../../services/userServices";
import { User, user } from "../../utils/interfaces";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function Users() {
	const users = useSelector((state: RootState) => state.user.users);
	const [updatedUsers, setUpdatedUsers] = useState<User[]>([]);

  const disabledUser = async (user: user) => {
    const updatedUser = { active: !user.active };
    const disabled = await updateUser(user.id, updatedUser);
    console.log(disabled);
    const updatedUsersList = updatedUsers.map((u) => {
      if (u.id === user.id) {
        return { ...u, active: disabled.user.active };
      }
      return u;
    });
    setUpdatedUsers(updatedUsersList)
  };

  useEffect(() => {
    setUpdatedUsers(users);
  }, [users]);

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
				{updatedUsers.map((user) => (
					<tr key={user.id}>
						<td className="user-table-td">{user.id}</td>
						<td className="user-table-td">{user.fullName}</td>
						<td className="user-table-td">{user.email}</td>
						<td className="user-table-td">
							<button onClick={() => disabledUser(user)}>
								{user.active ? "Desactivar" : "Activar"}
							</button>

							<Link to={`/user/${user.id}`}>
								<button>Editar</button>
							</Link>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}

export default Users;
