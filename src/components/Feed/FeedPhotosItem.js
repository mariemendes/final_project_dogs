import React from 'react';
import styles from './FeedPhotosItem.module.css';

const FeedPhotosItem = ({ photo, setModalPhoto }) => {
  function handleClick() {
    setModalPhoto(photo);
  }
  return (
    <li className={styles.photo} onClick={handleClick}>
      <img
        src={`data:${photo.contentType};base64,${photo.data}`}
        alt={`${photo.petname}`}
      ></img>
    </li>
  );
};

export default FeedPhotosItem;
