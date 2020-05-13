import React, { useEffect, useContext } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { Table, Image } from 'semantic-ui-react';

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
            <Table unstackable>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>#</Table.HeaderCell>
                        <Table.HeaderCell>User</Table.HeaderCell>
                        <Table.HeaderCell>Score</Table.HeaderCell>
                        <Table.HeaderCell>Application</Table.HeaderCell>
                        <Table.HeaderCell>Status</Table.HeaderCell>
                        <Table.HeaderCell>Approved by</Table.HeaderCell>
                        <Table.HeaderCell>Created At</Table.HeaderCell>
                        <Table.HeaderCell>Updated At</Table.HeaderCell>
                        <Table.HeaderCell>Action</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                {user_apps !== null && !setLoading ? (
                    <TransitionGroup>
                        <Table.Body>
                            {user_apps.map((uapp, index) => (
                                <CSSTransition
                                    key={uapp.id}
                                    timeout={500}
                                    classNames="item"
                                >
                                    <UserAppsList userapps={uapp} index={index} />
                                </CSSTransition>
                            ))}
                        </Table.Body>
                    </TransitionGroup>
                ) : (
                    <Loader isLoading={setLoading} />
                )}
            </Table>
        </>
    )
}

export default UserApps;
