import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Button, List } from 'semantic-ui-react';
import Moment from 'react-moment';

import QuizTypeContext from '../../../../context/quizType/quizTypeContext';

const QuizTypeList = ({ quizType }) => {
    const quizTypeContext = useContext(QuizTypeContext);

    const { deleteQuizType, setCurrentQuizType, clearCurrentQuizType } = quizTypeContext;
    const { id, name, active, created_at, updated_at, quizTypeCreatedBy, quizTypeUpdatedBy } = quizType; 

    const onDelete = () => {
        deleteQuizType(id);
        clearCurrentQuizType();
    }

    return (
        <>
            <List 
                animated 
                divided 
                verticalAlign="middle" 
                size="large"
            >
                <List.Item>
                    <List.Content floated="right">
                        <Button.Group size="small">
                            <Button
                                icon="edit"
                                color="blue"
                                onClick={() => setCurrentQuizType(quizType)}
                            />
                            <Button
                                icon="delete"
                                color="red"
                                onClick={onDelete}
                            />
                        </Button.Group>
                    </List.Content>
                    <List.Content>
                        <List.Header>{name}</List.Header>
                        {active === 0 ? 'Inactive' : 'Active'}<br/>
                        {created_at && (
                            <small>
                                Created at <Moment unix format="llll">{created_at}</Moment>by <b>{quizTypeCreatedBy.name}</b><br/>
                            </small>
                        )}
                        {updated_at && (
                            <small>
                                Updated at <Moment unix format="llll">{updated_at}</Moment><br/>
                            </small>
                        )}
                        {quizTypeUpdatedBy.name !== null && (
                            <small>Last updated by <b>{quizTypeUpdatedBy.name}</b></small>
                        )}
                    </List.Content>
                </List.Item>
            </List>
        </>
    )
}

QuizTypeList.propTypes = {
    quizType: PropTypes.object.isRequired
}

export default QuizTypeList;
