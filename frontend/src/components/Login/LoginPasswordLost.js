import React from 'react';
import Input from '../Form/Input';
import Button from '../Form/Button';
import useForm from '../../hooks/useForm';
import useFetch from '../../hooks/useFetch';
import { PASSWORD_LOST } from '../../api';
import Error from '../Helper/Error';
import Head from '../Helper/Head';

const LoginPasswordLost = () => {
  const login = useForm();
  const { data, loading, error, request } = useFetch();

  async function handleSubmit(event) {
    event.preventDefault();
    if (login.validate()) {
      const { url, options } = PASSWORD_LOST({
        email: login.value,
        url: window.location.href.replace('lost', 'reset'),
      });
      const json = await request(url, options);
    }
  }

  return (
    <section className="animeLeft">
      <Head title="Forgot Password" />
      <h1 className="title">Forgot Password ?</h1>
      {data ? (
        <p style={{ color: '#4c1' }}>{data.message}</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <Input label="Email" type="text" name="login" {...login} />
          {loading ? (
            <Button disabled>Sending...</Button>
          ) : (
            <Button>Send Email</Button>
          )}
        </form>
      )}

      <Error error={error} />
    </section>
  );
};

export default LoginPasswordLost;
