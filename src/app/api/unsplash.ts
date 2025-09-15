import { IUnsplashPhoto } from '../types';

const accessKey = process.env.ACCESS_KEY;
const baseURL = process.env.BASE_URL;

if (!accessKey) {
  console.error('Unsplash API key is missing. Check your .env file.');
}

if (!baseURL) {
  console.error('BASE_URL is not defined. Check your .env file.');
}

const headers = {
  Authorization: `Client-ID ${accessKey}`,
};

export const getRandomPhotos = async (
  page = 1,
  perPage = 10
): Promise<IUnsplashPhoto[]> => {
  try {
    const response = await fetch(
      `${baseURL}/photos?per_page=${perPage}&page=${page}&order_by=latest`,
      {
        method: 'GET',
        headers: headers,
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: IUnsplashPhoto[] = await response.json();
    return data;
  } catch (error) {
    console.error('Ошибка загрузки фото:', error);
    return [];
  }
};
