import React, {FC, useState} from 'react';
import {Editor} from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import {convertToRaw, EditorState} from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import './texteditor.scss'
import Button from "../common/button/Button";

interface TextEditorProps{
    getStringFromHtml: (s: string) => void
}

const TextEditor: FC<TextEditorProps> = ({getStringFromHtml}) => {
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty())

    const onEditorStateChange = (state: any) => {
        setEditorState(state)
    }

    const convertToString = () => {
        const stringFromHtml = draftToHtml(convertToRaw(editorState.getCurrentContent()))
        getStringFromHtml(stringFromHtml)
    }

    return (
        <div>
            <Editor
                editorState={editorState}
                toolbarClassName={'toolbarClassName'}
                wrapperClassName={'wrapperClassName'}
                editorClassName={'editorClassName'}
                onEditorStateChange={onEditorStateChange}
            />
            <Button handleClick={convertToString} text={'Send'}/>
        </div>
    );
};

export default TextEditor;