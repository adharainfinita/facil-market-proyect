import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { deleteUser } from "../../services/userServices";
import { User, user } from "../../utils/interfaces";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function Users() {
  const users = useSelector((state: RootState) => state.user.users);
  const [updatedUsers, setUpdatedUsers] = useState<User[]>([]);
  const login = useSelector((state: RootState) => state.user.userLogin);
  const admin = login?.user?.admin;
  const currentUser = login?.user?.id;

  const disabledUser = async (user: user) => {
    if (admin && user.id === currentUser) {
      alert("No puedes desactivar tu propia cuenta");
      return;
    }

    const disabled = await deleteUser(Number(user.id));

    const updatedUsersList = updatedUsers.map((u) => {
      if (u.id === user.id) {
        return { ...u, active: disabled.user.active };
      }
      return u;
    });
    setUpdatedUsers(updatedUsersList);
  };

  useEffect(() => {
    setUpdatedUsers(users);
  }, [users]);

  return (
    <div className="relocura">
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
                {user.active ? (
                  <button
                    className="user-table-disableBtn"
                    onClick={() => disabledUser(user)}
                  >
                    Desactivar
                  </button>
                ) : (
                  <button
                    className="user-table-activeBtn"
                    onClick={() => disabledUser(user)}
                  >
                    Activar
                  </button>
                )}

                <Link to={`/user/${user.id}`}>
                  <button className="user-table-editBtn">Editar</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Users;
