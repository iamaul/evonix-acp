import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Button, List, Image } from 'semantic-ui-react';
import Moment from 'react-moment';

import QuizContext from '../../../context/quiz/quizContext';

const QuizList = ({ quizzes }) => {
    const quizContext = useContext(QuizContext);

    const { deleteQuiz, setCurrentQuiz, clearCurrentQuiz } = quizContext;
    const { id, title, question, image, created_at, updated_at, quizCreatedBy, quizUpdatedBy } = quizzes; 

    const onDelete = () => {
        deleteQuiz(id);
        clearCurrentQuiz();
    }

    return (
        <>
            <List 
                animated 
                divided 
                verticalAlign="middle" 
                size="large"
                celled
            >
                <List.Item>
                    <List.Content floated="right">
                        <Button.Group size="small">
                            <Button
                                icon="edit"
                                color="blue"
                                onClick={() => setCurrentQuiz(quizzes)}
                                disabled
                            />
                            <Button
                                icon="delete"
                                color="red"
                                onClick={onDelete}
                            />
                        </Button.Group>
                    </List.Content>
                    <List.Content>
                        {image && (
                            <Image avatar src={`http://101.50.3.61:5000/public/quiz/images/${image}`} />
                        )}
                        <List.Header>{title}</List.Header>
                        {question && (
                            {question}
                        )}<br/>
                        {created_at && (
                            <small>
                                Created at <Moment unix format="llll">{created_at}</Moment>{quizCreatedBy && quizCreatedBy.name && (
                                    <> by <b>{quizCreatedBy.name}</b></>
                                )}
                                <br/>
                            </small>
                        )}
                        {updated_at && (
                            <small>
                                Updated at <Moment unix format="llll">{updated_at}</Moment>{quizUpdatedBy && quizUpdatedBy.name && (
                                    <> by <b>{quizUpdatedBy.name}</b></>         
                                )}
                            </small>
                        )}
                    </List.Content>
                </List.Item>
            </List>
        </>
    )
}

QuizList.propTypes = {
    quizzes: PropTypes.object.isRequired
}

export default QuizList;
