import React, { useState } from "react";

const preloadImage = async (url) => {
  const img = new Image();
  img.src = url;
  return new Promise((resolve, reject) => {
    img.onload = async () => {
      resolve(true);
    };
  });
};

const usePreloadImage = () => {
  const [loading, setLoading] = useState(false);

  const preloadImages = (images) => {
    setLoading(true);
    if (images) {
      let promises = images.map((image) => preloadImage(image));

      Promise.all(promises).then(() => {
        setLoading(false);
      });
    }
  };

  return {
    loading,
    preloadImages,
  };
};

export default usePreloadImage;
