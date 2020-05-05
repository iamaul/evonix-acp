import React, { useEffect, useContext } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { Grid, Image } from 'semantic-ui-react';

import QuizTypeContext from '../../../../context/quizType/quizTypeContext';

import QuizTypeForm from './QuizTypeForm';
import QuizTypeList from './QuizTypeList';

import Loader from '../../../layouts/loader/Loader';

const QuizType = () => {
    const quizTypeContext = useContext(QuizTypeContext);
    const { quiz_types, getQuizTypes, setLoading } = quizTypeContext;

    useEffect(() => {
        getQuizTypes();
        // eslint-disable-next-line
    }, [])

    return (
        <>
            <Grid columns={2} padded>
                <Grid.Column>
                    <QuizTypeForm />
                </Grid.Column>
                <Grid.Column>
                    {quiz_types !== null && quiz_types.length === 0 && !setLoading && (
                        <Image src="https://media.giphy.com/media/3o6wNXoESyQu2hlrwI/giphy.gif" size="large" centered />
                    )}
                    {quiz_types !== null && !setLoading ? (
                        <TransitionGroup>
                            {quiz_types.map(qt => (
                                <CSSTransition 
                                    key={qt.id}
                                    timeout={500}
                                    classNames="item"
                                >
                                    <QuizTypeList quizType={qt} />
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

export default QuizType;
