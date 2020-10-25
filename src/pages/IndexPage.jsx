import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ContextUser } from '../user';

const IndexPage = () => {
  const user = useContext(ContextUser);

  return (
    <>
      <h1>Hellow, {user.state.name}</h1>
      <Link to='/auth'>Auth</Link>
      <Link to='/tasks'>Tasks</Link>
    </>
  );
};

export default IndexPage;
