import axios from "axios";
const URL_HOST = import.meta.env.VITE_HOST;

export const getBasicResume = async( ) => {
  try {
    const {data} = await axios(`${URL_HOST}/admin`);
    return data;
  } catch (error) {
    let errorMessage = "An error occurred";
		if (axios.isAxiosError(error)) {
			errorMessage = error.response?.data?.error || errorMessage;
		}
		alert(errorMessage);
		throw error;
  }
}

export const getDataAnalytics = async( ) => {
  try {

    const {data} = await axios(`${URL_HOST}/admin/analytics`);
    return data;

  } catch (error) {

    let errorMessage = "An error occurred";
		if (axios.isAxiosError(error)) {
			errorMessage = error.response?.data?.error || errorMessage;
		}
		alert(errorMessage);
		throw error;
    
  }
}