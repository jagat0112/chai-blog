import React, { useEffect, useState } from "react";
import service from "../../appwrite/config";

const Images = ({ fileId, className }) => {
  const [img, setImg] = useState("");
  useEffect(() => {
    service.previewFile(fileId).then((res) => setImg(res));
  }, []);

  return <img className={`image ${className}`} src={img.href} alt=""></img>;
};

export default Images;
