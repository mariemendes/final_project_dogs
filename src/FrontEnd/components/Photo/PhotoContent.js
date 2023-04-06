import React from 'react';
import { Link } from 'react-router-dom';
import styles from './PhotoContent.module.css';
import { UserContext } from '../../UserContext';
import PhotoDelete from './PhotoDelete';

const PhotoContent = ({ photo, single }) => {
  const user = React.useContext(UserContext);

  return (
    <div className={`${styles.photo} ${single ? styles.single : ''}`}>
      {' '}
      <div className={styles.img}>
        <img
          src={`data:${photo.contentType};base64,${photo.data}`}
          alt={`${photo.petname}`}
        />
      </div>
      <div className={styles.details}>
        <p className={styles.author}>
          {user.data && user.data.username === photo.username ? (
            <PhotoDelete id={photo.id} />
          ) : (
            <Link to={`/profile/${photo.username}`}>@{photo.username}</Link>
          )}
        </p>
        <h1 className="title">
          <Link to={`/photo/${photo.id}`}>{photo.petname}</Link>
        </h1>
        <ul className={styles.attributes}>
          <li>{photo.petweight} kg</li>
          <li>{photo.petage} y-o</li>
        </ul>
      </div>
    </div>
  );
};

export default PhotoContent;
