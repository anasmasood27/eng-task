import React, { useEffect } from "react";
import ResultItem from "./ResultItem";
import Loader from "./Loader";
import usePreloadImage from "./hooks/usePreloadImage";

const ResultList = ({ employees, data, onUpdateEmployee }) => {
  const preload = usePreloadImage();

  useEffect(() => {
    const images = employees.map((employee) => employee.image);
    preload.preloadImages(images);
  }, [employees]);

  if (preload.loading) {
    return <Loader />;
  } else {
    return (
      <div className="result-container">
        {employees.map((i) => (
          <ResultItem
            item={i}
            key={i.id}
            onUpdateEmployee={onUpdateEmployee}
            removeEmployee={data.removeEmployee}
          />
        ))}
      </div>
    );
  }
};

export default ResultList;
