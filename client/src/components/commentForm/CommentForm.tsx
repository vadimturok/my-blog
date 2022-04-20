import React, {FC, useState} from 'react';
import './commentform.scss'
import Button from "../common/button/Button";
import {useAppSelector} from "../../hooks";
import {useDispatch} from "react-redux";
import {createComment} from "../../store/reducers/currentPost/action-creators";

const CommentForm: FC = () => {
    const {user, isAuth} = useAppSelector(state => state.auth)
    const {post, addCommentStatus} = useAppSelector(state => state.currentPost)
    const dispatch = useDispatch()
    const [text, setText] = useState<string>('')
    const [error, setError] = useState<string>('')
    const onSubmit = () => {
        if(text.length > 15){
            setError('')
            setText('')
            dispatch(createComment(text, post.id, user.id))
        }else{
            setError('Comment must contain at least 15 characters')
        }

    }

    return (
        <div className={'commentForm'}>
            {addCommentStatus === 'success' && <div className={'commentValidationSuccess'}>Comment posted!</div>}
            {error && <div className={'commentValidationError'}>{error}</div>}
            <textarea
                value={text}
                disabled={!isAuth}
                onChange={(e: any) => setText(e.target.value)}
                placeholder={isAuth ? 'Share your expressions...' : 'Please, log in.'}
                className={'commentFormArea'}
            />
            <div className={'sendButton'}><Button disabled={!isAuth} handleClick={onSubmit} text={'Send'}/></div>
        </div>
    );
};

export default CommentForm;