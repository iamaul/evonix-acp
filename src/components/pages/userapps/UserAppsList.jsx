import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { 
    Table, 
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

    const appModal = (
        <Modal trigger={<Button>View</Button>}>
            <Modal.Header>{userAppUser && userAppUser.name}'s Application</Modal.Header>
            <Modal.Content image>
                <Image wrapped size="huge" src={userAppQuiz && userAppQuiz.image} />
                <Modal.Description>
                    <Header>{userAppQuiz && userAppQuiz.title}</Header>
                    <p style={{ textAlign: 'justify' }}>
                        {userAppQuiz && userAppQuiz.question}
                    </p>
                    <Divider />
                    <Header as="h3">The Answer</Header>
                    <p style={{ textAlign: 'justify' }}>
                        {answer}
                    </p>
                </Modal.Description>
            </Modal.Content>
        </Modal>  
    )

    let statusName = '';
    switch (userAppUser && userAppUser.status) {
        case 1: statusName = <Label color="yellow">Pending</Label>; break;
        case 2: statusName = <Label color="red">Denied</Label>; break;
        case 3: statusName = <Label color="green">Approved</Label>; break;
        default: statusName = <Label>Not submitted yet</Label>;
    }

    const onApprove = () => updateUserApps(1, id, user_id);
    const onDeny = () => updateUserApps(0, id, user_id);

    return (
        <>
            <Table.Row>
                <Table.Cell>{index}</Table.Cell>
                <Table.Cell>{userAppUser && userAppUser.name}</Table.Cell>
                <Table.Cell>{score}</Table.Cell>
                <Table.Cell>{appModal}</Table.Cell>
                <Table.Cell>{statusName}</Table.Cell>
                <Table.Cell>
                    {admin_id ? userAppAdmin && userAppAdmin.name : ('Nobody')}
                </Table.Cell>
                <Table.Cell>
                    {created_at && (
                        <Moment unix format="llll">{created_at}</Moment>
                    )}
                </Table.Cell>
                <Table.Cell>
                    {updated_at && updated_at !== null ? 
                        (<Moment unix format="llll">{updated_at}</Moment>)
                        : ('No update')
                    }
                </Table.Cell>
                <Table.Cell>
                    <Button.Group size="small">
                        <Button
                            icon="checkmark"
                            color="green"
                            onClick={onApprove}
                        />
                        <Button
                            icon="delete"
                            color="red"
                            onClick={onDeny}
                        />
                    </Button.Group>
                </Table.Cell>
            </Table.Row>
        </>
    )
}

UserAppsList.propTypes = {
    userapps: PropTypes.object.isRequired
}

export default UserAppsList;
