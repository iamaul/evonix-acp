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

    const { 
        id,
        user_id,
        admin_id,
        score, 
        answer, 
        created_at, 
        updated_at,
        users, 
        admins, 
        quizzes 
    } = userapps;

    console.log(userapps);

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
            <Modal.Header>Application</Modal.Header>
            <Modal.Content image>
                <Image wrapped size="medium" src={quizzes && quizzes.image} />
                <Modal.Description>
                    <Header>{quizzes && quizzes.title}</Header>
                    <p style={{ textAlign: 'justify' }}>
                        {quizzes && quizzes.question}
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
    switch (users && users.status) {
        case 1: statusName = 'Pending'; break;
        case 2: statusName = 'Denied'; break;
        case 3: statusName = 'Approved'; break;
        default: statusName = 'Not submitted yet';
    }

    const onApprove = () => updateUserApps(1, id, user_id);
    const onDeny = () => updateUserApps(0, id, user_id);

    return (
        <>
            <Table.Row>
                <Table.Cell>{index}</Table.Cell>
                <Table.Cell>{users && users.name}</Table.Cell>
                <Table.Cell>{score}</Table.Cell>
                <Table.Cell>{appModal}</Table.Cell>
                <Table.Cell>{statusName}</Table.Cell>
                <Table.Cell>
                    {admin_id ? admins && admins.name : ('Nobody')}
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
