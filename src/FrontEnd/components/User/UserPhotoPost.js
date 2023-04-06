import React from 'react';
import styles from './UserPhotoPost.module.css';
import useForm from '../../hooks/useForm';
import useFetch from '../../hooks/useFetch';
import Input from '../Form/Input';
import Button from '../Form/Button';
import Error from '../Helper/Error';
import { PHOTO_POST } from '../../api';
import { useNavigate } from 'react-router-dom';

const UserPhotoPost = () => {
  const name = useForm();
  const age = useForm('number');
  const weight = useForm('number');
  const [img, setImg] = React.useState({});
  const { data, error, loading, request } = useFetch();
  // const [data,setData] = useFetch(null);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (data) {
      navigate('/account');
    }
  }, [data, navigate]);

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData();
    formData.append('petimg', img.raw);
    formData.append('petname', name.value);
    formData.append('petweight', weight.value);
    formData.append('petage', age.value);

    const token = window.localStorage.getItem('token');
    const { url, options } = PHOTO_POST(formData, token);
    request(url, options);
  }
  function handleImgChange(event) {
    const file = event.target.files && event.target.files[0];
    if (file) {
      setImg({
        preview: URL.createObjectURL(file),
        raw: file,
      });
    }
  }
  return (
    <section className={`${styles.photoPost} animeLeft`}>
      <form onSubmit={handleSubmit}>
        <Input label="Nome" type="text" name="petname" {...name} />
        <Input label="Weight" type="number" name="petweight" {...weight} />
        <Input label="Age" type="number" name="petage" {...age} />
        <input className={styles.file} type="file" onChange={handleImgChange} />
        {loading ? (
          <Button disabled={true}>Posting ...</Button>
        ) : (
          <Button>Post!</Button>
        )}
        <Error error={error} />
      </form>
      {img.preview && (
        <div
          className={styles.preview}
          style={{ backgroundImage: `url('${img.preview}')` }}
        ></div>
      )}
    </section>
  );
};

export default UserPhotoPost;
