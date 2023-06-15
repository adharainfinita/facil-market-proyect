export const getProducts = async () =>{
    const res = await fetch('https://fakestoreapi.com/products?limit=6')
    const json = await res.json()
    const trend = json.slice(0, 6)  
    
    return trend
}