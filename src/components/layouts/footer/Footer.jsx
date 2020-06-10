import React from 'react';
import { Icon } from 'semantic-ui-react';

const Footer = () => (
    <>
        <footer>
            <p><Icon name="copyright outline" /> 2020 EvoniX ACP.</p>
        </footer>
        <style>{`
            footer {
                left: 0;
                bottom: 0;
                width: 100%;
                text-align: center;
                padding: 10px;
            }
        `}</style>
    </>
)

export default Footer;
