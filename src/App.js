import React, { Component } from "react";
import "./App.css";
import Searchbar from "./components/Searchbar";
import ImageGallery from "./components/ImageGallery";
import api from "./services/image-service";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import Button from "./components/Button";
import Modal from "./components/Modal";

const Status = {
  IDLE: "idle",
  PENDING: "pending",
  RESOLVED: "resolved",
};

class App extends Component {
  state = {
    images: [],
    status: Status.IDLE,
    currentQuery: "",
    currentPage: 1,
    showModal: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.currentQuery !== this.state.currentQuery) {
      this.handlQuery();
    }
  }

  onFormSubmit = (query) => {
    this.setState({ currentQuery: query, currentPage: 1, images: [] });
  };
  handlQuery = () => {
    this.setState({ status: Status.PENDING });
    setTimeout(() => {
      api
        .fetchImages(this.state.currentQuery, this.state.currentPage)
        .then((response) => {
          const newImages = response.hits.map(
            ({ id, webformatURL, largeImageURL }) => ({
              id,
              webformatURL,
              largeImageURL,
            })
          );

          this.setState((prevState) => ({
            currentPage: prevState.currentPage + 1,
            images: [...prevState.images].concat(newImages),
          }));
        })
        .finally(() => {
          this.setState({ status: Status.RESOLVED });
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: "smooth",
          });
        });
    }, 2000);
  };

  handleMoreClick = () => {
    this.handlQuery();
  };
  handleImgClick = (src) => {
    this.setState({ bigImg: src, showModal: true });
  };
  toggleModal = (event) => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };
  render() {
    const { status, images, showModal, bigImg } = this.state;
    return (
      <>
        <Searchbar onFormSubmit={this.onFormSubmit} />
        {status === "pending" && images.length === 0 ? (
          <Loader
            type="BallTriangle"
            color="#00BFFF"
            height={80}
            width={80}
            className="conteiner"
          />
        ) : (
          <>
            <ImageGallery
              images={this.state.images}
              handleImgClick={this.handleImgClick}
            />
          </>
        )}

        {status === "pending" && images.length > 0 && (
          <Loader
            type="BallTriangle"
            color="#00BFFF"
            height={80}
            width={80}
            className="conteiner"
          />
        )}
        {status === "resolved" && <Button onBtn={this.handleMoreClick} />}
        {showModal && (
          <Modal toggleModal={this.toggleModal}>
            <img src={bigImg} alt="" />
          </Modal>
        )}
      </>
    );
  }
}

export default App;
