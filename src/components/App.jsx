import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import AuthState from '../context/auth/AuthState';
import QuizState from '../context/quiz/QuizState';
import UserAppsState from '../context/userapps/UserAppsState';

import PrivateRoute from '../routes/PrivateRoute';

import Login from './pages/auth/Login';
import Header from './layouts/header/Header';
import Home from './Home';
import Quiz from './pages/quiz/Quiz';
import UserApps from './pages/userapps/UserApps';
import Footer from './layouts/footer/Footer';

import './App.css';

const App = () => {
    return (
        <>
            <AuthState>
                <QuizState>
                    <UserAppsState>
                        <Router>
                            <Container>
                                <Switch>
                                    <Route exact path="/" component={Login} />
                                    <Fragment>
                                        <Header />
                                        <PrivateRoute exact path="/dashboard" component={Home} />
                                        <PrivateRoute exact path="/quiz" component={Quiz} />
                                        <PrivateRoute exact path="/user_applications" component={UserApps} />
                                        <Footer />
                                    </Fragment>
                                </Switch>
                            </Container>
                        </Router>
                    </UserAppsState>
                </QuizState>
            </AuthState>
        </>
    )
}

export default App;
