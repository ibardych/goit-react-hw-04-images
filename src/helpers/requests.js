import axios from 'axios';
import { pixabayApiKey } from 'constants/api.keys';
import { IMAGES_PER_PAGE } from 'constants/gallery';

const BASE_URL = 'https://pixabay.com/api';
const PARAMS = {
  key: pixabayApiKey,
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
  per_page: IMAGES_PER_PAGE,
};

const requestPixabayImages = async ({ query, page }) => {
  const url = `${BASE_URL}?q=${query}&page=${page}`;

  console.log('url: ', url);

  try {
    const response = await axios.get(url, { params: PARAMS });
    const { totalHits, hits: images } = response.data;
    const totalPages = Math.ceil(totalHits / PARAMS.per_page);
    return { images, totalHits, totalPages };
  } catch (error) {
    console.log(error);
  }
};

export { requestPixabayImages };
