import axios from 'axios';

export interface Category {
  name: string;
}


export const postCategory = async (data: string) => {
  try {
    const response = await axios.post("http://localhost:3001/category", { name: data });
    console.log(`Post successful for category: ${data}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(`Error posting category: ${data}`);
    return null;
  }
};

export const getCategory = async () => {
	try {
		const response = await axios("http://localhost:3001/category");
		return response.data;
	} catch (error: any) {
		const errorMessage = error.response
			? error.response.data.error
			: error.message;
		alert(errorMessage);
	}
};
