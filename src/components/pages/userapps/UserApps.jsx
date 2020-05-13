import React, { useEffect, useContext } from 'react';
import { Image } from 'semantic-ui-react';

import UserAppsContext from '../../../context/userapps/userAppsContext';

import UserAppsList from './UserAppsList';
import Loader from '../../layouts/loader/Loader';

const UserApps = () => {
    const userAppsContext = useContext(UserAppsContext);
    const { user_apps, getAllUserApps, setLoading } = userAppsContext;

    useEffect(() => {
        getAllUserApps();
        // eslint-disable-next-line
    },[])

    return (
        <>
            {user_apps !== null && user_apps.length === 0 && !setLoading && (
                <Image src="https://media.giphy.com/media/giXLnhxp60zEEIkq8K/giphy-downsized.gif" centered />
            )}
            {user_apps !== null && !setLoading ? (
                user_apps.map((uapp, index) => (
                    <UserAppsList key={uapp.id} userapps={uapp} index={index+1} />
                ))
            ) : (
                <Loader isLoading={setLoading} />
            )}
        </>
    )
}

export default UserApps;
