import { fetchImages } from './fetch-img';
import { renderGallery } from './render-gallery';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const searchForm = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.btn-load-more');

let query = '';
let page = 1;
let totalHits = 0;
let simpleLightBox;
const per_page = 40;

searchForm.addEventListener('submit', onSearchForm);
loadMoreBtn.addEventListener('click', onLoadMoreBtn);

async function onSearchForm(evt) {
  evt.preventDefault();

  window.scrollTo({ top: 0 });
  page = 1;
  query = evt.currentTarget.searchQuery.value.trim();
  gallery.innerHTML = '';
  loadMoreBtn.classList.add('is-hidden');

  // if (query === '') {
  //   alertNoImagesFound();
  //   return
  // }

  try {
    
    const response = await fetchImages(query, page, per_page);
    renderGallery(response.data.hits);
    totalHits = response.data.totalHits;
    page += 1;
    simpleLightBox = new SimpleLightbox('.gallery a').refresh();
    alertImagesFound();
     
    if (totalHits > per_page) {
      loadMoreBtn.classList.remove('is-hidden');
    }
  }
  catch (error) {
    console.log(error);
  }
}

async function onLoadMoreBtn() {
  try {
    const response = await fetchImages(query, page, per_page);
    renderGallery(response.data.hits);
 page += 1;
    simpleLightBox.destroy();
    simpleLightBox = new SimpleLightbox('.gallery a').refresh();

const totalPages = Math.ceil(response.data.totalHits / per_page);

if (page > totalPages) {
  loadMoreBtn.classList.add('is-hidden');
  alertEndOfSearch();
}

  } catch (error) {
    console.log(error);
  }
 
}

function alertImagesFound() {
  Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
}

function alertNoImagesFound() {
  Notiflix.Notify.failure(
    'Sorry, there are no images matching your search query. Please try again.'
  );
}

function alertEndOfSearch() {
  Notiflix.Notify.failure(
    "We're sorry, but you've reached the end of search results."
  );
}
