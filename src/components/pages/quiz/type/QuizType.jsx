import React, { useEffect, useContext } from 'react';
import { Grid, Image, Transition, List } from 'semantic-ui-react';

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
                    {quiz_types !== null && quiz_types.length === 0 && !setLoading ? (
                        <Image src="https://media.giphy.com/media/3o6wNXoESyQu2hlrwI/giphy.gif" size="large" centered />
                    ) : (
                        quiz_types !== null && !setLoading ? (
                            quiz_types.map(qt => (
                                <Transition.Group
                                    key={qt.id}
                                    as={List}
                                    duration={200}
                                    divided
                                    size="large"
                                    verticalAlign="middle"
                                >
                                    <QuizTypeList quizType={qt} />
                                </Transition.Group>
                            ))
                        ) : (
                            <Loader isLoading={setLoading} resizeIcon={32} />
                        )
                    )}
                </Grid.Column>
            </Grid>
        </>
    )
}

export default QuizType;
