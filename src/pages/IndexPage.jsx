import React, { useState } from 'react';
import { Link, BrowserRouter as Router, Route } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import { UserProvider } from '../user';

const IndexPage = () => (
  <UserProvider>
    <AuthForm></AuthForm>
  </UserProvider>
);

export default IndexPage;
