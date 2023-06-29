import { useEffect } from "react"
import { getBasicResume, getDataAnalytics } from "../../services/adminServices";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { getAnalyticsData, getResumeInfo } from "../../redux/features/adminSlice";
import BarChart from "../../components/BarChart";


const Resume = ( ) => {
  const dispatch = useDispatch();
  const dataResume = useSelector((state:RootState) => state.admin.basicData);

  useEffect(()=>{
    const fetchDashboardData = async () =>{
      const resume = await getBasicResume();
      dispatch(getResumeInfo(resume));
      const data = await getDataAnalytics();
      dispatch(getAnalyticsData(data))
    }
    fetchDashboardData();
  },[])

  const properties = Object.entries(dataResume.ProductsOnAccesories)
  
  
  return (
    <main>
      <section>
        <h2>Resumen</h2><br />
        Productos activos: {dataResume.totalProducts}
        Usuarios activos: {dataResume.totalUsers}
        Ventas totales: {dataResume.totalSales}
        <div>
          {properties.map((match, index) =>{ 
            return (
              <h4 key={index}>{match[0]}: {match[1]}</h4> 
            )
            })}
        </div>
      </section>
      <section style={{backgroundColor:'grey'}}>
        <BarChart />
      </section>
    </main>
  )
}

export default Resume