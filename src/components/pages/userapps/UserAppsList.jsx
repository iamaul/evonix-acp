import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import MUIDataTable from "mui-datatables";
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

    const appModal = (
        <Modal trigger={<Button>View</Button>}>
            <Modal.Header>{userAppUser.name}'s Application</Modal.Header>
            <Modal.Content image>
                <Image wrapped size="huge" src={userAppQuiz.image} />
                <Modal.Description>
                    <Header>{userAppQuiz.title}</Header>
                    <p style={{ textAlign: 'justify' }}>
                        {userAppQuiz.question}
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
    switch (userAppUser.status) {
        case 1: statusName = <Label color="yellow">Pending</Label>; break;
        case 2: statusName = <Label color="red">Denied</Label>; break;
        case 3: statusName = <Label color="green">Approved</Label>; break;
        default: statusName = <Label>Not submitted yet</Label>;
    }

    const columns = [
        {
            name: "index",
            label: "#",
            options: {
                filter: false,
                sort: true,
            }
        },
        {
            name: "user",
            label: "User",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "score",
            label: "Score",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "application",
            label: "Application"
        },
        {
            name: "status",
            label: "Status",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "approved",
            label: "Approved By"
        },
        {
            name: "created_at",
            label: "Created at",
            options: {
                filter: false,
                sort: true,
            }
        },
        {
            name: "updated_at",
            label: "Updated at",
            options: {
                filter: false,
                sort: true,
            }
        },
        {
            name: "actions",
            label: "Actions"
        }
    ];

    const data = [
        { 
            index, 
            user: userAppUser.name, 
            score, 
            application: appModal, 
            status: statusName,
            approved: (admin_id ? userAppAdmin.name : ('Nobody')),
            created_at: (<Moment unix format="llll">{created_at}</Moment>),
            updated_at: (<Moment unix format="llll">{updated_at}</Moment>),
            actions: (
                <Button.Group size="small">
                    {userAppUser.status !== 3 && (
                        <Button
                            icon="checkmark"
                            color="green"
                            onClick={onApprove}
                        />
                    )}
                    {userAppUser.status !== 2 && (
                        <Button
                            icon="delete"
                            color="red"
                            onClick={onDeny}
                        />
                    )}
                </Button.Group>
            )
        }
    ];

    const options = {
        filterType: "dropdown",
        responsive: "scroll"
    };

    const onApprove = () => updateUserApps(1, id, user_id);
    const onDeny = () => updateUserApps(0, id, user_id);

    return (
        <MUIDataTable
            title={"User Applications"}
            data={data}
            columns={columns}
            options={options}
        />
    )
}

UserAppsList.propTypes = {
    userapps: PropTypes.object.isRequired
}

export default UserAppsList;
