interface Product{
    id: number
    nombre: string
    precio: number
    descripcion: string
    categoria: string
}

export const products: Array<Product> = [
    {
      "id": 1,
      "nombre": "Camiseta",
      "precio": 20.99,
      "descripcion": "Camiseta de algodón de manga corta",
      "categoria": "Ropa"
    },
    {
      "id": 2,
      "nombre": "Zapatos",
      "precio": 49.99,
      "descripcion": "Zapatos de cuero elegantes",
      "categoria": "Calzado"
    },
    {
      "id": 3,
      "nombre": "Bolso",
      "precio": 35.99,
      "descripcion": "Bolso de mano con diseño moderno",
      "categoria": "Accesorios"
    },
    {
      "id": 4,
      "nombre": "Pantalones",
      "precio": 39.99,
      "descripcion": "Pantalones vaqueros ajustados",
      "categoria": "Ropa"
    },
    {
      "id": 5,
      "nombre": "Reloj",
      "precio": 79.99,
      "descripcion": "Reloj de pulsera con cronógrafo",
      "categoria": "Accesorios"
    }
  ]