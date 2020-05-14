import React from 'react';
import { Button } from 'semantic-ui-react';

import UserAppsContext from '../../../context/userapps/userAppsContext';

const ActionButton = ({ id, user_id, status }) => {
    const userAppsContext = useContext(UserAppsContext);
    const { updateUserApps } = userAppsContext;

    const onApprove = (id, userid) => updateUserApps(1, id, userid);
    const onDeny = (id, userid) => updateUserApps(0, id, userid);

    return (
        <>
            <Button.Group size="small">
                {status !== 3 && (
                    <Button
                        icon="checkmark"
                        color="green"
                        onClick={onApprove(id, user_id)}
                    />
                )}
                {status !== 2 && (
                    <Button
                        icon="delete"
                        color="red"
                        onClick={onDeny(id, user_id)}
                    />
                )}
            </Button.Group>  
        </>
    )
}

export default ActionButton;
