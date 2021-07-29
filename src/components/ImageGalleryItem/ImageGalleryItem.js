import React, { Component } from "react";
import "./ImageGalleryItem.css";

class ImageGalleryItem extends Component {
  state = {};
  onImageClick = (src) => {
    this.props.handleImgClick(src);
  };

  render() {
    return (
      <li className="ImageGalleryItem">
        <img
          src={this.props.webformatURL}
          alt=""
          className="ImageGalleryItem-image"
          data-source={this.props.largeImageURL}
          onClick={() => this.onImageClick(this.props.largeImageURL)}
        />
      </li>
    );
  }
}

export default ImageGalleryItem;
