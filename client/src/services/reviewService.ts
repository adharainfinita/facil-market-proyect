import axios, { AxiosResponse } from 'axios';
const URL_HOST = import.meta.env.VITE_HOST;
import { Review } from '../utils/interfaces';


export const createReview = async (userID: number,fullName:string, productID: number, text: string, rating: number) => {
    try {
      const response = await axios.post<{ newReview: any }>(`${URL_HOST}/review`, {
        userID,
        fullName,
        productID,
        text,
        rating
      });
  
      return response.data.newReview;
    } catch (error: any) {
      throw new Error(error.response.data.error);
    }
  };



 export const getAllReviewsProduct = async (productId: number): Promise<Review[]> => {
    try {
      const response: AxiosResponse<Review[]> = await axios.get(`${URL_HOST}/review/${productId}`);
      return response.data;
    } catch (error: any) {
        throw new Error(error.response.data.error);
      }
  };
  
