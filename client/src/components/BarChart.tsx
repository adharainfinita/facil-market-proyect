// import React,{ useState } from 'react';
// import {Bar} from 'react-chartjs-2';
// // import {useSelector} from 'react-redux';
// // import { RootState } from '../redux/store';

// const BarChart: React.FC = ({data}: BarProp) => {
//   const salesInFacilMarket = [
//     {
//       year: 2020,
//       sales: 55 

//     },
//     {
//       year: 2021,
//       sales: 155,
//     },
//     {
//       year: 2022,
//       sales: 1110
//     }
//   ]

//   const [sales, setSales] = useState({
//     lables: salesInFacilMarket.map(data => data.year),
//     datasets: [{
//       label: "Users gained",
//       data: salesInFacilMarket.map(data => data.sales),
//       backgroundColor: ['green', 'grey', 'red']
//     }],
//   })
//   return (
//     <Bar data={sales} />
//   )
// }

// export default BarChart