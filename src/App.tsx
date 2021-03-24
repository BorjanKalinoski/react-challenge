import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import AuthProvider from "./contexts/AuthContext";
import Register from "./components/Register";
import Home from "./components/Home";
import Login from "./components/Login";
import ProtectedRoute from "./components/routes/ProtectedRoute";

function App() {
    return (

        <Router>
            <AuthProvider>
                <Switch>
                    <ProtectedRoute exact path='/' component={Home}/>
                    <Route path='/register' component={Register}/>
                    <Route path='/login' component={Login}/>
                </Switch>
            </AuthProvider>
        </Router>
    );
}
export default App;
