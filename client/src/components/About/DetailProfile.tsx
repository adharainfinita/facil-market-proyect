import React from "react";
import { PropsProfile } from "./dataProfile";
import { Link } from "react-router-dom";
import linkedin from "../../assets/About/linkedin.svg";
import github from "../../assets/About/github2.svg";
import gmail from "../../assets/About/gmail.svg";

const DetailProfile: React.FC<PropsProfile> = (data) => {
	return (
		<div className="conteiner-about-contributors">
			<img
				className="image-about-contributors"
				src={data.image}
				alt="Foto de perfil"
			/>
			<h1 className="title-about-contributors">{data.fullName}</h1>

			<section className="redes-about-contributors">
				<Link to={data.github} target="_blank">
					<img src={github} alt="github" />
				</Link>
				<Link to={data.linkdin} target="_blank">
					<img src={linkedin} alt="linkedin" />
				</Link>
				<Link to={data.gmail} target="_blank">
					<img src={gmail} alt="gmail" />
				</Link>
			</section>
		</div>
	);
};

export default DetailProfile;
