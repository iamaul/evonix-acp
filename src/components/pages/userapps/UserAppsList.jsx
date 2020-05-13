import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import DataTable from 'react-data-table-component';
import { 
    Button,
    Header,
    Image,
    Modal, 
    Divider,
    Label
} from 'semantic-ui-react';
import Swal from 'sweetalert2';

import UserAppsContext from '../../../context/userapps/userAppsContext';

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end'
});

const UserAppsList = ({ userapps, index }) => {
    const userAppsContext = useContext(UserAppsContext);
    const { updateUserApps, error, clearUserAppsErrors } = userAppsContext;

    const { 
        id,
        user_id,
        admin_id,
        score, 
        answer, 
        created_at, 
        updated_at,
        userAppUser, 
        userAppAdmin, 
        userAppQuiz 
    } = userapps;

    useEffect(() => {
        if (error) {
            error.map(err => {
                return Toast.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: err.msg
                });
            });
            clearUserAppsErrors();
        }
    }, [error, clearUserAppsErrors])

    const data = [
        {
            id: id,
            index: index,
            user: userAppUser.name,
            user_id: userAppUser.id,
            score: score,
            answer: answer,
            quizTitle: userAppQuiz.title,
            quizImage: userAppQuiz.image,
            quizQuestion: userAppQuiz.question,
            status: userAppUser.status,
            approved_id: admin_id,
            created_at: created_at,
            updated_at: updated_at
        }
    ];
    const columns = [
        {
            name: '#',
            selector: 'index',
            sortable: true
        },
        {
            name: 'User',
            selector: 'user',
            sortable: true
        },
        {
            name: 'Score',
            selector: 'score',
            sortable: true
        },
        {
            name: 'Application',
            cell: row => <Modal trigger={<Button size="small">View</Button>}>
                            <Modal.Header>{row.user}'s Application</Modal.Header>
                            <Modal.Content image>
                                <Image wrapped size="huge" src={row.quizImage} />
                                <Modal.Description>
                                    <Header>{row.quizTitle}</Header>
                                    <p style={{ textAlign: 'justify' }}>
                                        {row.quizQuestion}
                                    </p>
                                    <Divider />
                                    <Header as="h3">The Answer</Header>
                                    <p style={{ textAlign: 'justify' }}>
                                        {row.answer}
                                    </p>
                                </Modal.Description>
                            </Modal.Content>
                        </Modal>
        },
        {
            name: 'Status',
            sortable: true,
            cell: row => {row.status === 1 ? (<Label color="yellow">Pending</Label>) : 
                row.status === 2 ? (<Label color="red">Denied</Label>) : (<Label color="green">Approved</Label>)}
        },
        {
            name: 'Approved by',
            cell: row => {row.approved_id ? userAppAdmin.name : 'Nobody'}
        },
        {
            name: 'Created at',
            cell: row => <Moment unix format="llll">{row.created_at}</Moment>
        },
        {
            name: 'Updated at',
            cell: row => {row.updated_at !== null ? (<Moment unix format="llll">{row.updated_at}</Moment>) : 'No update'}
        },
        {
            name: 'Action',
            cell: row => <Button.Group size="small">
                            {userAppUser.status !== 3 && (
                                <Button
                                    icon="checkmark"
                                    color="green"
                                    onClick={onApprove(row.id, row.user_id)}
                                />
                            )}
                            {userAppUser.status !== 2 && (
                                <Button
                                    icon="delete"
                                    color="red"
                                    onClick={onDeny(row.id, row.user_id)}
                                />
                            )}
                        </Button.Group>
        }
    ];

    const onApprove = (id, userid) => updateUserApps(1, id, userid);
    const onDeny = (id, userid) => updateUserApps(0, id, userid);

    return (
        <DataTable
            title="User Applications"
            columns={columns}
            data={data}
            pagination
            highlightOnHover
        />
    )
}

UserAppsList.propTypes = {
    userapps: PropTypes.object.isRequired
}

export default UserAppsList;
