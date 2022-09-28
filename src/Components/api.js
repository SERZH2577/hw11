const BASE_URL = 'https://pixabay.com/api';
const API_KEY = '25810966-6fb22a4db6c9a757ebd742847';
const imageType = 'photo';
const imageOrientation = 'horizontal';
const perPage = 40;

export async function fetchImages(searchParams, pageNumber) {
  try {
    const result = await fetch(
      `${BASE_URL}/?key=${API_KEY}&page=${pageNumber}&per_page=${perPage}&q=${searchParams}&image_type=${imageType}&orientation=${imageOrientation}&safesearch=true`
    );

    return result.json();
  } catch (error) {
    console.log(error.message);
  }
}

// if (!result.ok) {
//   const error = await result.json();
//   return Promise.reject(error);
// }
