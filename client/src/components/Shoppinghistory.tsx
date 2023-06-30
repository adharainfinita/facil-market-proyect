import {useEffect, useState} from 'react'
import { getPurchasesByUser } from '../services/purchaseServices';
import { Purchase } from '../utils/interfaces';

interface idUser { id: string}

const ShoppingHistory = ({id}: idUser) => {
    const [purchases, setPurchases] = useState<Purchase[]>()
    const [error, setError] = useState('')

    useEffect(() => {
        const fetchPurchases = async () => {
            try {
                const response = await getPurchasesByUser(Number(id))
                setPurchases(response)
            } catch (error: any) {
                setError(error)
            }
        }
        fetchPurchases()
    }, [])

	return (
		<>
            <h1>Historial de compras</h1>
            {purchases ? 
            (
                purchases.map((purchase) =>
                        <div key={purchase.id}>
                            <img src={purchase.product.images[1]} alt={purchase.product.name} />
                            <h3>{purchase.product.name}</h3>
                            <span>{purchase.product.location}</span>
                        </div>
                )
            ) : <p>No haz realizado ninguna compra todavía</p> }
            <p>{error}</p>
        </>
	);
};

export default ShoppingHistory;