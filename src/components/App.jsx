import React, { Fragment } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import history from './history';

import AuthState from '../context/auth/AuthState';
import QuizState from '../context/quiz/QuizState';
import UserAppsState from '../context/userapps/UserAppsState';
import BanState from '../context/ban/BanState';

import PrivateRoute from '../routes/PrivateRoute';

import Login from './pages/auth/Login';
import Header from './layouts/header/Header';
import Home from './Home';
import Quiz from './pages/quiz/Quiz';
import QuizForm from './pages/quiz/QuizForm';
import UserApps from './pages/userapps/UserApps';
import Banlist from './pages/banlist/Banlist';
import Footer from './layouts/footer/Footer';

import './App.css';

const App = () => {
    return (
        <>
            <AuthState>
                <QuizState>
                    <UserAppsState>
                        <BanState>
                            <Router history={history}>
                                <Container>
                                    <Switch>
                                        <Route exact path="/" component={Login} />
                                        <Fragment>
                                            <Header />
                                            <PrivateRoute exact path="/dashboard" component={Home} />
                                            <PrivateRoute exact path="/quiz" component={Quiz} />
                                            <PrivateRoute exact path="/quiz/form" component={QuizForm} />
                                            <PrivateRoute exact path="/user_applications" component={UserApps} />
                                            <PrivateRoute exact path="/banlist" component={Banlist} />
                                            <Footer />
                                        </Fragment>
                                    </Switch>
                                </Container>
                            </Router>
                        </BanState>
                    </UserAppsState>
                </QuizState>
            </AuthState>
        </>
    )
}

export default App;
