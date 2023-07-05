import { ChangeEvent, useEffect, useState } from "react";
import { getBasicResume, getDataAnalytics } from "../../services/adminServices";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import {
	getAnalyticsData,
	getResumeInfo,
} from "../../redux/features/adminSlice";
import BarChart from "../../graphic/BarChart";
import PieChart from "../../graphic/PieChar";
import LineChart from "../../graphic/LineChart";

const Resume = () => {
	const dispatch = useDispatch();
	const dataResume = useSelector((state: RootState) => state.admin.basicData);

	useEffect(() => {
		const fetchDashboardData = async () => {
			const resume = await getBasicResume();
			dispatch(getResumeInfo(resume));
			const data = await getDataAnalytics();
			dispatch(getAnalyticsData(data));
		};
		fetchDashboardData();
	}, [dispatch]);

	const properties = Object.entries(dataResume.ProductsOnAccesories);

	const [graphMode, setGraphMode] = useState({
		barChart: true,
		pieChart: false,
		lineChart: false,
	});

	const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
		const value = event.target.value;
		if (value === "circular") {
			setGraphMode({
				...graphMode,
				pieChart: true,
				barChart: false,
				lineChart: false,
			});
		}

		if (value === "columnas") {
			setGraphMode({
				...graphMode,
				barChart: true,
				pieChart: false,
				lineChart: false,
			});
		}

		if (value === "lineal") {
			setGraphMode({
				...graphMode,
				lineChart: true,
				barChart: false,
				pieChart: false,
			});
		}
	};

	const renderChart = () => {
		if (graphMode.barChart) {
			return <BarChart />;
		} else if (graphMode.lineChart) {
			return <LineChart />;
		} else if (graphMode.pieChart) {
			return <PieChart />;
		}
	};

	return (
		<div className="graph">
			<section className="graph-section">
				<select className="graph-select" onChange={handleChange} defaultValue="default">
					<option disabled value="default">
						Seleccionar una opción
					</option>
					<option value="columnas">Columnas</option>
					<option value="circular">Circular</option>
					<option value="lineal">Lineal</option>
				</select>

				{renderChart()}
			</section>

		
			<section>
				<h3>Resumen general</h3>
				<h4>Productos activos: {dataResume.totalProducts}</h4>
				<h4>Usuarios activos: {dataResume.totalUsers}</h4>
				<h4>Ventas totales: {dataResume.totalSales}</h4>
				<br />
				<hr />

				<h3>Categorias publicadas</h3>
				<div>
					{properties.map((match, index) => {
						return (
							<h4 key={index}>
								{match[0]}: {match[1]}
							</h4>
						);
					})}
				</div>
			</section>
		</div>
	);
};

export default Resume;
