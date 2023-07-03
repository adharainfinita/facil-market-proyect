import { Line } from "react-chartjs-2";
import {
	Chart,
	LinearScale,
	LineController,
	LineElement,
	CategoryScale,
	PointElement,
	Legend,
	Tooltip,
	TitleOptions,
	FontSpec,
	Title,
	scales,
} from "chart.js";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

//? Configuración de la fuente
const fontStyle: FontSpec = {
	family: "Verdana",
	style: "italic",
	size: 20,
	weight: "bold",
	lineHeight: "2",
};

//? Configuración del título
const title: TitleOptions = {
	align: "center",
	position: "top",
	fullSize: true,
	padding: { bottom: 0, top: 0 },
	display: true,
	text: "Ventas por usuarios",
	color: "Red",
	font: fontStyle,
};

const LineChart = () => {
	const dataComplete = useSelector(
		(state: RootState) => state.admin.analyticsData
	);

	//? Logica
	const userID = dataComplete.allUsers.map((element) => element.id);
	const sales = dataComplete.allUsers.map((match) => match.LevelOfActivity - 1);

	//? Registros
	Chart.register(
		LinearScale,
		LineController,
		LineElement,
		CategoryScale,
		PointElement,
		Legend,
		Tooltip,
		Title,
		scales
	);

	//? set datos
	const lineData = {
		type: "line",
		labels: userID,
		datasets: [
			{
				label: "Ventas",
				data: sales,
				backgroundColor: [
					"rgba(255, 0, 0, 0.3)", //? Rojo
					"rgba(0, 0, 255, 0.3)", //? Azul
					"rgba(0, 128, 0, 0.3)", //? Verde
					"rgba(255, 255, 0, 0.3)", //? Amarillo
					"rgba(128, 0, 128, 0.3)", //? Violeta
					"rgba(201, 203, 207, 0.3)", //? Gris
				],
				borderColor: [
					"rgb(255, 0, 3)", //? Rojo
					"rgb(0, 0, 255)", //? Azul
					"rgb(0, 128, 0)", //? Verde
					"rgb(255, 255, 0)", //? Amarillo
					"rgb(128, 0, 128)", //? Violeta
					"rgb(201, 203, 207)", //? Gris
				],
				borderWidth: 1,
				borderRadius: 5,
			},
		],
	};

	//? Set de configuración
	const options = {
		responsive: true,
		maintainAspectRatio: false,
		scales: {
			y: {
				display: true,
				beginAtZero: true,
				title: {
					display: true,
					text: "Ventas",
					color: "black",
					font: {
						size: 16,
						weight: "bold",
					},
				},
			},

			x: {
				display: true,
				title: {
					display: true,
					text: "Usuarios por ID",
					color: "black",
					font: {
						size: 16,
						weight: "bold",
					},
				},
			},
		},

		plugins: {
			title: title,
			legend: {
				display: true,
				labels: {
					color: "black",
				},
			},
			tooltip: {
				callbacks: {
					title: (config: any) => {
						let value = config[0].label || "";
						return `UserID: ${value}`;
					},
					label: (config: any) => `Ventas: ${config.formattedValue}`,
				},
				titleFont: {
					size: 16,
					weight: "bold",
				},
				bodyFont: {
					size: 16,
					weight: "bold",
				},
				displayColors: true,
				intersect: true,
			},
		},
	};

	return (
		<div className="conteiner-LineChart">
			<Line data={lineData} options={options} />
		</div>
	);
};

export default LineChart;
