import React, {FC, useState} from 'react';
import {Editor} from "react-draft-wysiwyg";
import {EditorState} from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import './texteditor.scss'
import Button from "../common/button/Button";
import {convertToHTML} from "draft-convert"

interface TextEditorProps{
    getStringFromHtml: (s: string) => void
}

const TextEditor: FC<TextEditorProps> = ({getStringFromHtml}) => {
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty())

    const onEditorStateChange = (state: any) => {
        setEditorState(state)
    }

    const convertToString = () => {
        const stringFromHtml = convertToHTML(editorState.getCurrentContent())
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