import React, { Children } from 'react';
import { UserContext } from '../../UserContext';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const { login } = React.useContext(UserContext);
  return login ? (
    <div>{children}</div>
  ) : (
    <div>
      <Navigate to="/login" />
    </div>
  );
};

export default ProtectedRoute;
