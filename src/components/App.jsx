import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import AuthState from '../context/auth/AuthState';

import PrivateRoute from '../routes/PrivateRoute';

import Login from './pages/auth/Login';
import Header from './layouts/header/Header';
import Home from './Home';
import QuizType from './pages/quiz/type/QuizType';
import Quiz from './pages/quiz/Quiz';
import QuizAnswer from './pages/quiz/answer/QuizAnswer';
import Footer from './layouts/footer/Footer';

const App = () => {
    return (
        <>
            <AuthState>
                <Router>
                    <Container>
                        <Switch>
                            <Route exact path="/" component={Login} />
                            <Fragment>
                                <Header />
                                <PrivateRoute exact path="/dashboard" component={Home} />
                                <PrivateRoute exact path="/quiz/type" component={QuizType} />
                                <PrivateRoute exact path="/quiz/question" component={Quiz} />
                                <PrivateRoute exact path="/quiz/answer" component={QuizAnswer} />
                                <Footer />
                            </Fragment>
                        </Switch>
                    </Container>
                </Router>
            </AuthState>
        </>
    )
}

export default App;
