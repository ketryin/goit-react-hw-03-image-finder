import React from "react";
import PropTypes from "prop-types";
import "./Button.css";

const Button = ({ onBtn }) => (
  <div className="conteinerBtn">
    <button className="Button" type="button" onClick={onBtn}>
      Load more
    </button>
  </div>
);

Button.propTypes = {
  onBtn: PropTypes.func.isRequired,
};

export default Button;
