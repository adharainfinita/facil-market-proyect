import { NavLink, Outlet } from "react-router-dom";
import { BsGraphUp } from "react-icons/bs";
import { BiStore } from "react-icons/bi";
import { FaUsers, FaClipboardList } from "react-icons/fa";

function Dashboard() {
	return (
		<div className="dashboard">
			<aside className="dashboard-aside">
				<h3 className="dashboard-aside-title">Enlaces</h3>

				<NavLink className="dashboard-aside-link" to="/admin/summary">
					<BsGraphUp className="dashboard-aside-icon" /> Resumen
				</NavLink>

				<NavLink className="dashboard-aside-link" to="/admin/products">
					<BiStore className="dashboard-aside-icon" /> Productos
				</NavLink>

				<li className="dashboard-aside-link">
					<FaClipboardList className="dashboard-aside-icon" /> Ordenes
				</li>

				<NavLink className="dashboard-aside-link" to="/admin/users">
					<FaUsers className="dashboard-aside-icon" /> Usuarios
				</NavLink>
			</aside>
			<section className="dashboard-content">
				<Outlet />
			</section>
		</div>
	);
}

export default Dashboard;
