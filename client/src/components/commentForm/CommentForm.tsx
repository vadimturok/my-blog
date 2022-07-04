import React, {FC, useState} from 'react';
import './commentform.scss'
import Button from "../common/button/Button";
import {useAppSelector} from "../../hooks";
import {IComment} from "../../types/comment-type";
import PostService from "../../services/post-service";

interface CommentFormProps{
    postId: number;
    addComment: (comment: IComment) => void;
}

const CommentForm: FC<CommentFormProps> = ({addComment, postId}) => {
    const {user, isAuth} = useAppSelector(state => state.auth)
    const [text, setText] = useState<string>('')
    const [error, setError] = useState<string>('')
    const onSubmit = async () => {
        if(text.length > 15){
            setError('')
            setText('')
            try{
                const response = await PostService.createComment(text, postId, user.id)
                addComment(response.data)
            }catch(e: any){
                setError(e.response.data.message)
            }
        }else{
            setError('Comment must contain at least 15 characters')
        }

    }

    return (
        <div className={'commentForm'}>
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