import React, { useEffect, useContext } from 'react';
import DataTable from 'react-data-table-component';
import Moment from 'react-moment';
import { Modal, Button, Image, Header, Divider, Label } from 'semantic-ui-react';

import UserAppsContext from '../../../context/userapps/userAppsContext';

import ActionButton from './ActionButton';

import Loader from '../../layouts/loader/Loader';

const UserApps = () => {
    const userAppsContext = useContext(UserAppsContext);
    const { user_apps, getAllUserApps, setLoading } = userAppsContext;

    useEffect(() => {
        getAllUserApps();
        // eslint-disable-next-line
    },[])

    const columns = [
        {
            name: 'User',
            sortable: true,
            cell: row => <div>{row.userAppUser && row.userAppUser.name}</div>
        },
        {
            name: 'Score',
            selector: 'score',
            sortable: true
        },
        {
            name: 'Application',
            cell: row => <div>
                            <Modal trigger={<Button size="small">View</Button>}>
                                <Modal.Header>{row.userAppUser && row.userAppUser.name}'s Application</Modal.Header>
                                <Modal.Content image>
                                    <Image wrapped size="huge" src={row.userAppQuiz && row.userAppQuiz.image} />
                                    <Modal.Description>
                                        <Header>{row.userAppQuiz && row.userAppQuiz.title}</Header>
                                        <p style={{ textAlign: 'justify' }}>
                                            {row.userAppQuiz && row.userAppQuiz.question}
                                        </p>
                                        <Divider />
                                        <Header as="h3">The Answer</Header>
                                        <p style={{ textAlign: 'justify' }}>
                                            {row.answer}
                                        </p>
                                    </Modal.Description>
                                </Modal.Content>
                            </Modal>
                        </div>
        },
        {
            name: 'Status',
            sortable: true,
            cell: row => <div>{row.userAppUser && row.userAppUser.status === 1 ? (<Label color="yellow">Pending</Label>) : 
                row.userAppUser && row.userAppUser.status === 2 ? (<Label color="red">Denied</Label>) : (<Label color="green">Approved</Label>)}</div>
        },
        {
            name: 'Approved by',
            cell: row => <div>{row.admin_id ? row.userAppAdmin && row.userAppAdmin.name : 'Nobody'}</div>
        },
        {
            name: 'Created at',
            sortable: true,
            cell: row => <div><Moment unix format="lll">{row.created_at}</Moment></div>
        },
        {
            name: 'Updated at',
            sortable: true,
            cell: row => <div>{row.updated_at !== null ? (<Moment unix format="lll">{row.updated_at}</Moment>) : 'No update'}</div>
        },
        {
            name: 'Action',
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
            cell: row => <ActionButton id={row.id} user_id={row.user_id} status={row.userAppUser && row.userAppUser.status} />
        }
    ];

    return (
        <>
            {user_apps !== null && user_apps.length === 0 && !setLoading && (
                <Image src="https://media.giphy.com/media/giXLnhxp60zEEIkq8K/giphy-downsized.gif" centered />
            )}
            {user_apps !== null && !setLoading ? (
                <DataTable
                    title="User Applications"
                    columns={columns}
                    data={user_apps}
                    pagination
                    highlightOnHover
                />
            ) : (
                <Loader isLoading={setLoading} />
            )}
        </>
    )
}

export default UserApps;
