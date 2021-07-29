function fetchImages(currentQuery, currentPage = "1") {
  return fetch(
    `https://pixabay.com/api/?q=${currentQuery}&page=${currentPage}&key=21925746-60d8df6678e20ce47ee1562cb&image_type=photo&orientation=horizontal&per_page=12`
  ).then((response) => {
    if (response.ok) {
      return response.json();
    }

    return Promise.reject(
      new Error(`Нет изображений по запросу ${currentQuery}`)
    );
  });
}

const api = {
  fetchImages,
};

export default api;
