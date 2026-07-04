// SkeletonLoader.js
import React from "react";
import "./SkeletonLoader.css";

const SkeletonLoader = () => (
  <div className="skeleton-loader">
    <div className="skeleton-header"></div>
    <div className="skeleton-title"></div>
    <div className="skeleton-input"></div>
    <div className="skeleton-input"></div>
    <div className="skeleton-checkbox"></div>
    <div className="skeleton-button"></div>
  </div>
);

export default SkeletonLoader;
