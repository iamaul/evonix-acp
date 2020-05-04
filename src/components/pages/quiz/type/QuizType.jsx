import React, { useEffect, useContext } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
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
                {setLoading ? <Loader isLoading={setLoading} /> : quiz_types !== null && !setLoading ? (
                    <Grid.Column>
                        <TransitionGroup>
                            <CSSTransition
                                key={qt.id}
                                timeout={500}
                                classNames="item"
                            >
                                <QuizTypeList quizType={qt} />
                            </CSSTransition>
                        </TransitionGroup>
                    </Grid.Column>
                ) : (
                    <Image src="https://media.giphy.com/media/3o6wNXoESyQu2hlrwI/giphy.gif" size="large" centered />
                    )
                }
            </Grid>
        </>
    )
}

export default QuizType;
