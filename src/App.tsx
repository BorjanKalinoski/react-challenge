import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AuthProvider from './contexts/AuthContext';
import Register from './components/pages/Register';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import ProtectedRoute from './components/routes/ProtectedRoute';
import UserDataProvider from './contexts/UserDataContext';

//TODO
//2. Style header in color mode
//3. Add permissions in firebase auth
// -read permissions
// -delete permissions
// -assign roles permissions
// -edit permissions

function App() {
  return (
    <Router>
      <AuthProvider>
        <UserDataProvider>
          <Switch>
            <ProtectedRoute exact path="/" component={Home} />
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
          </Switch>
        </UserDataProvider>
      </AuthProvider>
    </Router>
  );
}
export default App;
