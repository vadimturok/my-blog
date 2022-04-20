import React from 'react';
import './loader.scss'
import {CircularProgress} from "@mui/material";

const Loader = () => {
    return (
        <div className={'postLoader'}>
            <CircularProgress/>
        </div>
    );
};

export default Loader;