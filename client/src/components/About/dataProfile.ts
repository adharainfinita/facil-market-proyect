import adhara from "../../assets/Profiles/Adhara.jpeg";
import ale from "../../assets/Profiles/Ale.jpeg";
import benja from "../../assets/Profiles/Benja.jpeg";
import hector from "../../assets/Profiles/Hector.png";
import laura from "../../assets/Profiles/Laura.jpeg";
import mariano from "../../assets/Profiles/Mariano.jpeg";
import glutix from "../../assets/Profiles/Gluti.jpg";

export interface PropsProfile {
	fullName: string;
	image: string;
	github: string;
	linkdin: string;
	gmail: string;
}

interface Structure {
	data: Array<PropsProfile>;
}

export const dataProfile: Structure = {
	data: [
		{
			fullName: "Adhara Redruello",
			image: adhara,
			github: "https://github.com/adharainfinita",
			linkdin: "https://www.linkedin.com/in/adhara-redruello-81a704262/",
			gmail: "https://www.google.com/intl/es-419/gmail/Profiles/",
		},
		{
			fullName: "Alejandro Vargas",
			image: ale,
			github: "https://github.com/dether",
			linkdin: "https://www.linkedin.com/in/alejandro-vargas-b81445267/",
			gmail: "https://www.google.com/intl/es-419/gmail/Profiles/",
		},
		{
			fullName: "Benjamin Szodo",
			image: benja,
			github: "https://github.com/BenjaminSzodo",
			linkdin: "https://www.linkedin.com/in/benjamin-szodo-laborde-a363aa27a/",
			gmail: "https://www.google.com/intl/es-419/gmail/Profiles/",
		},

		{
			fullName: "Hector Cardoso",
			image: hector,
			github: "https://github.com/Hector141",
			linkdin: "https://www.linkedin.com/in/hector-cardoso-503531264/",
			gmail: "https://www.google.com/intl/es-419/gmail/Profiles/",
		},

		{
			fullName: "Laura Pérez",
			image: laura,
			github: "https://github.com/LaucataPe",
			linkdin: "https://www.linkedin.com/in/laura-p%C3%A9rez-49056b248/",
			gmail: "https://www.google.com/intl/es-419/gmail/Profiles/",
		},
		{
			fullName: "Mariano Alvarez",
			image: mariano,
			github: "https://github.com/Cachilox",
			linkdin: "https://www.linkedin.com/in/cachilo/",
			gmail: "https://www.google.com/intl/es-419/gmail/Profiles/",
		},

		{
			fullName: "Ricardo Ferreyra",
			image: glutix,
			github: "https://github.com/Glutix",
			linkdin: "https://www.linkedin.com/in/ricardo-ferreyra/",
			gmail: "https://www.google.com/intl/es-419/gmail/Profiles/",
		},
	],
};
