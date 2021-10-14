import { Redirect, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { getJWT } from '../../utils/token';
import { validateJWT } from '../../actions/authentication';
import { showErrorMessage } from '../../utils/toast';
import Preloader from '../Preloader';

// If user is already authenticated, prevent them from accessing the route
function AuthRoute({ component: Component, ...restOfProps }) {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const token = getJWT();
    validateJWT(token)
      .then(() => {
        setAuthenticated(true);
        showErrorMessage('Please logout before accessing the specified page');
      })
      .catch((e) => {
        setAuthenticated(false);
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
        isAuthenticated ? <Redirect to="/" /> : <Component {...props} />
      }
    />
  );
}

export default AuthRoute;
