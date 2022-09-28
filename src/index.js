import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { fetchImages } from './components/api';
import { createImageCard } from './components/templates';
import { refs } from './components/refs';
// import { onGoesNextPage, onReturnsPreviousPage } from './components/pagination';

// const lightbox = new SimpleLightbox('.gallery a', {
//   /* options */
// });

refs.btnRef.addEventListener('click', onSearchButton);
refs.btnNextRef.addEventListener('click', onGoesNextPage);
refs.btnBackRef.addEventListener('click', onReturnsPreviousPage);

let pageNumber = 0;
let totalHitsRes = 0;
let inputValue = '';
let successMessage = false;

function onSearchButton(e) {
  e.preventDefault();
  inputValue = refs.inputRef.value.trim();

  if (refs.inputRef.value.trim() === '') {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    return;
  }

  successMessage = false;
  pageNumber = 1;

  refs.btnBackRef.setAttribute('disabled', '');
  refs.btnNextRef.removeAttribute('disabled');

  displayImagesOnThePage(inputValue);

  refs.searchFormRef.reset();
}

function displayImagesOnThePage(val) {
  fetchImages(val, pageNumber)
    .then(result => {
      totalHitsRes = result.totalHits;
      return result.hits;
    })
    .then(images => {
      if (totalHitsRes === 0) {
        refs.galleryRef.innerHTML = '';
        refs.btnNextRef.setAttribute('hidden', '');
        refs.btnBackRef.setAttribute('hidden', '');

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
        refs.btnNextRef.setAttribute('hidden', '');
        refs.btnBackRef.setAttribute('hidden', '');
      } else {
        refs.btnNextRef.removeAttribute('hidden');
        refs.btnBackRef.removeAttribute('hidden');
      }

      refs.galleryRef.innerHTML = images
        .map(image => {
          return createImageCard(image);
        })
        .join('');
    })
    .catch(error => console.log(error));

  // let lightbox = new SimpleLightbox('.gallery a');

  window.scrollBy(0, -10000000);
}

// onGoesNextPage(pageNumber, inputValue, totalHitsRes, displayImagesOnThePage);
// onReturnsPreviousPage(pageNumber, inputValue, displayImagesOnThePage);

function onGoesNextPage() {
  pageNumber += 1;

  if (pageNumber === Math.ceil(totalHitsRes / 40)) {
    refs.btnNextRef.setAttribute('disabled', '');
  }

  displayImagesOnThePage(inputValue);

  refs.btnBackRef.removeAttribute('disabled');
}

function onReturnsPreviousPage() {
  pageNumber -= 1;

  if (pageNumber === 1) {
    refs.btnBackRef.setAttribute('disabled', '');
  }

  displayImagesOnThePage(inputValue);

  refs.btnNextRef.removeAttribute('disabled');
}
