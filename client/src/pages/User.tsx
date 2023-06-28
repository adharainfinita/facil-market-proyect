import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Link } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";
import { IoSettingsOutline } from "react-icons/io5";
import { BsBagCheck } from "react-icons/bs";

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
				<div
					onMouseEnter={handleMouseEnter} /* onMouseLeave={handleMouseLeave} */
				>
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
						<Link to="/profile">
							<div className="box">
								<IoSettingsOutline className="icon" />
								<h4>Mi Perfil</h4>
							</div>
						</Link>
						<div className="box">
							<BsBagCheck className="icon" />
							<h4>Mis Productos</h4>
						</div>
						<div onClick={(event) => handleLogOut(event)} className="box">
							<BiLogOut className="icon" />
							<h4>Cerrar Sesión</h4>
						</div>
					</div>
				)}
			</div>
		</>
	);
};

export default User;
