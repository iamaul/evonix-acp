import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import Login from '../components/pages/auth/Login';
import Header from '../components/layouts/header/Header';
import Home from '../components/Home';
import QuizType from './pages/quiz/type/QuizType';
import Quiz from './pages/quiz/Quiz';
import QuizAnswer from './pages/quiz/answer/QuizAnswer';
import Footer from '../components/layouts/footer/Footer';

const App = () => {
    return (
        <>
            <Router>
                <Container>
                    <Switch>
                        <Route exact path="/" component={Login} />
                        <Fragment>
                            <Header />
                            <Route exact path="/dashboard" component={Home} />
                            <Route exact path="/quiz/type" component={QuizType} />
                            <Route exact path="/quiz/question" component={Quiz} />
                            <Route exact path="/quiz/answer" component={QuizAnswer} />
                            <Footer />
                        </Fragment>
                    </Switch>
                </Container>
            </Router>
        </>
    )
}

export default App;
