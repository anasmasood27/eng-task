import React from "react";
import ResultItem from "./ResultItem";

const ResultList = ({ employees }) => (
  <div className="result-container">
    {employees.map((i) => (
      <ResultItem item={i} key={i.id} />
    ))}
  </div>
);

export default ResultList;
