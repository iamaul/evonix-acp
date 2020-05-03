import React, { useContext, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, Dropdown, Icon } from 'semantic-ui-react';
import AuthContext from '../../../context/auth/authContext';    

const Navbar = () => {
    const authContext = useContext(AuthContext);

    const { user, userLoad, userLogout } = authContext;

    useEffect(() => {
        userLoad();
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
                    exact to="/"
                />
                <Menu.Item
                    as={NavLink}
                    name="News"
                    exact to="/news"
                />
                <Menu.Item
                    as={NavLink}
                    name="Blog"
                    exact to="/blog"
                />
                <Dropdown item text="Quiz">
                    <Dropdown.Menu>
                        <Dropdown.Item as={NavLink} to="/quiz/type">Quiz Type</Dropdown.Item>
                        <Dropdown.Item as={NavLink} to="/quiz/question">Question</Dropdown.Item>
                        <Dropdown.Item as={NavLink} to="/quiz/answer">Quiz Answer</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <Menu.Item
                    as={NavLink}
                    name="User Applications"
                    exact to="/user-apps"
                />
                <Menu.Item
                    as={NavLink}
                    name="Users"
                    exact to="/users"
                />
                <Menu.Item
                    as={NavLink}
                    name="Characters"
                    exact to="/characters"
                />
                <Menu.Item
                    as={NavLink}
                    name="Bans"
                    exact to="/banlist"
                />
                <Dropdown item text="Config">
                    <Dropdown.Menu>
                        <Dropdown.Item as={NavLink} to="/config/ucp">UCP Settings</Dropdown.Item>
                        <Dropdown.Item as={NavLink} to="/config/teamspeak">Teamspeak</Dropdown.Item>
                        <Dropdown.Item as={NavLink} to="/config/server">Game Server</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
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
