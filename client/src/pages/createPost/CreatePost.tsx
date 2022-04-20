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
import {setAddPost} from "../../store/reducers/post/action-creators";



const CreatePost: FC = () => {
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty())
    const {register, handleSubmit, formState: {errors}} = useForm()
    const [file, setFile] = useState<any>(null)
    const {user} = useSelector((state: RootState) => state.auth)
    const [isError, setIsError] = useState<string>('')
    const dispatch = useDispatch()
    const navigate = useNavigate()


    const onSubmit = (data: any) => {
        const stringFromHtml = draftToHtml(convertToRaw(editorState.getCurrentContent()))
        PostService.createPost(file, data['Title'], stringFromHtml, user.id).then(response => {
            dispatch(setAddPost(response.data))
            navigate(`/posts/${response.data.id}`)
        }, (e: any) => {
            const response = e.response.data.message
            if(Array.isArray(response))setIsError(response[0])
            else setIsError(response)
        })
    }


    return (
        <div className={'createPost'}>
            <div className={'postInner'}>
                <h2>Create New Post</h2>
                    <FileUpload  handleFile={(file: File | undefined) => setFile(file)}/>
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
                    <div className={'createButton'}>
                        <Button handleClick={handleSubmit(onSubmit)}  text={'Create'}/>
                    </div>
                {isError && <div className={'alert danger'}>{isError}</div>}
            </div>
        </div>
    );
};

export default CreatePost;