import { Redirect, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { getJWT } from '../../utils/token';
import { validateJWT } from '../../actions/authentication';
import { showErrorMessage } from '../../utils/toast';
import Preloader from '../Preloader';

function ProtectedRoute({ component: Component, ...restOfProps }) {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const token = getJWT();
    validateJWT(token)
      .then(() => {
        setAuthenticated(true);
        setLoading(false);
      })
      .catch((e) => {
        showErrorMessage(e.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Preloader />;
  }

  return (
    <Route
      {...restOfProps}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
}

export default ProtectedRoute;
