import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Link } from "react-router-dom";
import { BiLogOut, BiSolidDashboard } from "react-icons/bi";
import { IoSettingsOutline } from "react-icons/io5";
import { BsBagCheck, BsCartCheck } from "react-icons/bs";

interface UserProps {
  handleLogOut: (event: React.MouseEvent<HTMLDivElement>) => void;
}

const User = ({ handleLogOut }: UserProps) => {
  const [profileOpen, setProfileOpen] = useState<boolean | null>(false);
  const { userLogin: userLogin } = useSelector((state: RootState) => state.user);

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
              <Link to="/profile">
                <h4>Mi Perfil</h4>
              </Link>
            </div>

            <div className="box">
              <BsBagCheck className="icon" />

              <Link to="/ventas">
                <h4>Mis Productos</h4>
              </Link>
            </div>
            <div className="box">
              <BsCartCheck className="icon" />

              <Link to="/compras">
                <h4>Mis Compras</h4>
              </Link>
            </div>
            <div onClick={handleLogOut} className="box">
              <BiLogOut className="icon" />
              <h4>Cerrar Sesión</h4>
            </div>
            {userLogin.user.admin && (
              <div className="box">
                <BiSolidDashboard className="icon" />

                <Link to="/admin/summary">
                  <h4>Dashboard</h4>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default User;
