import React, { useEffect, useContext } from 'react';
import { Grid, Image, Button, Transition, List } from 'semantic-ui-react';
import Moment from 'react-moment';

import QuizTypeContext from '../../../../context/quizType/quizTypeContext';

import QuizTypeForm from './QuizTypeForm';
// import QuizTypeList from './QuizTypeList';

import Loader from '../../../layouts/loader/Loader';

const QuizType = () => {
    const quizTypeContext = useContext(QuizTypeContext);
    const { 
        quiz_types, 
        getQuizTypes, 
        setLoading,
        deleteQuizType, 
        setCurrentQuizType, 
        clearCurrentQuizType 
    } = quizTypeContext;

    useEffect(() => {
        getQuizTypes();
        // eslint-disable-next-line
    }, [])

    const onDelete = () => {
        deleteQuizType(id);
        clearCurrentQuizType();
    }

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
                                <Transition.Group duration={300}>
                                    <List 
                                        animated 
                                        divided
                                        size="large"
                                        verticalAlign="middle"
                                    >
                                        <List.Item key={qt.id}>
                                            <List.Content floated="right">
                                                <Button.Group size="small">
                                                    <Button
                                                        icon="edit"
                                                        color="blue"
                                                        onClick={() => setCurrentQuizType(quiz_types)}
                                                    />
                                                    <Button
                                                        icon="delete"
                                                        color="red"
                                                        onClick={onDelete}
                                                    />
                                                </Button.Group>
                                            </List.Content>
                                            <List.Content>
                                                <List.Header>{qt.name}</List.Header>
                                                {qt.active === 0 ? 'Inactive' : 'Active'}<br/>
                                                {qt.created_at && qt.updated_at && (
                                                    <small>
                                                        Created at <Moment unix format="llll">{qt.created_at}</Moment><br/>
                                                        Updated at <Moment unix format="llll">{qt.updated_at}</Moment>
                                                    </small>
                                                )}
                                            </List.Content>
                                        </List.Item>
                                    </List>
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
