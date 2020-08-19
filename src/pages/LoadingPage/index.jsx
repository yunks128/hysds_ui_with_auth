import React from "react";

import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./style.scss";

const LoadingPage = () => (
  <div className="loading-page">
    <FontAwesomeIcon icon={faSpinner} spin={true} size="4x" />
    <h2>Loading...</h2>
  </div>
);

export default LoadingPage;
