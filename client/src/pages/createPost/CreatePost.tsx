import React, {FC, useEffect, useState} from 'react';
import './createpost.scss'
import FormGroup from "../../components/common/formGroup/FormGroup";
import FileUpload from "../../components/fileUpload/FileUpload";
import Button from "../../components/common/button/Button";
import {Editor} from "react-draft-wysiwyg";
import {ContentState, convertFromHTML, convertToRaw, EditorState} from "draft-js";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store";
import {useForm} from "react-hook-form";
import PostService from "../../services/post-service";
import {useNavigate, useParams} from "react-router-dom";
import {
    fetchTodayPosts, setPosts, setTodayPosts,
} from "../../store/reducers/post/action-creators";
import {CircularProgress} from "@mui/material";
import {useAppSelector, useTitle} from "../../hooks";
import {AddNewPost, deletePost} from "../../store/reducers/auth/action-creators";
import {IPost} from "../../types/post-type";
import NotFound from "../404/NotFound";


const CreatePost: FC = () => {
    const {postId} = useParams()
    const [file, setFile] = useState<any>(null)
    const {user} = useSelector((state: RootState) => state.auth)
    const {posts, todayPosts} = useAppSelector(state => state.posts)
    const [isError, setIsError] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [currentPost, setCurrentPost] = useState<IPost>({} as IPost)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {register, handleSubmit, formState: {errors}} = useForm()
    const [notFound, setNotFound] = useState(false)
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty())
    useTitle(postId ? 'Edit' : 'Create')

    useEffect(() => {
        if(postId && posts?.length > 0){
            const newPost = posts.find(post => post.id === Number(postId))
            if(!newPost){
                 PostService.getById(Number(postId))
                     .then(response => {
                     setCurrentPost(response.data)
                     setEditorState(EditorState.createWithContent(
                         ContentState.createFromBlockArray(convertFromHTML(response.data.text).contentBlocks)
                     ))
                 }).catch((err) => setNotFound(true))
            }else{
                setCurrentPost(newPost)
                setEditorState(EditorState.createWithContent(
                    ContentState.createFromBlockArray(convertFromHTML(newPost.text).contentBlocks)
                ))
            }

        }
    }, [postId, posts.length])


    if(Object.keys(currentPost).length === 0 && notFound){
        return <NotFound/>
    }
    if(Object.keys(currentPost).length === 0 && postId){
        return null
    }
    if(postId && currentPost.user.id !== user.id){
        return <NotFound/>
    }

    const onSubmit = async (data: any) => {
        let response
        const stringFromHtml = draftToHtml(convertToRaw(editorState.getCurrentContent()))
        setIsLoading(true)
        try{
            if(postId){
                response = await PostService.updatePost(data['Title'] === '' ? currentPost.title : data['Title'], stringFromHtml, currentPost.postImage, currentPost.id, file)
                dispatch(setPosts([...posts.filter(p => p.id !== currentPost.id), response.data]))
                if(todayPosts.includes(currentPost)){
                    dispatch(setTodayPosts([response.data, ...todayPosts.filter(p => p.id !== currentPost.id)]
                        .sort((a,b) => new Date(b.dateAndTimePublish).getTime() -
                            new Date(a.dateAndTimePublish).getTime())))
                }
                dispatch(deletePost(currentPost))
                dispatch(AddNewPost(response.data))
            }else{
                response = await PostService.createPost(file, data['Title'], stringFromHtml, user.id)
                dispatch(AddNewPost(response.data))
            }
            dispatch(fetchTodayPosts(5))
            navigate(`/posts/${response.data.id}`)
        }catch(e: any){
            console.log(e)
            const response = e.response?.data.message
            if(Array.isArray(response))setIsError(response[0])
            else setIsError(response)
            console.log(e.response)
        }finally {
            setIsLoading(false)
        }
    }


    return (
        <div className={'createPost'}>
            <div className={'postInner'}>
                <h2>{postId ? 'Edit post' : 'Create new post'}</h2>
                    <FileUpload
                        defaultImageURL={Object.keys(currentPost).length > 0 ? currentPost.postImage : null}
                        displayImage={true}
                        handleFile={(file: File | undefined) => setFile(file)}
                    />
                    <FormGroup
                        fieldName={'Title'}
                        register={register}
                        errors={errors}
                        placeholder={'Enter title...'}
                        isRequired={!postId}
                        defaultValue={Object.keys(currentPost).length > 0 ? currentPost.title : null}
                    />
                    <div className={'editor'}>
                        <Editor
                            editorState={editorState}
                            toolbarClassName={'toolbarClassName'}
                            wrapperClassName={'wrapperClassName'}
                            editorClassName={'editorClassName'}
                            onEditorStateChange={(state: any) => setEditorState(state)}
                        />
                    </div>
                    <div className={'createBottom'}>
                        <div className={'createButton'}>
                            <Button
                                handleClick={handleSubmit(onSubmit)}
                                text={postId ? 'Save' : 'Create'}
                                progress={isLoading && <CircularProgress style={{color: 'white'}} size={20}/>}
                            />
                        </div>
                        {isError && <div className={'alert danger'}>{isError}</div>}
                    </div>
            </div>
        </div>
    );
};

export default CreatePost;