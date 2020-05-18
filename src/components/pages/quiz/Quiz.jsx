import React, { useEffect, useContext, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import Moment from 'react-moment';
import { Button, Image } from 'semantic-ui-react';

import QuizContext from '../../../context/quiz/quizContext';

import Loader from '../../layouts/loader/Loader';

const ExpandedData = ({ data }) => (
    <div>
        <p>
            <Moment unix format="LLLL">Created at {data.created_at}</Moment>, {data.updated_at !== null && (
                <Moment unix format="LLLL">Last updated on {data.updated_at}</Moment>
            )} 
        </p>
        <Divider hidden />
        <Image src={data.image} size="medium" />
        <p>{data.question}</p>
    </div>
);

const Quiz = () => {
    const quizContext = useContext(QuizContext);
    const { quizzes, getAllQuiz, deleteQuiz, setCurrentQuiz, clearCurrentQuiz, setLoading } = quizContext;
    
    useEffect(() => {
        getAllQuiz();
        // eslint-disable-next-line
    }, []);

    const onQuizDelete = useCallback((id) => {
        deleteQuiz(id);
        clearCurrentQuiz();
        // eslint-disable-next-line
    }, []);

    const actions = (
        <Button
            content="Add New"
            color="green"
            size="small"
            as={Link}
            to="/quiz/form"
        />
    );

    const columns = useMemo(() => [
        {
            name: 'Title',
            selector: 'title',
            sortable: true,
            style: {
                fontWeight: 500
            }
        },
        {
            name: 'Image',
            cell: row => <div><Image src={row.image} size="small" /></div>
        },
        {
            name: 'Created by',
            cell: row => <div>{row.quizCreatedBy && row.quizCreatedBy.name}</div>
        },
        {
            name: 'Updated by',
            cell: row => <div>{row.updated_by ? row.quizUpdatedBy && row.quizUpdatedBy.name : 'None'}</div>
        },
        {
            name: 'Created at',
            selector: 'created_at',
            sortable: true,
            cell: row => <div><Moment unix format="lll">{row.created_at}</Moment></div>
        },
        {
            name: 'Updated at',
            selector: 'updated_at',
            sortable: true,
            cell: row => <div>{row.updated_at !== null ? (<Moment unix format="lll">{row.updated_at}</Moment>) : 'No update'}</div>
        },
        {
            name: 'Action',
            button: true,
            cell: (row) => (
                <Button.Group size="small">
                    <Button
                        icon="edit"
                        as={Link}
                        onClick={() => setCurrentQuiz(row)}
                        to="/quiz/form"
                    />
                    <Button
                        icon="delete"
                        color="red"
                        onClick={() => onQuizDelete(row.id)}
                    />
                </Button.Group> 
            )
        }
        // eslint-disable-next-line
    ], []);

    return (
        <>
            {quizzes !== null && quizzes.length === 0 && !setLoading && (
                <Image src="https://media.giphy.com/media/giXLnhxp60zEEIkq8K/giphy-downsized.gif" centered />
            )}
            {quizzes !== null && !setLoading ? (
                <DataTable
                    title="Quiz Scenario"
                    columns={columns}
                    data={quizzes}
                    pagination
                    expandableRows
                    expandableRowsComponent={<ExpandedData />}
                    highlightOnHover
                    defaultSortField="created_at"
                />
            ) : (
                <Loader isLoading={setLoading} />
            )}  
        </>
    )
}

export default Quiz;
