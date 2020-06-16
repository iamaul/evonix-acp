import React, { useEffect, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import Moment from 'react-moment';
import { Button, Image, Icon, Divider } from 'semantic-ui-react';

import { 
    useQuiz, 
    getAllQuiz, 
    deleteQuiz, 
    setCurrentQuiz, 
    clearCurrentQuiz 
} from '../../../context/quiz/QuizState';

import Loader from '../../layouts/loader/Loader';

const ExpandedData = ({ data }) => (
    <div>
        <Image src={data.image} size="medium" />
        <p><b>{data.title}</b><br/>Created at <Moment unix format="LLLL">{data.created_at}</Moment>{data.updated_at !== null && (<><br/>
                Last updated on <Moment unix format="LLLL">{data.updated_at}</Moment>
            </>)}</p>
        <Divider hidden />
        <p>{data.question}</p>
    </div>
);

const Quiz = () => {
    const [quizState, quizDispatch] = useQuiz();
    const { quizzes, setLoading } = quizState;
    
    useEffect(() => {
        getAllQuiz(quizDispatch);
    }, [quizDispatch]);

    const onQuizDelete = useCallback((id) => {
        deleteQuiz(quizDispatch, id);
        clearCurrentQuiz(quizDispatch);
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
                fontWeight: 'bold'
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
            allowOverflow: true,
            cell: (row) => (
                <Button.Group size="small">
                    <Button animated="fade" as={Link} onClick={() => setCurrentQuiz(row)} to="/quiz/form">
                        <Button.Content visible><Icon name="edit" /></Button.Content>
                        <Button.Content hidden>Edit</Button.Content>
                    </Button>
                    <Button animated="fade" color="red" onClick={() => onQuizDelete(row.id)}>
                        <Button.Content visible><Icon name="delete" /></Button.Content>
                        <Button.Content hidden>Delete</Button.Content>
                    </Button>
                </Button.Group> 
            )
        }
        // eslint-disable-next-line
    ], []);

    return (
        <>
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
                    actions={actions}
                />
            ) : (
                <Loader isLoading={setLoading} />
            )}  
        </>
    )
}

export default Quiz;
