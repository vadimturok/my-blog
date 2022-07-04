import React, {FC} from 'react';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import './editPostButtons.scss'
import PostService from "../../services/post-service";
import {useNavigate} from "react-router-dom";
import {IPost} from "../../types/post-type";
import {useAppDispatch} from "../../hooks";
import {removePost} from "../../store/reducers/posts/postsSlice";

const EditPostButtons: FC<{post: IPost, postPage?: boolean}> = ({post, postPage}) => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const handleUpdate = (e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation()
        navigate(`/edit/${post.id}`)
    }
    const handleDelete = async (e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation()
        try{
            await PostService.deletePost(post.id)
            dispatch(removePost(post))
        }catch(e){
            console.log(e)
        }
        if(postPage){
            navigate('/')
        }
    }
    return (
        <div className={'postUpdateActions'}>
            <div onClick={handleUpdate} className={'postUpdate edit'}>
                <EditIcon className={'postUpdateIcon'}/>
                <span>Edit</span>
            </div>
            <div onClick={handleDelete} className={'postUpdate delete'}>
                <DeleteIcon className={'postUpdateIcon'}/>
                <span>Delete</span>
            </div>
        </div>
    );
};

export default EditPostButtons;