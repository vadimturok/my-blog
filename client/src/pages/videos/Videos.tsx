import React, {FC} from 'react';
import './videos.scss'
import {useTitle} from "../../hooks";

const Videos: FC = () => {
    useTitle('Videos')

    return (
        <div className={'videos'}>
            <h2>In development...</h2>
        </div>
    );
};

export default Videos;