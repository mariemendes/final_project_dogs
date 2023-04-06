import React from 'react';
import { useParams } from 'react-router-dom';
import { USERS_GET } from '../../api';
import useFetch from '../../hooks/useFetch';
import Feed from '../Feed/Feed';
import Error from '../Helper/Error';
import Loading from '../Helper/Loading';

const UserProfile = () => {
  const { username } = useParams();
  const { data, loading, error, request } = useFetch();

  React.useEffect(() => {
    const { url, options } = USERS_GET(username);
    request(url, options);
  }, [username, request]);

  if (error) return <Error error={error} />;
  if (loading) return <Loading />;

  if (data)
    return (
      <section className="container mainContainer">
        <h1 className="title">{username}</h1>
        <Feed username={username} />
      </section>
    );
};

export default UserProfile;
