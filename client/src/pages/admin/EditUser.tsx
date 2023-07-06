import { useState, useEffect, FormEvent } from "react";
import { useParams } from "react-router-dom";
import { getUserById, updateUser } from "../../services/userServices";
import { user } from "../../utils/interfaces";
<<<<<<< HEAD
<<<<<<< HEAD
import {toast, ToastContainer} from 'react-toastify';
=======
import { toast, ToastContainer } from "react-toastify";
import swal from "sweetalert";
>>>>>>> 41acff5952d6e24e95a625dcb1a3f108511f5dcf
=======
import { toast, ToastContainer } from "react-toastify";
import swal from "sweetalert";
>>>>>>> 41acff5952d6e24e95a625dcb1a3f108511f5dcf

const EditUser = () => {
	const { id } = useParams();

	const [user, setUser] = useState<user>({
		id: String(id),
		fullName: "",
		email: "",
		password: "",
		image: "",
	});

	const [loading, setLoading] = useState(false);
	const [updating, setUpdating] = useState(false);

	useEffect(() => {
		setLoading(true);
		const fetchUsers = async () => {
			try {
				const res = await getUserById(id);

				setUser({
					...res,
					password: "",
				});
			} catch (error) {
				console.log(error);
			}
		};
		fetchUsers();
		setLoading(false);
	}, [id]);

	const handleSubmit = async (event: FormEvent) => {
		event.preventDefault();
		setUpdating(true);
		try {
			const res = await updateUser(String(id), user);
			swal("😊", "Usuario actualizado", "error");

			setUser({ ...res.user, password: "" });
		} catch (error) {
			swal("😣", "error", "error");
		}
		setUpdating(false);
<<<<<<< HEAD
<<<<<<< HEAD
		toast.success('Usuario actualizado!', {
    position: toast.POSITION.TOP_RIGHT
  });

=======
		toast.success("Usuario actualizado!", {
			position: toast.POSITION.TOP_RIGHT,
		});
>>>>>>> 41acff5952d6e24e95a625dcb1a3f108511f5dcf
=======
		toast.success("Usuario actualizado!", {
			position: toast.POSITION.TOP_RIGHT,
		});
>>>>>>> 41acff5952d6e24e95a625dcb1a3f108511f5dcf
	};

	return (
		<div className="editUser">
			<div className="editUser-container">
				{loading ? (
					<p>Loading...</p>
				) : (
					<form onSubmit={handleSubmit} className="editUser-form">
						<h2>User profile</h2>

						<label htmlFor="fullName">FullName:</label>
						<input
							type="text"
							id="fullName"
							value={user.fullName}
							onChange={(e) => setUser({ ...user, fullName: e.target.value })}
						/>

						<label htmlFor="email">Email:</label>
						<input
							type="text"
							id="email"
							value={user.email}
							onChange={(e) => setUser({ ...user, email: e.target.value })}
						/>

						<label htmlFor="password">Password:</label>
						<input
							type="text"
							id="password"
							value={user.password}
							onChange={(e) => setUser({ ...user, password: e.target.value })}
						/>

						<button type="submit">
							{updating ? "actualizando..." : "actualizar"}
						</button>
<<<<<<< HEAD
<<<<<<< HEAD
						<ToastContainer/>
=======
						<ToastContainer />
>>>>>>> 41acff5952d6e24e95a625dcb1a3f108511f5dcf
=======
						<ToastContainer />
>>>>>>> 41acff5952d6e24e95a625dcb1a3f108511f5dcf
					</form>
				)}
			</div>
		</div>
	);
};

export default EditUser;
