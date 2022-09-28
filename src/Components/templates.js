export function createImageCard({
  webformatURL,
  largeImageURL,
  tags,
  likes,
  views,
  comments,
  downloads,
}) {
  return `
    <div class="photo-card">
    <a href="${largeImageURL}">
      <img src="${webformatURL}" alt="${tags}" class="img" loading="lazy" />
    </a>
      <div class="info">
        <p class="info-item">
        <b>Likes:</b> ${likes}
        </p>
        <p class="info-item">
        <b>Views:</b> ${views}
        </p>
        <p class="info-item">
        <b>Comments:</b> ${comments}
        </p>
        <p class="info-item">
        <b>Downloads:</b> ${downloads}
        </p>
      </div>

    </div>
  `;

  // `
  // <div class="photo-card">
  // <a href="images/image2.jpg"><img src="${webformatURL}" alt="${tags}" title="" class="img" loading="lazy"/></a>
  // </div>
  // `;
}

// export function createsPageSwitchingButtons() {
//   return `
//     <button type="button" class="btn-switching btn-back-js" hidden="" disabled>Back</button>
//     <button type="button" class="btn-switching btn-next-js" hidden="">Next</button>
//   `;
// }
