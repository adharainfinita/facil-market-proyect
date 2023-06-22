import { useState } from "react";

export function useLocalStorage(key: string, initialValue: any) {
	//? Parsear value
	const parseValue = () => {
		try {
			//? Obtengo la informacion segun la key del local storage
			const item = localStorage.getItem(key);

			//? Si existe la key parseo la info si no devuelvo el estado inicial
			return item ? JSON.parse(item) : initialValue;
		} catch (error) {
			return initialValue;
		}
	};

	//? Setear el valor
	const setValue = (value: any) => {
		try {
			//? Actualizar el valor recibido
			setStoreValue(value);

			//? Guardamos en el local storage
			localStorage.setItem(key, JSON.stringify(value));
		} catch (error) {
			console.log(error);
		}
	};

	//? Estado local
	const [storeValue, setStoreValue] = useState(parseValue);

	return [storeValue, setValue];
}
