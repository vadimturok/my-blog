import React, { FC, useState} from 'react';
import './createpost.scss'
import FormGroup from "../../components/common/formGroup/FormGroup";
import FileUpload from "../../components/fileUpload/FileUpload";
import Button from "../../components/common/button/Button";
import {Editor} from "react-draft-wysiwyg";
import {convertToRaw, EditorState} from "draft-js";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store";
import {useForm} from "react-hook-form";
import PostService from "../../services/post-service";
import {useNavigate} from "react-router-dom";
import {
    fetchAllPostsByQuery,
    fetchTodayPosts,
} from "../../store/reducers/post/action-creators";
import {CircularProgress} from "@mui/material";
import {useAppSelector, useTitle} from "../../hooks";


const CreatePost: FC = () => {
    const {paginationInfo} = useAppSelector(state => state.posts)
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty())
    const {register, handleSubmit, formState: {errors}} = useForm()
    const [file, setFile] = useState<any>(null)
    const {user} = useSelector((state: RootState) => state.auth)
    const [isError, setIsError] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useTitle('Create new')


    const onSubmit = async (data: any) => {
        const stringFromHtml = draftToHtml(convertToRaw(editorState.getCurrentContent()))
        setIsLoading(true)
        try{
            const response = await PostService.createPost(file, data['Title'], stringFromHtml, user.id)
            if(paginationInfo.currentPage === 1){
                dispatch(fetchAllPostsByQuery(1, 4))
            }
            dispatch(fetchTodayPosts(5))
            navigate(`/posts/${response.data.id}`)
        }catch(e: any){
            const response = e.response.data.message
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
                <h2>Create New Post</h2>
                    <FileUpload
                        displayImage={true}
                        handleFile={(file: File | undefined) => setFile(file)}
                    />
                    <FormGroup
                        fieldName={'Title'}
                        register={register}
                        errors={errors}
                        placeholder={'Enter title...'}
                        isRequired={true}
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
                                text={'Create'}
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