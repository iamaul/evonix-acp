import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Button, List } from 'semantic-ui-react';
import Moment from 'react-moment';

import QuizTypeContext from '../../../../context/quizType/quizTypeContext';

const QuizTypeList = ({ quizType }) => {
    const quizTypeContext = useContext(QuizTypeContext);

    const { deleteQuizType, setCurrentQuizType, clearCurrentQuizType } = quizTypeContext;

    const onDelete = (id) => {
        deleteQuizType(id);
        clearCurrentQuizType();
    }

    const fetchQuizType = () => {
        return quizType.map((item, i) => {
            return (
                <List.Item key={item.id}>
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
                                onClick={onDelete(item.id)}
                            />
                        </Button.Group>
                    </List.Content>
                    {`#${i}. `}
                    <List.Content>
                        <List.Header>
                            {item.name}
                        </List.Header>
                        {item.status === 0 ? 'Inactive' : 'Active'}<br/>
                        <small>
                            Created at <Moment unix format="lll">{item.created_at}</Moment><br/>
                            Updated at <Moment unix format="lll">{item.updated_at}</Moment>
                        </small>
                    </List.Content>
                </List.Item>
            )
        })
    }

    return (
        <>
            {fetchQuizType()}
        </>
    )
}

QuizTypeList.propTypes = {
    quizType: PropTypes.object.isRequired
}

export default QuizTypeList;
