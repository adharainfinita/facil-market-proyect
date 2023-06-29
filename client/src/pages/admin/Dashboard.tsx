import { NavLink, Outlet } from "react-router-dom";
import { BsGraphUp } from "react-icons/bs";
import { BiStore } from "react-icons/bi";
import { FaUsers, FaClipboardList } from "react-icons/fa";

function Dashboard() {
  return (
    <div className="dashboard">
      <aside className="dashboard-aside">
        <h3>Enlaces</h3>

        <NavLink className="dashboard-link" to="/admin/summary">
          <BsGraphUp /> Resumen
        </NavLink>

        <NavLink className="dashboard-link" to="/admin/products">
          <BiStore /> Productos
        </NavLink>

        <NavLink className="dashboard-link" to="/admin/orders">
          <FaClipboardList /> Ordenes
        </NavLink>

        <NavLink className="dashboard-link" to="/admin/users">
          <FaUsers /> Usuarios
        </NavLink>
      </aside>
      <section className="dashboard-content">
        <Outlet />
      </section>
    </div>
  );
}

export default Dashboard;
