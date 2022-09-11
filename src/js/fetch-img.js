import axios from 'axios'
export { fetchImages }

const BASE_URL = 'https://pixabay.com/api/';
const KEY = '29834972-66a038f6460a1c02cdd4b6acb'

async function fetchImages(query, page, per_page) {
  const response = await axios.get(
    `${BASE_URL}?key=${KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${per_page}`
  );
  return response;
}
