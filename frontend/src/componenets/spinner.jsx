import React from "react";

const Spinner = () => {
  return (
    <div className="app-spinner-wrapper" aria-hidden="false" aria-label="Loading">
      <div className="app-spinner" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default Spinner;
