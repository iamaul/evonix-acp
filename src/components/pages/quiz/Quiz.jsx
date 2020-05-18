import React, { useEffect, useContext, useState, createRef } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { Grid, Image, Ref, Visibility, Sticky } from 'semantic-ui-react';

import QuizContext from '../../../context/quiz/quizContext';

import QuizForm from './QuizForm';
import QuizList from './QuizList';

import Loader from '../../layouts/loader/Loader';

const Quiz = () => {
    const quizContext = useContext(QuizContext);
    const { quizzes, getAllQuiz, setLoading } = quizContext;

    const calculationsObj = {
        topPassed: false,
        bottomPassed: false,
        topVisible: false,
        bottomVisible: false
    }

    const contextRef = createRef();
    const [calculations, setCalculations] = useState(calculationsObj);

    useEffect(() => {
        getAllQuiz();
        // eslint-disable-next-line
    }, [])

    return (
        <>
            <Ref innerRef={contextRef}>
                <Grid columns={2} padded>
                    <Sticky context={contextRef}>
                        <Grid.Column>
                            <QuizForm />
                        </Grid.Column>
                    </Sticky>
                    <Visibility offset={[10, 10]} onUpdate={setCalculations(calculationsObj)}>
                        <Grid.Column>
                            {quizzes !== null && quizzes.length === 0 && !setLoading && (
                                <Image src="https://i.giphy.com/media/xTeV7uMaW2bRBu15cc/giphy.webp" centered />
                            )}
                            {quizzes !== null && !setLoading ? (
                                <TransitionGroup>
                                    {quizzes.map(quiz => (
                                        <CSSTransition 
                                            key={quiz.id}
                                            timeout={500}
                                            classNames="item"
                                        >
                                            <QuizList quiz={quiz} />
                                        </CSSTransition>
                                    ))}
                                </TransitionGroup>
                                ) : ( <Loader isLoading={setLoading} resizeIcon={32} />)
                            }
                        </Grid.Column>
                    </Visibility>
                </Grid>
            </Ref>
        </>
    )
}

export default Quiz;
