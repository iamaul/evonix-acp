import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Table, Button, Image } from 'semantic-ui-react';
import Moment from 'react-moment';

import QuizTypeContext from '../../../../context/quizType/quizTypeContext';
import AuthContext from '../../../../context/auth/authContext';

import Loader from '../../../layouts/loader/Loader';

const QuizTypeList = ({ quizType }) => {
    const quizTypeContext = useContext(QuizTypeContext);
    const authContext = useContext(AuthContext);

    const { user } = authContext;
    const { deleteQuizType, setCurrentQuizType, clearCurrentQuizType, setLoading } = quizTypeContext;
    const { id } = quizType;

    const onDelete = () => {
        deleteQuizType(id);
        clearCurrentQuizType();
    }

    return (
        <>
            {setLoading ? <Loader isLoading={setLoading} /> : quizType === null ? (
                <Image src="https://media.giphy.com/media/3o6wNXoESyQu2hlrwI/giphy.gif" size="small" />
            ) : (
                <Table basic="very" stackable size="small">
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>#</Table.HeaderCell>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>Created by</Table.HeaderCell>
                            <Table.HeaderCell>Updated by</Table.HeaderCell>
                            <Table.HeaderCell>Created at</Table.HeaderCell>
                            <Table.HeaderCell>Updated at</Table.HeaderCell>
                            <Table.HeaderCell>Actions</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {quizType.map((item, i) => {
                            <Table.Row key={item.id}>
                                <Table.Cell>{i}</Table.Cell>
                                <Table.Cell>{item.name}</Table.Cell>
                                {user && user.id === item.created_by && (
                                    <Table.Cell>{user && user.name}</Table.Cell>
                                )}
                                {user && user.id === item.updated_by && (
                                    <Table.Cell>{user && user.name}</Table.Cell>
                                )}
                                <Table.Cell><Moment unix format="llll">{item.created_at}</Moment></Table.Cell>
                                <Table.Cell><Moment unix format="llll">{item.updated_at}</Moment></Table.Cell>
                                <Table.Cell>
                                    <Button icon="edit" size="small" onClick={() => setCurrentQuizType(quizType)} />
                                    <Button icon="delete" size="small" onClick={onDelete} />
                                </Table.Cell>
                            </Table.Row>
                        })}
                    </Table.Body>
                </Table>
            )}  
        </>
    )
}

QuizTypeList.propTypes = {
    quizType: PropTypes.object.isRequired
}

export default QuizTypeList;
