import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
let lightbox;
const apiKey = '36752814-0630461e212967e8c9b2204d7';
const apiStart = 'https://pixabay.com/api/';
const searchForm = document.querySelector('.search-form');
const bodyOdy = document.querySelector('body');
const getUrl = async (userRequest, page) => {
  const baseUrl = `${apiStart}?key=${apiKey}&q=${userRequest}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`;
  const response = await fetch(baseUrl);
  const pictureArray = await response.json();
  const picArray = pictureArray.hits;
  return picArray;
};
function loadMorePics(page) {
  pageNumber = page + 1;
  getUrl(searchForm.searchQuery.value, pageNumber).then(picArray => {
    const allPictures = picArray
      .map(
        galleryItem => `<li><a class="gallery__item" href="${galleryItem.largeImageURL}">
    <img class = "gallery__image" src="${galleryItem.webformatURL}" alt="${galleryItem.tags}"/></a></li>`
      )
      .join('');
    galleryBtn.insertAdjacentHTML('beforeend', allPictures);
  });
}

function galeryCreator(e) {
  e.preventDefault();
  getUrl(searchForm.searchQuery.value, 1).then(picArray => {
    const allPictures = picArray
      .map(
        galleryItem => `<li><a class="gallery__item" href="${galleryItem.largeImageURL}">
    <img class = "gallery__image" src="${galleryItem.webformatURL}" alt="${galleryItem.tags}"/></a></li>`
      )
      .join('');
    lightbox = new SimpleLightbox('.gallery a', {
      captionsData: 'alt',
      captionDelay: 250,
    });
    bodyOdy.insertAdjacentHTML('beforeend', allPictures);
    bodyOdy.insertAdjacentHTML(
      'beforeend',
      '<button class="gallery__button">Load more</button>'
    );
  });
}
searchForm.addEventListener('submit', galeryCreator);
const galleryBtn = document.querySelector('.gallery__button');
galleryBtn.addEventListener('click', loadMorePics(page));
