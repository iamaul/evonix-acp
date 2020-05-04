import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Button, List } from 'semantic-ui-react';
import Moment from 'react-moment';

import QuizTypeContext from '../../../../context/quizType/quizTypeContext';

const QuizTypeList = ({ quizType }) => {
    const quizTypeContext = useContext(QuizTypeContext);

    const { deleteQuizType, setCurrentQuizType, clearCurrentQuizType } = quizTypeContext;
    const { id, name, active, created_at, updated_at } = quizType;

    const onDelete = () => {
        deleteQuizType(id);
        clearCurrentQuizType();
    }

    return (
        <>
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
                    {name && (
                        <List.Header>{name}</List.Header>
                    )}
                    {active === 0 ? 'Inactive' : 'Active'}<br/>
                    {created_at && updated_at && (
                        <small>
                            Created at <Moment unix format="llll">{created_at}</Moment><br/>
                            Updated at <Moment unix format="llll">{updated_at}</Moment>
                        </small>
                    )}
                </List.Content>
            </List.Item>
        </>
    )
}

QuizTypeList.propTypes = {
    quizType: PropTypes.object.isRequired
}

export default QuizTypeList;
