//! Componente smart
import DetailProfile from "./DetailProfile";
import { dataProfile, PropsProfile } from "./dataProfile";

const About = () => {
	return (
		<div className="conteiner-about">
			<section className="section-about">
				<h1>Sobre nosotros:</h1>
				{/* <p>
					Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quibusdam
					eligendi voluptatum eius doloremque. Quis, maiores quod quae dicta
					reprehenderit dolores suscipit ex sit ipsum accusamus exercitationem?
					Modi deserunt atque harum? Lorem ipsum dolor sit, amet consectetur
					adipisicing elit. Quibusdam eligendi voluptatum eius doloremque. Quis,
					maiores quod quae dicta reprehenderit dolores suscipit ex sit ipsum
					accusamus exercitationem? Modi deserunt atque harum?
				</p> */}
			</section>
			{/* //? Participantes */}
			<div className="conteiner-aboutCardProfile">
				{dataProfile.data.map((user: PropsProfile, index: number) => {
					return <DetailProfile {...user} key={index} />;
				})}
			</div>
		</div>
	);
};

export default About;
