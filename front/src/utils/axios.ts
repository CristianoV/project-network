
import axios from 'axios';

export const fetchFromApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});