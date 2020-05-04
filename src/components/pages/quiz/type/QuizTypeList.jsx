import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Table, Button } from 'semantic-ui-react';
import Moment from 'react-moment';

import QuizTypeContext from '../../../../context/quizType/quizTypeContext';

const QuizTypeList = ({ quizType, indexKey }) => {
    const quizTypeContext = useContext(QuizTypeContext);

    const { deleteQuizType, setCurrentQuizType, clearCurrentQuizType } = quizTypeContext;
    const { id, name, active } = quizType;

    const onDelete = () => {
        deleteQuizType(id);
        clearCurrentQuizType();
    }

    const fetchQuiz = (
        <Table.Row>
            <Table.Cell>{indexKey}</Table.Cell>
            <Table.Cell>{name}</Table.Cell>
            <Table.Cell>{active == 0 ? 'Inactive' : 'Active'}</Table.Cell>
            <Table.Cell><Moment unix format="llll">{created_at}</Moment></Table.Cell>
            <Table.Cell><Moment unix format="llll">{updated_at}</Moment></Table.Cell>
            <Table.Cell>
                <Button icon="edit" color="blue" size="small" onClick={() => setCurrentQuizType(quizType)} />{' '}
                <Button icon="delete" color="red" size="small" onClick={onDelete} />
            </Table.Cell>
        </Table.Row>
    )

    return (
        <>
            <Table basic stackable size="small">
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>#</Table.HeaderCell>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Status</Table.HeaderCell>
                        <Table.HeaderCell>Created at</Table.HeaderCell>
                        <Table.HeaderCell>Updated at</Table.HeaderCell>
                        <Table.HeaderCell>Actions</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {fetchQuiz()}
                </Table.Body>
            </Table>
        </>
    )
}

QuizTypeList.propTypes = {
    quizType: PropTypes.object.isRequired,
    indexKey: PropTypes.number.isRequired
}

export default QuizTypeList;
