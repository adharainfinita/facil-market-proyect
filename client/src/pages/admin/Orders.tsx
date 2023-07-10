import { getPaymentResumes } from "../../services/adminServices";
import { useEffect, useState } from "react";
import { resumes } from "../../utils/interfaces";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { RootState } from "../../redux/store";
import { BsExclamationTriangle } from "react-icons/bs";


const Orders = ( ) => {
  const users = useSelector((state:RootState)=> state.user.users)
  const [payments, setPayments] = useState<resumes[]>([]);

  const getNameUser = (element:number) =>{
    console.log(element);
    console.log(users);
    
    
   const userFound = users.find( match => Number(match.id) === element)
   
   return userFound?.fullName
  }

  useEffect(()=>{
    const fetchData = async () =>{
    const response = await getPaymentResumes();
      setPayments(response);
    };
    fetchData();
  },[]);
  
  return (
    <>
    	<div className="shopping-container">
				{payments?.length ? (
					<table className="shopping-table">
						<thead>
							<tr>
								<th className="shopping-th"># Compra</th>
								<th className="shopping-th">Fecha</th>
								<th className="shopping-th">Vendedor</th>
								<th className="shopping-th">Comprador</th>
								<th className="shopping-th">Monto total</th>
								<th className="shopping-th">Monto neto</th>
								<th className="shopping-th">Estado</th>
								<th className="shopping-th">Vencimiento</th>
								<th className="shopping-th">Productos</th>

							</tr>
						</thead>
						<tbody>
							{payments?.map((element, index) => (
                
								<tr key={index} className="shopping-tr">
									<td className="shopping-td">{element.order}</td>
									<td className="shopping-td">
										{element.createdAt}
									</td>
									<td className="shopping-td">
										{getNameUser(element.sellerID) }
									</td>
									<td className="shopping-td">
                    {getNameUser(element.buyerID)}
									</td>
                  <td className="shopping-td">
                    ${element.grossAmount}
									</td>
                  <td className="shopping-td">
                    ${element.netAmount}
									</td>
                  <td className="shopping-td">
                    {element.status}
									</td>
                  <td className="shopping-td">
                    {element.limitDate}
									</td>
                  <td className="shopping-td">
                    {element.items.map((match) => {
                    return (<p>{match.name}</p>)
                      })}
									</td>
                  <p>{element.message}</p>
								</tr>
							))}
						</tbody>
					</table>
				) : (
					<div className="no-purchases">
						<p>No hay compras aún</p>
						<BsExclamationTriangle className="warning" />
					</div>
				)}
			</div>
		</>
      )
}

export default Orders