import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { 
    Table, 
    Button,
    Header,
    Image,
    Modal, 
    Divider
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

    const { 
        user_id,
        userAppUser, 
        admin_id, 
        userAppAdmin, 
        userAppQuiz, 
        score, 
        answer, 
        created_at, 
        updated_at 
    } = userapps;

    const onApprove = () => updateUserApps(1, user_id);
    const onDeny = () => updateUserApps(0, user_id);

    const appModal = (
        <Modal trigger={<Button>View</Button>}>
            <Modal.Header>Application</Modal.Header>
            <Modal.Content image>
                <Image wrapped size="medium" src={userAppQuiz && userAppQuiz.image} />
                <Modal.Description>
                    <Header>{userAppQuiz && userAppQuiz.title}</Header>
                    <p style={{ textAlign: 'justify' }}>
                        {userAppQuiz && userAppQuiz.question}
                    </p>
                    <Divider />
                    <p style={{ textAlign: 'justify' }}>
                        {answer}
                    </p>
                </Modal.Description>
            </Modal.Content>
        </Modal>  
    )

    let statusName = '';
    switch (userAppUser && userAppUser.status) {
        case 1: statusName = 'Pending'; break;
        case 2: statusName = 'Denied'; break;
        case 3: statusName = 'Approved'; break;
        default: statusName = 'Not submitted yet';
    }

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
                            onClick={onApprove}
                        />
                        <Button
                            icon="delete"
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
