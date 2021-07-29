import React from "react";
import "./ImageGallery.css";

import PropTypes from "prop-types";
import ImageGalleryItem from "../ImageGalleryItem";

const ImageGallery = ({ images, handleImgClick }) => (
  <ul className="ImageGallery">
    {images.map(({ id, webformatURL, largeImageURL }) => (
      <ImageGalleryItem
        key={id}
        handleImgClick={handleImgClick}
        largeImageURL={largeImageURL}
        webformatURL={webformatURL}
      />
    ))}
  </ul>
);

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ),
};

export default ImageGallery;
