import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Feed from '../Feed/Feed';
import UserHeader from './UserHeader';
import UserPhotoPost from './UserPhotoPost';

const User = () => {
  let username = window.localStorage.getItem('username');

  return (
    <section className="container">
      <UserHeader />
      <Routes>
        <Route path="/" element={<Feed username={username} />} />
        <Route path="post" element={<UserPhotoPost />} />
      </Routes>
    </section>
  );
};

export default User;
