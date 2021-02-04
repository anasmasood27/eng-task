import React from "react";

const ResultItem = ({ item }) => (
  <div className="result-item">
    <div>
      <img src={item.image} alt="profile" />
      <div className="demo">
        <div>
          {item.first_name} {item.last_name}
        </div>
        <div className="title">{item.title}</div>
      </div>
    </div>

    <div>
      <div className="technicality">{item.city}</div>
    </div>
  </div>
);

export default ResultItem;
