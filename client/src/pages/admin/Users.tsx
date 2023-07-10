import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { deleteUser, updateUser } from "../../services/userServices";
import { User } from "../../utils/interfaces";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import swal from "sweetalert";
import { toast } from "react-toastify";
const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL;

function Users() {
  const [updatedUsers, setUpdatedUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const users = useSelector((state: RootState) => state.user.users);
  const login = useSelector((state: RootState) => state.user.userLogin);
  const admin = login?.user?.admin;
  const currentUser = login?.user?.id;
  const navigate = useNavigate();

  const disabledUser = async (user: User) => {
    if (admin && user.id === currentUser) {
      swal({
        title: "🤖",
        text: "No puedes desactivar tu propia cuenta",
        icon: "info",
      });
      return;
    }
    if (user.email === ADMIN_EMAIL) {
      swal({
        title: "🤖",
        text: "No puedes desactivar la cuenta del super admin",
        icon: "info",
      });
      return;
    }

    if (admin && user.admin && user.email === ADMIN_EMAIL) {
      swal({
        title: "🤖",
        text: "No puedes desactivar la cuenta de otro administrador",
        icon: "info",
      });
      return;
    }
    if (admin && user.admin && login.user.email !== ADMIN_EMAIL) {
      swal({
        title: "🤖",
        text: "No puedes desactivar la cuenta de otro administrador",
        icon: "info",
      });
      return;
    }

    const disabled = await deleteUser(Number(user.id));

    const updatedUsersList = updatedUsers.map((u) => {
      if (u.id === user.id) {
        return { ...u, active: disabled?.user?.active };
      }
      return u;
    });

    if (user.active) {
      toast.warning("Cuenta desactivada", {
        position: "bottom-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      toast.success("Cuenta activada", {
        position: "bottom-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }

    setUpdatedUsers(updatedUsersList);
  };

  const handleUserAdmin = async (user: User) => {
    if (user.email === ADMIN_EMAIL) {
      swal({
        title: "🤖",
        text: "No puedes quitarte los permisos de admin",
        icon: "info",
      });
      return;
    }

    const updatedUser = { admin: !user.admin };

    try {
      const response = await updateUser(user.id, updatedUser);
      const updatedUsersList = updatedUsers.map((u) => {
        if (u.id === user.id) {
          return { ...u, admin: response?.user?.admin };
        }
        return u;
      });
      if (user.admin) {
        toast.warning(
          "Se han revocado los permisos de administrador al usuario",
          {
            position: "bottom-left",
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          }
        );
      } else {
        toast.success("Se han otorgado permisos de administrador al usuario", {
          position: "bottom-left",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
      setUpdatedUsers(updatedUsersList);
    } catch (error) {
      console.log(error);
      swal({
        title: "🤖",
        text: "Ocurrió un error al actualizar el usuario",
        icon: "error",
      });
    }
  };

  const handleUserEdit = (user: User) => {
    if (user.email === ADMIN_EMAIL) {
      swal({
        title: "🤖",
        text: "No puedes modificar la información del super admin",
        icon: "info",
      });
      return;
    }

    if (admin && user.admin && user.email === ADMIN_EMAIL) {
      swal({
        title: "🤖",
        text: "No puedes editar la cuenta de otro administrador",
        icon: "info",
      });
      return;
    }

    if (admin && user.admin && user.id !== currentUser) {
      swal({
        title: "🤖",
        text: "No puedes editar la cuenta de otro administrador",
        icon: "info",
      });
      return;
    }

    navigate(`/user/${user.id}`);
  };

  const handleSearchUser = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  let results = [];
  if (!search) {
    results = updatedUsers;
  } else {
    results = updatedUsers.filter((user) => {
      return user.fullName.toLowerCase().includes(search.toLowerCase());
    });
  }

  const sortedUsers = [...results].sort((a, b) => Number(a.id) - Number(b.id));

  useEffect(() => {
    setUpdatedUsers(users);
  }, [users]);

  return (
    <div className="user-table-container">
      <div>
        <input
          className="user-table-search"
          value={search}
          onChange={handleSearchUser}
          type="text"
          placeholder="Buscar un usuario..."
        />
      </div>

      <div>
        <table className="user-table">
          <thead>
            <tr>
              <th className="user-table-th">ID</th>
              <th className="user-table-th">Nombre</th>
              <th className="user-table-th">Email</th>
              <th className="user-table-th">Action</th>
              <th className="user-table-th">Rol</th>
              {login.user.email === ADMIN_EMAIL && (
                <th className="user-table-th">Admin</th>
              )}
            </tr>
          </thead>
          <tbody>
            {sortedUsers.map((user) => (
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

                  <button
                    onClick={() => handleUserEdit(user)}
                    className="user-table-editBtn"
                  >
                    Editar
                  </button>
                </td>
                <td className="user-table-td">
                  {user.admin ? (
                    <span className="user-table-admin">Admin</span>
                  ) : (
                    <span className="user-table-cliente">Cliente</span>
                  )}
                </td>
                {login.user.email === ADMIN_EMAIL ? (
                  <td className="user-table-td">
                    {user.admin ? (
                      <button
                        className="user-table-disableBtn"
                        onClick={() => handleUserAdmin(user)}
                      >
                        Remover
                      </button>
                    ) : (
                      <button
                        className="user-table-activeBtn"
                        onClick={() => handleUserAdmin(user)}
                      >
                        Agregar
                      </button>
                    )}
                  </td>
                ) : null}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Users;
