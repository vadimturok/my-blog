import React, {FC, useEffect, useState} from 'react';
import './latest.scss'
import {useAppSelector} from "../../hooks";
import {IPost} from "../../types/post-type";
import {formatDate, formatTime} from "../../helpers";
import PostService from "../../services/post-service";
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
                        {/*<li>*/}
                        {/*    <h5>How to use JSX <span>12:05</span></h5>*/}
                        {/*</li>*/}
                        {/*<li>*/}
                        {/*    <h5>Git: A beginner's guide, <span>12:05</span></h5>*/}
                        {/*</li>*/}
                        {/*<li>*/}
                        {/*    <h5>What is JavaScript?, <span>12:05</span></h5>*/}
                        {/*</li>*/}
                        {/*<li>*/}
                        {/*    <h5>Backend and frontend, <span>12:05</span></h5>*/}
                        {/*</li>*/}
            </div>
        </div>
    );
};

export default LatestList;