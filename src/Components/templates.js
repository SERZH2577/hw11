export function createImageCard(image) {
  const { webformatURL, tags, likes, views, comments, downloads } = image;

  return `<div class="photo-card">
        <img src="${webformatURL}" alt="${tags}" class="img" loading="lazy" />
        <div class="info">
          <p class="info-item">
            Likes:<b> ${likes}</b>
          </p>
          <p class="info-item">
            Views:<b> ${views}</b>
          </p>
          <p class="info-item">
            Comments:<b> ${comments}</b>
          </p>
          <p class="info-item">
            Downloads:<b> ${downloads}</b>
          </p>
        </div>

        
      </div>`;
}
