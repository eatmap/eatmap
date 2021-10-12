import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { ToastContainer } from 'react-toastify';

import ProtectedRoute from './components/protected-route';
import LoginPage from './pages/login';
import RegisterPage from './pages/register';
import NoFoundPage from './pages/404';
import SearchPage from './pages/search';

import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Switch>
          <ProtectedRoute exact path="/" component={SearchPage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/register" component={RegisterPage} />
          <Route path="*" component={NoFoundPage} />
        </Switch>
        <ToastContainer theme="colored" />
      </Router>
    </ChakraProvider>
  );
}

export default App;
