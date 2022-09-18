const BASE_URL = 'https://pixabay.com/api';
const API_KEY = '25810966-6fb22a4db6c9a757ebd742847';
const imageType = 'photo';
const imageOrientation = 'horizontal';
const perPage = 40;

export function fetchApi(elem) {
  return fetch(
    `${BASE_URL}/?key=${API_KEY}&per_page=${perPage}&q=${elem}&image_type=${imageType}&orientation=${imageOrientation}&safesearch=true`
  ).then(result => {
    if (!result.ok) {
      return result.json().then(error => Promise.reject(error));
    }
    return result.json();
  });
}

// https://pixabay.com/api/?key=25810966-6fb22a4db6c9a757ebd742847&q=yellow+flowers&image_type=photo
