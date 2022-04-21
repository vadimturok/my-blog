import React, {FC} from 'react';
import './comment.scss'
import {IComment} from "../../types/comment-type";
import {formatDate} from "../../helpers";

interface CommentProps{
    comment: IComment
}

const Comment: FC<CommentProps> = ({comment}) => {
    return (
        <div className={'comment'}>
            <img src={comment.user.profilePicture} alt="avatar"/>
            <div className={'commentAuthor'}>
                <span className={'commentAuthorName'}>{comment.user.firstName} {comment.user.lastName} • <span className={'commentDate'}>{formatDate(comment.dateAndTimePublish)}</span></span>
                <div className={'commentText'}>{comment.text}</div>
            </div>
        </div>
    );
};

export default Comment;