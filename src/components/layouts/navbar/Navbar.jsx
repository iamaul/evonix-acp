import React, { useContext, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, Dropdown, Icon } from 'semantic-ui-react';
import AuthContext from '../../../context/auth/authContext';

const Navbar = () => {
    const authContext = useContext(AuthContext);

    const { user, userLoad, userLogout } = authContext;

    useEffect(() => {
        userLoad();
        // eslint-disable-next-line
    }, [])

    const onLogout = () => {
        userLogout();
    }

    return (
        <>
            <Menu pointing secondary stackable>
                <Menu.Item
                    as={NavLink}
                    name="Dashboard"
                    exact to="/dashboard"
                />
                <Menu.Item
                    as={NavLink}
                    name="News"
                    exact to="/news"
                />
                <Menu.Item
                    as={NavLink}
                    name="Quiz"
                    exact to="/quiz"
                />
                <Menu.Item
                    as={NavLink}
                    name="User Applications"
                    exact to="/user_applications"
                />
                <Menu.Item
                    as={NavLink}
                    name="Users"
                    exact to="/users"
                />
                <Menu.Item
                    as={NavLink}
                    name="Banlist"
                    exact to="/banlist"
                />
                <Menu.Menu position="right">
                    <Dropdown
                        item
                        text={user && user.name}
                    >
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={onLogout}>
                                <Icon name="sign out" />
                                Sign Out
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Menu.Menu>
            </Menu>
        </>
    )
}

export default Navbar;
