import React, { useEffect } from 'react';
import { Grid } from 'semantic-ui-react';

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
            {quiz_types !== null && !setLoading ? (
                <Grid columns={2} padded>
                    <Grid.Column>
                        <QuizTypeForm />
                    </Grid.Column>
                    <Grid.Column>
                        <QuizTypeList quizType={quiz_types} />
                    </Grid.Column>
                </Grid>
            ) : (<Loader isLoading={setLoading} />)}  
        </>
    )
}

export default QuizType;
