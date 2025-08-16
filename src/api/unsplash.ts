import axios from 'axios';
import { UnsplashPhoto } from '../types';

const accessKey = process.env.REACT_APP_ACCESS_KEY;
const URL = process.env.REACT_APP_BASE_URL;

if (!accessKey) {
  console.error('Unsplash API key is missing. Check your .env file.');
}

const unsplashApi = axios.create({
  baseURL: URL,
  headers: {
    Authorization: `Client-ID ${accessKey}`,
  },
});

export const getRandomPhotos = async (page = 1, perPage = 10): Promise<UnsplashPhoto[]> => {
  try {
    const response = await unsplashApi.get('/photos', {
      params: { page, per_page: perPage,  order_by: 'latest' },
    });

    return response.data;
  } catch (error) {
    console.error('Ошибка загрузки фото:', error);
    return [];
  }
};
