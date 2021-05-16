import PrivateRoute from 'components/PrivateRoute';
import { AuthProvider } from 'context/AuthContext';
import Home from 'pages/Home';
import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'scss/App.scss';

const Login = lazy(() => import('pages/Login'));
const PasswordReset = lazy(() => import('pages/PasswordReset'));
const Register = lazy(() => import('pages/Register'));
const ChangePassword = lazy(() => import('pages/ChangePassword'));
const Profile = lazy(() => import('pages/Profile'));
const ProfilePassword = lazy(() => import('pages/ProfilePassword'));
const NotFound = lazy(() => import('pages/NotFound'));

const App = () => {
  return (
    <>
      <AuthProvider>
        <Router>
          <Suspense fallback={null}>
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <Route path="/password-reset/change" component={ChangePassword} />
              <Route path="/password-reset" component={PasswordReset} />
              <PrivateRoute path="/account/edit" component={Profile} />
              <PrivateRoute path="/account/password" component={ProfilePassword} />
              <Route component={NotFound} />
            </Switch>
          </Suspense>
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
