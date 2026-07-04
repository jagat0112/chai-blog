import React, { useEffect, useState } from "react";
import service from "../../appwrite/config";

const Images = ({ fileId, alt = "", className = "" }) => {
  const [src, setSrc] = useState(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let isMounted = true;
    setSrc(null);
    setFailed(false);

    if (!fileId) {
      setFailed(true);
      return;
    }

    service.previewFile(fileId).then((res) => {
      if (!isMounted) return;
      if (res) {
        setSrc(res.href ?? res);
      } else {
        setFailed(true);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [fileId]);

  if (failed || !src) {
    return (
      <div className={`image image-placeholder ${className}`} role="img" aria-label={alt}>
        <span>🍵</span>
      </div>
    );
  }

  return (
    <img
      className={`image ${className}`}
      src={src}
      alt={alt}
      onError={() => setFailed(true)}
      loading="lazy"
    />
  );
};

export default Images;
