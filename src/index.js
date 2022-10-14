import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
// import { fetchImages } from './Components/apiImages';
import { createImageCard } from './Components/templates';
// import { refs } from './Components/refs';

const BASE_URL = 'https://pixabay.com/api';
const API_KEY = '25810966-6fb22a4db6c9a757ebd742847';
const imageType = 'photo';
const imageOrientation = 'horizontal';
const perPage = 40;

async function fetchImages(searchParams, pageNumber) {
  try {
    const result = await fetch(
      `${BASE_URL}/?key=${API_KEY}&page=${pageNumber}&per_page=${perPage}&q=${searchParams}&image_type=${imageType}&orientation=${imageOrientation}&safesearch=true`
    );

    return result.json();
  } catch (error) {
    console.log(error.message);
  }
}

const lightbox = new SimpleLightbox('.gallery a');

const searchFormRef = document.querySelector('#search-form');
const inputRef = document.querySelector('[name="searchQuery"]');
const btnRef = document.querySelector('.btn');
const galleryRef = document.querySelector('.gallery');
const btnBackRef = document.querySelector('.btn-back-js');
const btnNextRef = document.querySelector('.btn-next-js');
const pageSwitchingRef = document.querySelector('.page-switching');

// refs.btnRef.addEventListener('click', onSearchButton);
// refs.btnNextRef.addEventListener('click', onGoesNextPage);
// refs.btnBackRef.addEventListener('click', onReturnsPreviousPage);
btnRef.addEventListener('click', onSearchButton);
btnNextRef.addEventListener('click', onGoesNextPage);
btnBackRef.addEventListener('click', onReturnsPreviousPage);

let pageNumber = 0;
let totalHitsRes = 0;
let inputValue = '';
let successMessage = false;

// function onSearchButton(e) {
//   e.preventDefault();
//   inputValue = refs.inputRef.value.trim();

//   if (refs.inputRef.value.trim() === '') {
//     Notiflix.Notify.failure(
//       'Sorry, there are no images matching your search query. Please try again.'
//     );
//     return;
//   }

//   successMessage = false;
//   pageNumber = 1;

//   refs.btnBackRef.setAttribute('disabled', '');
//   refs.btnNextRef.removeAttribute('disabled');

//   displayImagesOnThePage(inputValue);

//   refs.searchFormRef.reset();
// }
function onSearchButton(e) {
  e.preventDefault();
  inputValue = inputRef.value.trim();

  if (inputRef.value.trim() === '') {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    return;
  }

  successMessage = false;
  pageNumber = 1;

  btnBackRef.setAttribute('disabled', '');
  btnNextRef.removeAttribute('disabled');

  displayImagesOnThePage(inputValue);

  searchFormRef.reset();
}

// function displayImagesOnThePage(val) {
//   fetchImages(val, pageNumber)
//     .then(result => {
//       totalHitsRes = result.totalHits;
//       return result.hits;
//     })
//     .then(images => {
//       if (totalHitsRes === 0) {
//         refs.galleryRef.innerHTML = '';
//         refs.btnNextRef.setAttribute('hidden', '');
//         refs.btnBackRef.setAttribute('hidden', '');

//         Notiflix.Notify.failure(
//           'Sorry, there are no images matching your search query. Please try again.'
//         );

//         return;
//       }

//       if (!successMessage) {
//         Notiflix.Notify.success(`Hooray! We found ${totalHitsRes} images.`);
//         successMessage = true;
//       }

//       if (totalHitsRes <= 40) {
//         refs.btnNextRef.setAttribute('hidden', '');
//         refs.btnBackRef.setAttribute('hidden', '');
//       } else {
//         refs.btnNextRef.removeAttribute('hidden');
//         refs.btnBackRef.removeAttribute('hidden');
//       }

//       refs.galleryRef.innerHTML = images
//         .map(image => {
//           return createImageCard(image);
//         })
//         .join('');

//       lightbox.refresh();
//     })
//     .catch(error => console.log(error));

//   window.scrollBy(0, -10000000);
// }
function displayImagesOnThePage(val) {
  fetchImages(val, pageNumber)
    .then(result => {
      totalHitsRes = result.totalHits;
      return result.hits;
    })
    .then(images => {
      if (totalHitsRes === 0) {
        galleryRef.innerHTML = '';
        btnNextRef.setAttribute('hidden', '');
        btnBackRef.setAttribute('hidden', '');

        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );

        return;
      }

      if (!successMessage) {
        Notiflix.Notify.success(`Hooray! We found ${totalHitsRes} images.`);
        successMessage = true;
      }

      if (totalHitsRes <= 40) {
        btnNextRef.setAttribute('hidden', '');
        btnBackRef.setAttribute('hidden', '');
      } else {
        btnNextRef.removeAttribute('hidden');
        btnBackRef.removeAttribute('hidden');
      }

      galleryRef.innerHTML = images
        .map(image => {
          return createImageCard(image);
        })
        .join('');

      lightbox.refresh();
    })
    .catch(error => console.log(error));

  window.scrollBy(0, -10000000);
}

// function onGoesNextPage() {
//   pageNumber += 1;

//   if (pageNumber === Math.ceil(totalHitsRes / 40)) {
//     Notiflix.Notify.info(
//       "We're sorry, but you've reached the end of search results."
//     );
//     refs.btnNextRef.setAttribute('disabled', '');
//   }

//   displayImagesOnThePage(inputValue);

//   refs.btnBackRef.removeAttribute('disabled');
// }
function onGoesNextPage() {
  pageNumber += 1;

  if (pageNumber === Math.ceil(totalHitsRes / 40)) {
    Notiflix.Notify.info(
      "We're sorry, but you've reached the end of search results."
    );
    btnNextRef.setAttribute('disabled', '');
  }

  displayImagesOnThePage(inputValue);

  btnBackRef.removeAttribute('disabled');
}

// function onReturnsPreviousPage() {
//   pageNumber -= 1;

//   if (pageNumber === 1) {
//     refs.btnBackRef.setAttribute('disabled', '');
//   }

//   displayImagesOnThePage(inputValue);

//   refs.btnNextRef.removeAttribute('disabled');
// }
function onReturnsPreviousPage() {
  pageNumber -= 1;

  if (pageNumber === 1) {
    btnBackRef.setAttribute('disabled', '');
  }

  displayImagesOnThePage(inputValue);

  btnNextRef.removeAttribute('disabled');
}
