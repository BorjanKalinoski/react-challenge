import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AuthProvider from './contexts/AuthContext';
import Register from './components/pages/Register';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import ProtectedRoute from './components/routes/ProtectedRoute';
import UserProvider from './contexts/UserContext';

function App() {
  return (
    <Router>
      <AuthProvider>
        <UserProvider>
          <Switch>
            <ProtectedRoute exact path="/" component={Home} />
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
          </Switch>
        </UserProvider>
      </AuthProvider>
    </Router>
  );
}
export default App;
