import React from 'react';
import { Header as Head, Image } from 'semantic-ui-react';

import Navbar from '../navbar/Navbar';

const Header = () => {
    return (
        <>
            <Head as="h3" textAlign="center">
                <Image centered src="/assets/images/evonix-logo.png" size="massive"/><br/>
                Admin Panel
                <Head.Subheader>
                    To prevent hacking into your account, please make sure to logout your account after use.
                </Head.Subheader><br/>
            </Head>
            <Navbar />
        </>
    )
}

export default Header;
