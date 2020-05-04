import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Table, Button } from 'semantic-ui-react';
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
            <Table basic stackable size="small">
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Status</Table.HeaderCell>
                        <Table.HeaderCell>Created at</Table.HeaderCell>
                        <Table.HeaderCell>Updated at</Table.HeaderCell>
                        <Table.HeaderCell>Actions</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    <Table.Row>
                        {name && (
                            <Table.Cell>{name}</Table.Cell>
                        )}
                        {active && (
                            <Table.Cell>{active == 0 ? 'Inactive' : 'Active'}</Table.Cell>
                        )}
                        {created_at && (
                            <Table.Cell><Moment unix format="lll">{created_at}</Moment></Table.Cell>
                        )}
                        {updated_at && (
                            <Table.Cell><Moment unix format="lll">{updated_at}</Moment></Table.Cell>
                        )}
                        <Table.Cell>
                            <Button icon="edit" color="blue" size="small" onClick={() => setCurrentQuizType(quizType)} />{' '}
                            <Button icon="delete" color="red" size="small" onClick={onDelete} />
                        </Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table>
        </>
    )
}

QuizTypeList.propTypes = {
    quizType: PropTypes.object.isRequired
}

export default QuizTypeList;
