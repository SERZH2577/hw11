import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import { fetchApi } from './Components/api';
import { createImageCard } from './Components/templates';

Notiflix.Notify.init({
  position: 'center-top',
  distance: '85px',
});

const inputRef = document.querySelector('[name="searchQuery"]');
const btnRef = document.querySelector('.btn');
const galleryRef = document.querySelector('.gallery');

btnRef.addEventListener('click', onLooksForImages);

// console.log(fetchApi());

function onLooksForImages(e) {
  e.preventDefault();

  // const imageHits = fetchApi()
  //   .then(result => result.hits)
  //   .catch(error => console.log(error));

  // if (imageHits === 0 || imageHits === undefined) {
  //   Notiflix.Notify.failure(
  //     'Sorry, there are no images matching your search query. Please try again.'
  //   );

  //   return;
  // }
  console.log(
    fetchApi(inputRef.value)
      .then(result => result.hits)
      .then(
        images =>
          (galleryRef.innerHTML = images
            .map(image => {
              return createImageCard(image);
            })
            .join(''))
      )
  );
  console.log(inputRef.value);
}

const galleryCardTemplate = `<div class="photo-card">
  <img src="" alt="" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
    </p>
    <p class="info-item">
      <b>Views</b>
    </p>
    <p class="info-item">
      <b>Comments</b>
    </p>
    <p class="info-item">
      <b>Downloads</b>
    </p>
  </div>
</div>`;

// 'right-top' - 'right-bottom' - 'left-top' - 'left-bottom' - 'center-top' - 'center-bottom' - 'center-center'

// const BASE_URL = 'https://pixabay.com/api';
// const API_KEY = '25810966-6fb22a4db6c9a757ebd742847';

// Notiflix.Notify.success('Sol lucet omnibus');

// Notiflix.Notify.warning('Memento te hominem esse');

// Notiflix.Notify.info('Cogito ergo sum');

// https://pixabay.com/api/?key=25810966-6fb22a4db6c9a757ebd742847&q=yellow+flowers&image_type=photo

// page
// per_page

{
  // const BASE_URL = 'https://pixabay.com/api';
  // const API_KEY = '25810966-6fb22a4db6c9a757ebd742847';
  // const imageType = 'photo';
  // const imageOrientation = 'horizontal';
  // export function fetchApi(elem) {
  //   fetch(
  //     `${BASE_URL}/?key=${API_KEY}&q=${inputRef.value}&image_type=${imageType}&orientation=${imageOrientation}&safesearch=true`
  //   ).then(result => {
  //     // if (!result.ok) {
  //     //   return result.json().then(error => Promise.reject(error));
  //     // }
  //     return result.json();
  //   });
  // }
}
