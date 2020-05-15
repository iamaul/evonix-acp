import React, { useContext } from 'react';
import { Button } from 'semantic-ui-react';

import UserAppsContext from '../../../context/userapps/userAppsContext';

const ActionButton = ({ data }) => {
    const userAppsContext = useContext(UserAppsContext);
    const { updateUserApps } = userAppsContext;

    const onApprove = (id, userid) => {
        updateUserApps(1, id, userid);
    }
    const onDeny = (id, userid) => {
        updateUserApps(0, id, userid);
    }

    return (
        <>
            <Button.Group size="small">
                {data.userAppUser.status !== 3 && (
                    <Button
                        icon="checkmark"
                        color="green"
                        onClick={onApprove(data.id, data.user_id)}
                    />
                )}
                {data.userAppUser.status !== 2 && (
                    <Button
                        icon="delete"
                        color="red"
                        onClick={onDeny(data.id, data.user_id)}
                    />
                )}
            </Button.Group>  
        </>
    )
}

export default ActionButton;
