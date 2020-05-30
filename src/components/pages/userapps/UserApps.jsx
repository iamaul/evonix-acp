import React, { useEffect, useContext, useMemo, useCallback } from 'react';
import DataTable from 'react-data-table-component';
import Moment from 'react-moment';
import { Modal, Button, Image, Header, Divider, Label, Icon } from 'semantic-ui-react';

import UserAppsContext from '../../../context/userapps/userAppsContext';

import Loader from '../../layouts/loader/Loader';

const ExpandedData = ({ data }) => (
    <div>
        <p>
            Created at <Moment unix format="LLLL">{data.created_at}</Moment>{data.updated_at !== null && (<><br/>
                Last updated on <Moment unix format="LLLL">{data.updated_at}</Moment>
            </>)} 
        </p>
        <Divider hidden />
        <Image src={data.userAppQuiz.image} size="small" />
    </div>
);

const UserApps = () => {
    const userAppsContext = useContext(UserAppsContext);
    const { user_apps, getAllUserApps, updateUserApps, setLoading } = userAppsContext;

    useEffect(() => {
        getAllUserApps();
        // eslint-disable-next-line
    }, []);

    const onUserApprove = useCallback((status, id, user_id) => {
        updateUserApps(status, id, user_id);
        // eslint-disable-next-line
    }, []);

    const onUserDeny = useCallback((status, id, user_id) => {
        updateUserApps(status, id, user_id);
        // eslint-disable-next-line
    }, []);

    const columns = useMemo(() => [
        {
            name: 'User',
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
                                <Modal.Content>
                                    <Image size="massive" src={row.userAppQuiz && row.userAppQuiz.image} centered />
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
            selector: 'status',
            sortable: true,
            cell: row => <div>
                            {row.status === 1 ? (<Label color="yellow">Pending</Label>) : 
                                row.status === 2 ? (<Label color="red">Denied</Label>) : (<Label color="green">Approved</Label>)}
                        </div>
        },
        {
            name: 'Responded by',
            cell: row => <div>{row.admin_id ? row.userAppAdmin && row.userAppAdmin.name : 'None'}</div>
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
                row.status === 1 && (
                    <Button.Group size="small">
                        <Button animated="fade" color="green" onClick={() => onUserApprove(3, row.id, row.user_id)}>
                            <Button.Content visible><Icon name="checkmark" /></Button.Content>
                            <Button.Content hidden>Approve</Button.Content>
                        </Button>
                        <Button animated="fade" color="red" onClick={() => onUserDeny(2, row.id, row.user_id)}>
                            <Button.Content visible><Icon name="delete" /></Button.Content>
                            <Button.Content hidden>Deny</Button.Content>
                        </Button>
                    </Button.Group>
                ) 
            )
        }
        // eslint-disable-next-line
    ], []);

    return (
        <>
            {user_apps !== null && !setLoading ? (
                <DataTable
                    title="User Applications"
                    columns={columns}
                    data={user_apps}
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

export default UserApps;
