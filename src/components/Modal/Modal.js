import React, { Component } from "react";

import "./Modal.css";
import { createPortal } from "react-dom";

const modalRoot = document.querySelector("#modal-root");

class Modal extends Component {
  state = {};

  componentDidMount() {
    window.addEventListener("keydown", this.handleEscape);
  }

  handleEscape = (event) => {
    if (event.code === "Escape") {
      this.props.toggleModal();
    }
  };

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleEscape);
  }

  handleBackdrop = (event) => {
    if (event.target === event.currentTarget) {
      this.props.toggleModal();
    }
  };

  render() {
    return createPortal(
      <div className="Overlay" onClick={this.handleBackdrop}>
        <div className="Modal">{this.props.children}</div>
      </div>,
      modalRoot
    );
  }
}

export default Modal;
