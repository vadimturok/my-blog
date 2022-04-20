import React, {FC} from 'react';
import './latest.scss'

const LatestList: FC = () => {
    return (
        <div className={'latestList'}>
            <div className={'latestTitle'}>
                <h3>Latest</h3>
            </div>
            <div className={'latestItems'}>
                <ul>
                    <li>
                        <h5>How to use JSX <span>12:05</span></h5>
                    </li>
                    <li>
                        <h5>Git: A beginner's guide, <span>12:05</span></h5>
                    </li>
                    <li>
                        <h5>What is JavaScript?, <span>12:05</span></h5>
                    </li>
                    <li>
                        <h5>Backend and frontend, <span>12:05</span></h5>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default LatestList;