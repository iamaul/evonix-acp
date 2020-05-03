import React from 'react';
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";

const override = css`
    display: block;
    margin: 0 auto;
`;

export default (props) => {
    return (
        <>
            <div className="sweet-loading">
                <ClipLoader
                    css={override}
                    size={props.resizeIcon ? props.resizeIcon : 50}
                    color={"#ff0000"}
                    loading={props.isLoading}
                />
            </div>
        </>
    )
}
