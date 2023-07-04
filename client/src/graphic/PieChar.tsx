import { Pie } from "react-chartjs-2";
import {
	Chart,
	CategoryScale,
	LinearScale,
	Title,
	Legend,
	Tooltip,
	TitleOptions,
	FontSpec,
	ArcElement,
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

const PieChart = () => {
	const dataComplete = useSelector(
		(state: RootState) => state.admin.analyticsData
	);

	//? Lógica de datos
	const userID = dataComplete.allUsers.map((element) => element.id);
	const sales = dataComplete.allUsers.map((match) => match.LevelOfActivity);

	//? Registros
	Chart.register(
		CategoryScale,
		LinearScale,
		Title,
		Legend,
		Tooltip,
		ArcElement
	);

	//? Set de datos
	const chartData = {
		type: "pie",
		labels: userID,
		datasets: [
			{
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
					title: (context: any) => {
						let value = context[0].label || "";
						return `UserID: ${value}`;
					},
					label: (context: any) => `Ventas: ${context.formattedValue}`,
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
		<div className="conteiner-pieChart">
			<Pie data={chartData} options={options} />
		</div>
	);
};

export default PieChart;
