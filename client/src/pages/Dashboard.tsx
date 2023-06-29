


import { NavLink } from "react-router-dom";
// import { UseSelector } from 'react-redux';
// import BarChart from '../components/BarChart'


function Dashboard() {

  return (
    <div className="dashboard">
      <aside className="dashboard-aside">
        <h3>Enlaces</h3>

        <NavLink to="/admin/summary">Resumen</NavLink>
        <NavLink to="/admin/products">Productos</NavLink>
        <NavLink to="/admin/orders">Ordenes</NavLink>
        <NavLink to="/admin/users">Usuarios</NavLink>
      </aside>

      <section>
        {/* <BarChart /> */}
      </section>
    </div>
  );
}

export default Dashboard;
