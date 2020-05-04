import React, { useEffect, useContext } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Grid, Image } from 'semantic-ui-react';

import QuizTypeContext from '../../../../context/quizType/quizTypeContext';

import QuizTypeForm from './QuizTypeForm';
import QuizTypeList from './QuizTypeList';
// import Loader from '../../../layouts/loader/Loader';

const QuizType = () => {
    const quizTypeContext = useContext(QuizTypeContext);
    const { quiz_types, getQuizTypes, setLoading } = quizTypeContext;

    useEffect(() => {
        getQuizTypes();
        // eslint-disable-next-line
    }, [])

    return (
        <>
            {quiz_types !== null & !setLoading ? (
                <Grid columns={2} padded>
                    <Grid.Column>
                        <QuizTypeForm />
                    </Grid.Column>
                    <TransitionGroup>
                        {quiz_types.map((qt, i) => {
                            <CSSTransition
                                key={qt.id}
                                timeout={500}
                                classNames="item"
                            >
                                <Grid.Column>
                                    <QuizTypeList quizType={qt} indexKey={i} />
                                </Grid.Column>
                            </CSSTransition>
                        })}
                    </TransitionGroup>
                </Grid>
            ) : (
                <Image src="https://media.giphy.com/media/3o6wNXoESyQu2hlrwI/giphy.gif" size="large" centered />
            )}
        </>
    )
}

export default QuizType;
