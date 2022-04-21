import React, {FC} from 'react';
import './latest.scss'
import {useAppSelector} from "../../hooks";
import {formatTime} from "../../helpers";
import {Link} from "react-router-dom";

const LatestList: FC = () => {
    const {todayPosts} = useAppSelector(state => state.posts)

    return (
        <div className={'latestList'}>
            <div className={'latestTitle'}>
                <h3>Latest</h3>
            </div>
            <div className={'latestItems'}>
                <ul>
                    {todayPosts.length > 0 && todayPosts.map(post => (
                            <li key={post.id}>
                                <span>{formatTime(post.dateAndTimePublish)}</span>
                                <Link to={`/posts/${post.id}`} className={'latestLink'}>
                                    <h5>{post.title}</h5>
                                </Link>
                            </li>
                    ))
                    }
                </ul>
            </div>
        </div>
    );
};

export default LatestList;