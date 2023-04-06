import React from 'react';
import { useParams } from 'react-router-dom';
import { PHOTOS_GET } from '../../api';
import useFetch from '../../hooks/useFetch';
import Error from '../Helper/Error';
import Loading from '../Helper/Loading';
import PhotoContent from './PhotoContent';

const Photo = () => {
  const { id } = useParams();
  const { data, loading, error, request } = useFetch();

  React.useEffect(() => {
    const { url, options } = PHOTOS_GET(id);
    request(url, options);
  }, [id, request]);

  if (error) return <Error error={error} />;
  if (loading) return <Loading />;

  if (data)
    return (
      <section className="container mainContainer">
        <PhotoContent single={true} photo={data} />
      </section>
    );
  else return null;
};

export default Photo;
