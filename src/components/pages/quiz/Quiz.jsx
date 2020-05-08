import React, { useEffect, useContext } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { Grid, Image } from 'semantic-ui-react';

import QuizContext from '../../../context/quiz/quizContext';

import QuizForm from './QuizForm';
import QuizList from './QuizList';

import Loader from '../../layouts/loader/Loader';

const Quiz = () => {
    const quizContext = useContext(QuizContext);
    const { quizzes, getAllQuiz, setLoading } = quizContext;

    useEffect(() => {
        getAllQuiz();
        // eslint-disable-next-line
    }, [])

    return (
        <>
            <Grid columns={2} padded>
                <Grid.Column>
                    <QuizForm />
                </Grid.Column>
                <Grid.Column>
                    {quizzes !== null && quizzes.length === 0 && !setLoading && (
                        <Image src="https://i.giphy.com/media/xTeV7uMaW2bRBu15cc/giphy.webp" centered />
                    )}
                    {quizzes !== null && !setLoading ? (
                        <TransitionGroup>
                            {quizzes.map(qt => (
                                <CSSTransition 
                                    key={qt.id}
                                    timeout={500}
                                    classNames="item"
                                >
                                    <QuizList quiz={qt} />
                                </CSSTransition>
                            ))}
                        </TransitionGroup>
                        ) : ( <Loader isLoading={setLoading} resizeIcon={32} />)
                    }
                </Grid.Column>
            </Grid>
        </>
    )
}

export default Quiz;
