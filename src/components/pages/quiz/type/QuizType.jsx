import React, { useEffect, useContext } from 'react';
import { Grid, Image, Transition, List } from 'semantic-ui-react';

import QuizTypeContext from '../../../../context/quizType/quizTypeContext';

import QuizTypeForm from './QuizTypeForm';
import QuizTypeList from './QuizTypeList';

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
                    {quiz_types !== null && !setLoading ? (
                        <Transition.Group
                            as={List}
                            duration={500}
                            divided
                            size="large"
                            verticalAlign="middle"
                        >
                            <QuizTypeList quizType={quiz_types} />
                        </Transition.Group>
                    ) : (
                        <Image src="https://media.giphy.com/media/3o6wNXoESyQu2hlrwI/giphy.gif" size="large" centered />
                    )}
                </Grid.Column>
            </Grid>
        </>
    )
}

export default QuizType;
