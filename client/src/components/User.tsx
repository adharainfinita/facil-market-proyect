import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { NavLink } from "react-router-dom";
import { BiLogOut, BiSolidDashboard } from "react-icons/bi";
import { IoSettingsOutline } from "react-icons/io5";
import { BsBagCheck, BsCartCheck } from "react-icons/bs";

interface UserProps {
  handleLogOut: (event: React.MouseEvent<HTMLDivElement>) => void;
}

const User = ({ handleLogOut }: UserProps) => {
  const [profileOpen, setProfileOpen] = useState<boolean | null>(false);
  const { userLogin } = useSelector((state: RootState) => state.user);

  const handleMouseEnter = () => {
    setProfileOpen(true);
  };

  const handleMouseLeave = () => {
    setProfileOpen(false);
  };

  return (
    <>
      <div className="profile">
        <div onMouseEnter={handleMouseEnter} className="profile-user-image">
          <img src={userLogin.user.image} alt="user image" />
        </div>

        {profileOpen && (
          <div
            className="openProfile boxItems"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="image">
              <div>
                <img src={userLogin.user.image} alt="user image" />
              </div>

              <div className="openProfile-name">
                <h4>{userLogin.user.fullName}</h4>
              </div>
            </div>

            <div className="box">
              <IoSettingsOutline className="icon" />
              <NavLink to="/profile">
                <h4>Mi Perfil</h4>
              </NavLink>
            </div>

            <div className="box">
              <BsBagCheck className="icon" />

              <NavLink to="/ventas">
                <h4>Mis Productos</h4>
              </NavLink>
            </div>
            <div className="box">
              <BsCartCheck className="icon" />

              <NavLink to="/compras">
                <h4>Mis Compras</h4>
              </NavLink>
            </div>
            <div onClick={(event) => handleLogOut(event)} className="box">
              <BiLogOut className="icon" />
              <h4>Cerrar Sesión</h4>
            </div>
            <div className="box">
              <BiSolidDashboard className="icon" />
              <NavLink to="/admin/summary">
                <h4>Dashboard</h4>
              </NavLink>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default User;
